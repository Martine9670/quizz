import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import './App.css';

// URL de ton API Strapi
const API_URL_SCORES = "http://localhost:1337/api/scores";
const API_URL_QUESTIONS = "http://localhost:1337/api/questions";

function App() {
  // --- ÉTATS ---
  const [user, setUser] = useState(localStorage.getItem("quizzUser") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("quizzUser"));
  const [niveau, setNiveau] = useState(null);
  const [questionsDuNiveau, setQuestionsDuNiveau] = useState([]);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [termine, setTermine] = useState(false);
  const [reponse, setReponse] = useState("");
  const [historique, setHistorique] = useState([]);

  // --- LOGIQUE API STRAPI ---

  const chargerScores = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL_SCORES}?sort=points:desc&pagination[limit]=5`);
      const result = await res.json();
      if (result.data) {
        setHistorique(result.data);
      }
    } catch (err) {
      console.error("Erreur de connexion à Strapi (scores) :", err);
    }
  }, []);

  const enregistrerScore = async (finalScore, currentLevel) => {
    const payload = {
      data: {
        pseudo: user,
        points: finalScore,
        total: questionsDuNiveau.length,
        difficulte: currentLevel
      }
    };
    try {
      await fetch(API_URL_SCORES, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      chargerScores(); 
    } catch (err) {
      console.error("Erreur d'enregistrement Strapi :", err);
    }
  };

  // --- EFFETS ---
  
// Charge les scores une seule fois au montage du composant
  useEffect(() => {
    chargerScores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    if (termine && score === questionsDuNiveau.length && score > 0) {
      confetti(); 
    }
  }, [termine, score, questionsDuNiveau.length]);

  // --- ACTIONS ---
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
    localStorage.removeItem("quizzUser");
    setUser("");
    setIsLoggedIn(false);
    resetQuizz();
  };

  const resetQuizz = () => {
    setNiveau(null);
    setQuestionsDuNiveau([]);
    setIndexQuestion(0);
    setScore(0);
    setTermine(false);
    setReponse("");
    chargerScores();
  };

  const handleDemarrer = async (choix) => {
    try {
      const niveauId = choix.toLowerCase();
      const res = await fetch(`${API_URL_QUESTIONS}?filters[niveau][$eq]=${niveauId}&pagination[limit]=100`);
      const result = await res.json();

      console.log("Réponse brute Strapi :", result);

      if (result.data && result.data.length > 0) {
        const selection = result.data
          .map(item => {
            // Sécurité Strapi v4 vs v5 : on cherche l'intitule là où il se trouve
            const rawData = item.attributes ? item.attributes : item;
            return {
              q: rawData.intitule,
              a: rawData.reponse
            };
          })
          // On filtre pour être sûr qu'on n'a pas de questions vides (null)
          .filter(q => q.q !== null && q.q !== undefined)
          .sort(() => Math.random() - 0.5)
          .slice(0, 10);

        console.log("Questions traitées :", selection);

        if (selection.length > 0) {
          setQuestionsDuNiveau(selection);
          setNiveau(choix);
          setIndexQuestion(0);
          setReponse("");
        } else {
          alert("Les questions existent en base mais le texte (intitule) est vide !");
        }
      } else {
        alert("Strapi ne renvoie rien. Vérifie les permissions PUBLIC -> FIND pour 'Question'");
      }
    } catch (err) {
      console.error("Erreur fetch questions :", err);
      alert("Impossible de joindre le serveur.");
    }
  };

  const terminerJeu = (scoreFinal) => {
    setTermine(true);
    if (niveau) enregistrerScore(scoreFinal, niveau);
  };

  const handleAbandon = () => {
    if (window.confirm("Veux-tu abandonner et enregistrer ton score actuel ?")) {
      terminerJeu(score);
    }
  };

  const validerReponse = (e) => {
    e.preventDefault();
    if (!reponse.trim()) return;

    const bonneReponse = questionsDuNiveau[indexQuestion].a;
    let nouveauScore = score;
    if (reponse.trim().toLowerCase() === bonneReponse.toLowerCase()) {
      nouveauScore = score + 1;
      setScore(nouveauScore);
    }
    if (indexQuestion + 1 < questionsDuNiveau.length) {
      setIndexQuestion(i => i + 1);
      setReponse("");
    } else {
      terminerJeu(nouveauScore);
    }
  };

  // --- LEADERBOARD ---
  const renderLeaderboard = () => (
    <div className="history-section">
      <h3>🏆 Voici les légendes de ce jeu !! 🏆</h3>
      <ul className="history-list">
        {historique.map((h, i) => {
          const data = h.attributes ? h.attributes : h;
          const dateBrute = new Date(data.createdAt);
          const dateFormatee = dateBrute.toLocaleDateString('fr-FR', {
            day: '2-digit', month: '2-digit', year: 'numeric'
          });
          return (
            <li key={h.id} className="history-item">
              <div className="history-user">
                <span className="rank">#{i + 1}</span>
                <div className="user-info-stack">
                  <strong>{data.pseudo}</strong> 
                  <span className="score-date">{dateFormatee}</span>
                </div>
              </div>
              <div className="history-details">
                <span className={`badge-mini ${data.difficulte}`}>{data.difficulte}</span>
                <strong className="points">{data.points}/{data.total}</strong>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  // --- VUES ---

  if (!isLoggedIn) {
    return (
      <div className="app-container">
        <h2 className="welcome-text">Bienvenue sur <br /> mon Quizz !</h2>
        <div className="card">
          <h1 className="main-title">IDENTIFICATION</h1>
          <form onSubmit={handleLogin}>
            <input name="username" className="input-field" placeholder="Ton pseudo..." required autoFocus />
            <button type="submit" className="btn-primary">ENTRER</button>
          </form>
          <div style={{ marginTop: '30px' }}>{renderLeaderboard()}</div>
        </div>
      </div>
    );
  }

  if (termine) {
    return (
      <div className="app-container">
        <div className="logout-banner">
          <span className="user-name">Joueur : {user}</span>
          <button onClick={handleLogout} className="btn-logout">Quitter</button>
        </div>
        <div className="card">
          <h1 className="main-title">{score === questionsDuNiveau.length ? "👑 BRAVO !" : "FIN !"}</h1>
          <p className="subtitle">{user}, tu as obtenu {score} / {questionsDuNiveau.length}</p>
          {renderLeaderboard()}
          <button onClick={resetQuizz} className="btn-primary">REJOUER</button>
        </div>
      </div>
    );
  }

  if (!niveau) {
    return (
      <div className="app-container">
        <div className="logout-banner">
          <span className="user-name">Joueur : {user}</span>
          <button onClick={handleLogout} className="btn-logout">Quitter</button>
        </div>
        <h2 className="welcome-text">Bienvenue sur mon Quizz !</h2>
        <div className="card">
          <h1 className="main-title">QUIZZY!</h1>
          <p className="subtitle">Salut {user} ! Choisis ton niveau :</p>
          <div className="level-grid">
            {['facile', 'moyen', 'difficile'].map((lv) => (
              <button key={lv} onClick={() => handleDemarrer(lv)} className={`btn-level ${lv}`}>
                {lv.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (questionsDuNiveau.length === 0) return <div className="app-container">Chargement...</div>;

  return (
    <div className="app-container">
      <div className="logout-banner">
        <span className="user-name">Joueur : {user}</span>
        <button onClick={handleLogout} className="btn-logout">Quitter</button>
      </div>
      <h2 className="welcome-text">À toi de jouer !</h2>
      <div className="card">
        <span className={`level-badge ${niveau}`}>{niveau}</span>
        <p className="subtitle">Question {indexQuestion + 1} / {questionsDuNiveau.length}</p>
        <p className="question-text">{questionsDuNiveau[indexQuestion]?.q}</p>
        <form onSubmit={validerReponse}>
          <input 
            autoFocus className="input-field" type="text" 
            value={reponse} onChange={(e) => setReponse(e.target.value)} 
            placeholder="Ta réponse..."
          />
          <button type="submit" className="btn-primary">VALIDER</button>
        </form>
        <button onClick={handleAbandon} className="btn-abandon">QUITTER</button>
      </div>
    </div>
  );
}

export default App;