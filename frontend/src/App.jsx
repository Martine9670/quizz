import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import './App.css';

const API_URL_SCORES = "http://localhost:1337/api/scores";
const API_URL_QUESTIONS = "http://localhost:1337/api/questions";

function App() {
  const [user, setUser] = useState(localStorage.getItem("quizzUser") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("quizzUser"));
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
    } catch (err) {
      console.error("Erreur scores:", err);
    }
  }, []);

  const enregistrerScore = useCallback(async (finalScore, currentLevel) => {
    const payload = { data: { pseudo: user, points: finalScore, total: questionsDuNiveau.length, difficulte: currentLevel } };
    try {
      await fetch(API_URL_SCORES, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      chargerScores(); 
    } catch (err) {
      console.error("Erreur enregistrement:", err);
    }
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
    } else {
      terminerJeu(nouveauScore);
    }
  }, [indexQuestion, questionsDuNiveau, reponse, score, terminerJeu]);

  useEffect(() => {
    let isMounted = true;
    fetch(`${API_URL_SCORES}?sort=points:desc&pagination[limit]=5`)
      .then(res => res.json())
      .then(result => {
        if (isMounted && result.data) setHistorique(result.data);
      });
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (termine && score === questionsDuNiveau.length && score > 0) confetti();
  }, [termine, score, questionsDuNiveau.length]);

  useEffect(() => {
    if (!niveau || termine || questionsDuNiveau.length === 0) return;
    if (timeLeft === 0) {
      const timeoutId = setTimeout(() => validerReponse(), 0);
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
        })
        .filter(q => q.q)
        .sort(() => Math.random() - 0.5);

        setQuestionsDuNiveau(selection);
        setNiveau(choix);
        setIndexQuestion(0);
        setReponse("");
        setTimeLeft(5); 
      }
    } catch (err) { console.error("Erreur lors du chargement des questions:", err); }
  };
            <div className="timer-wrapper">
               <div className="timer-text">⏱ {timeLeft}s</div>
               <div className="timer-bar-bg">
                 <div 
                    className={`timer-bar-fill ${timeLeft <= 3 ? 'danger' : ''}`}
                    style={{ '--progress': `${timeLeft * 20}%` }}
                 ></div>
               </div>
            </div>

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
                  <strong>{data.pseudo}</strong>
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
        <h2 className="main-title">Identification</h2>
        <form onSubmit={handleLogin}>
          <input name="username" className="input-field" placeholder="Pseudo..." required autoFocus />
          <button type="submit" className="btn-primary">ENTRER</button>
        </form>
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
        <>
          <h1 className="welcome-text">Résultats</h1>
          <div className="card">
            <h2 className="main-title">{score === questionsDuNiveau.length ? "👑 PARFAIT !" : "À BIENTÔT !"}</h2>
            <p className="subtitle">Score : {score} / {questionsDuNiveau.length}</p>
            <button onClick={resetQuizz} className="btn-primary">REJOUER</button>
            {renderLeaderboard()}
          </div>
        </>
      ) : !niveau ? (
        <>
          <h1 className="welcome-text">Prêt à jouer, {user} ?</h1>
          <div className="card">
            <h2 className="main-title">NIVEAUX</h2>
            <div className="level-grid">
              {['facile', 'moyen', 'difficile'].map(lv => (
                <button key={lv} onClick={() => handleDemarrer(lv)} className={`btn-level ${lv}`}>{lv.toUpperCase()}</button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="welcome-text">Bonne chance !</h1>
          <div className="card">
            <div className="timer-wrapper">
               <div className="timer-text">⏱ {timeLeft}s</div>
               <div className="timer-bar-bg">
                 <div 
                    className={`timer-bar-fill ${timeLeft <= 3 ? 'danger' : ''}`}
                    style={{ '--progress': `${timeLeft * 20}%` }}
                 ></div>
               </div>
            </div>
            <p className="question-text">{questionsDuNiveau[indexQuestion]?.q}</p>
            <form onSubmit={validerReponse}>
              <input className="input-field" value={reponse} onChange={e => setReponse(e.target.value)} placeholder="Ta réponse..." autoFocus />
              <button type="submit" className="btn-primary">VALIDER</button>
            </form>
            <button onClick={() => window.confirm("Quitter et enregistrer le score ?") && terminerJeu(score)} className="btn-abandon">QUITTER</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;