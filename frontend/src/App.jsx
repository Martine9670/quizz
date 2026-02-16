import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import './App.css';

const API_URL_SCORES = "http://localhost:1337/api/scores";
const API_URL_QUESTIONS = "http://localhost:1337/api/questions";
const API_URL_REGISTER = "http://localhost:1337/api/auth/local/register";

function App() {
  const [user, setUser] = useState(localStorage.getItem("quizzUser") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("quizzUser"));
  const [isRegistering, setIsRegistering] = useState(false);
  const [niveau, setNiveau] = useState(null);
  const [questionsDuNiveau, setQuestionsDuNiveau] = useState([]);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [termine, setTermine] = useState(false);
  const [reponse, setReponse] = useState("");
  const [historique, setHistorique] = useState([]);
  const [timeLeft, setTimeLeft] = useState(5);

  const chargerScores = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL_SCORES}?sort=points:desc&pagination[limit]=5`);
      const result = await res.json();
      if (result && result.data) setHistorique(result.data);
    } catch (err) { console.error("Erreur scores:", err); }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch(API_URL_REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (data.jwt) {
        localStorage.setItem("quizzUser", data.user.username);
        localStorage.setItem("token", data.jwt);
        setUser(data.user.username);
        setIsLoggedIn(true);
      } else {
        alert(data.error.message);
      }
    } catch (err) { console.error("Erreur register:", err); }
  };

  const enregistrerScore = useCallback(async (finalScore, currentLevel) => {
    const payload = { data: { pseudo: user, points: finalScore, total: questionsDuNiveau.length, difficulte: currentLevel } };
    try {
      await fetch(API_URL_SCORES, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      chargerScores(); 
    } catch (err) { console.error("Erreur enregistrement:", err); }
  }, [user, questionsDuNiveau.length, chargerScores]);

  const terminerJeu = useCallback((scoreFinal) => {
    setTermine(true);
    if (niveau) enregistrerScore(scoreFinal, niveau);
  }, [niveau, enregistrerScore]);

  const validerReponse = useCallback((e = null) => {
    if (e) e.preventDefault();
    const bonneReponse = questionsDuNiveau[indexQuestion]?.a;
    let nouveauScore = score;
    if (reponse.trim().toLowerCase() === bonneReponse?.toLowerCase()) {
      nouveauScore = score + 1;
      setScore(nouveauScore);
    }
    if (indexQuestion + 1 < questionsDuNiveau.length) {
      setIndexQuestion(i => i + 1);
      setReponse("");
      setTimeLeft(5); 
    } else { terminerJeu(nouveauScore); }
  }, [indexQuestion, questionsDuNiveau, reponse, score, terminerJeu]);

// Remplace ton useEffect (lignes 86-88) par celui-ci :
useEffect(() => {
  const timeoutId = setTimeout(() => {
    chargerScores();
  }, 0);
  return () => clearTimeout(timeoutId);
}, [chargerScores]);

  useEffect(() => {
    if (termine && score === questionsDuNiveau.length && score > 0) confetti();
  }, [termine, score, questionsDuNiveau.length]);

// Dans ton useEffect du Timer, modifie le bloc timeLeft === 0 :
useEffect(() => {
  if (!niveau || termine || questionsDuNiveau.length === 0) return;
  
  if (timeLeft === 0) {
    // On décale l'appel pour éviter le rendu en cascade
    const timeoutId = setTimeout(() => {
      validerReponse();
    }, 0);
    return () => clearTimeout(timeoutId);
  }

  const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);

    return () => clearInterval(interval);
    }, [timeLeft, niveau, termine, questionsDuNiveau.length, validerReponse]);

  const handleLogin = (e) => {
    e.preventDefault();
    const name = e.target.username.value.trim();
    if (name) {
      localStorage.setItem("quizzUser", name);
      setUser(name);
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    if (niveau && !termine && score > 0) enregistrerScore(score, niveau);
    localStorage.removeItem("quizzUser");
    localStorage.removeItem("token");
    setUser("");
    setIsLoggedIn(false);
    setNiveau(null);
    setTermine(false);
  };

  const resetQuizz = () => {
    setNiveau(null); setQuestionsDuNiveau([]); setIndexQuestion(0);
    setScore(0); setTermine(false); setReponse(""); setTimeLeft(5);
    chargerScores();
  };

  const handleDemarrer = async (choix) => {
    try {
      const res = await fetch(`${API_URL_QUESTIONS}?filters[niveau][$eq]=${choix.toLowerCase()}&pagination[limit]=1000`);
      const result = await res.json();
      if (result.data?.length > 0) {
        const selection = result.data.map(item => {
          const rawData = item.attributes ? item.attributes : item;
          return { q: rawData.intitule, a: rawData.reponse };
        }).filter(q => q.q).sort(() => Math.random() - 0.5);
        setQuestionsDuNiveau(selection);
        setNiveau(choix);
        setIndexQuestion(0);
        setReponse("");
        setTimeLeft(5); 
      }
    } catch (err) { console.error("Erreur:", err); }
  };

  const renderLeaderboard = () => (
    <div className="history-section">
      <h3>🏆 Le tableau des légendes 🏆</h3>
      <ul className="history-list">
        {historique.map((h, i) => {
          const data = h.attributes ? h.attributes : h;
          return (
            <li key={h.id || i} className="history-item">
              <div className="history-user">
                <span className="rank">#{i + 1}</span>
                <div className="user-info-stack">
                  <strong>{data.pseudo || data.username}</strong>
                  <span className="score-date">Record</span>
                </div>
              </div>
              <div className="history-details">
                <span className={`badge-mini ${data.difficulte}`}>{data.difficulte}</span>
                <span className="points">{data.points}/{data.total}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  if (!isLoggedIn) return (
    <div className="app-container">
      <h1 className="welcome-text">Bienvenue sur le Quizz !</h1>
      <div className="card">
        {isRegistering ? (
          <>
            <h2 className="main-title">Inscription</h2>
            <form onSubmit={handleRegister}>
              <input name="username" className="input-field" placeholder="Pseudo..." required />
              <input name="email" type="email" className="input-field" placeholder="Email..." required />
              <input name="password" type="password" className="input-field" placeholder="Mot de passe..." required />
              <button type="submit" className="btn-primary">CRÉER MON COMPTE</button>
            </form>
            <p onClick={() => setIsRegistering(false)} style={{cursor:'pointer', marginTop:'10px', textDecoration:'underline', color: 'white'}}>Déjà un compte ? Se connecter</p>
          </>
        ) : (
          <>
            <h2 className="main-title">Identification</h2>
            <form onSubmit={handleLogin}>
              <input name="username" className="input-field" placeholder="Pseudo..." required autoFocus />
              <button type="submit" className="btn-primary">ENTRER</button>
            </form>
            <p onClick={() => setIsRegistering(true)} style={{cursor:'pointer', marginTop:'10px', textDecoration:'underline', color: 'white'}}>Pas de compte ? S'inscrire</p>
          </>
        )}
        {renderLeaderboard()}
      </div>
    </div>
  );

  return (
    <div className="app-container">
      <div className="logout-banner">
        <span>Joueur : {user}</span>
        <button onClick={handleLogout} className="btn-logout">Quitter</button>
      </div>

      {termine ? (
        <div className="card">
          <h2 className="main-title">{score === questionsDuNiveau.length ? "👑 PARFAIT !" : "À BIENTÔT !"}</h2>
          <p className="subtitle">Score : {score} / {questionsDuNiveau.length}</p>
          <button onClick={resetQuizz} className="btn-primary">REJOUER</button>
          {renderLeaderboard()}
        </div>
      ) : !niveau ? (
        <div className="card">
          <h2 className="main-title">NIVEAUX</h2>
          <div className="level-grid">
            {['facile', 'moyen', 'difficile'].map(lv => (
              <button key={lv} onClick={() => handleDemarrer(lv)} className={`btn-level ${lv}`}>{lv.toUpperCase()}</button>
            ))}
          </div>
          {renderLeaderboard()}
        </div>
      ) : (
        <div className="card">
          <div className="timer-wrapper">
             <div className="timer-text">⏱ {timeLeft}s</div>
             <div className="timer-bar-bg">
               <div 
                  className={`timer-bar-fill ${timeLeft <= 3 ? 'danger' : ''}`}
                  style={{ width: `${timeLeft * 20}%` }}
               ></div>
             </div>
          </div>
          <p className="question-text">{questionsDuNiveau[indexQuestion]?.q}</p>
          <form onSubmit={validerReponse}>
            <input className="input-field" value={reponse} onChange={e => setReponse(e.target.value)} placeholder="Ta réponse..." autoFocus />
            <button type="submit" className="btn-primary">VALIDER</button>
          </form>
          <button onClick={() => window.confirm("Quitter ?") && terminerJeu(score)} className="btn-abandon">QUITTER</button>
        </div>
      )}
    </div>
  );
}

export default App;