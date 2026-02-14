import { useState, useEffect, useCallback } from 'react'; // Ajout de useCallback
import { questions } from './data';
import confetti from 'canvas-confetti';
import './App.css';

// URL de ton API Strapi
const API_URL = "http://localhost:1337/api/scores";

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

  // On utilise useCallback pour que la fonction ne soit pas recréée à chaque rendu
  const chargerScores = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}?sort=points:desc&pagination[limit]=5`);
      const result = await res.json();
      if (result.data) {
        setHistorique(result.data);
      }
    } catch (err) {
      console.error("Erreur de connexion à Strapi :", err);
    }
  }, []);

  // Enregistrer un score dans Strapi
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
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      chargerScores(); 
    } catch (err) {
      console.error("Erreur d'enregistrement Strapi :", err);
    }
  };

  // Purger l'historique (Action Admin)
  const purgerHistorique = async () => {
    if (window.confirm("ADMIN : Voulez-vous vraiment effacer tous les scores de la base Strapi ?")) {
      try {
        for (const item of historique) {
          await fetch(`${API_URL}/${item.id}`, { method: 'DELETE' });
        }
        alert("Base de données réinitialisée.");
        chargerScores();
      } catch (err) {
        console.error("Erreur de purge :", err);
      }
    }
  };

  // --- EFFETS ---
    
    useEffect(() => {
      // On crée une fonction anonyme asynchrone qu'on appelle immédiatement ()
      (async () => {
        await chargerScores();
      })();
    }, [chargerScores]);

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

  const handleDemarrer = (choix) => {
    const selection = [...questions[choix]].sort(() => Math.random() - 0.5);
    setQuestionsDuNiveau(selection);
    setNiveau(choix);
  };

  const terminerJeu = (scoreFinal) => {
    setTermine(true);
    enregistrerScore(scoreFinal, niveau);
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
        </div>
      </div>
    );
  }

  if (termine) {
    const isParfait = score === questionsDuNiveau.length;
    return (
      <div className="app-container">
        <div className="logout-banner">
          <span className="user-name">Joueur : {user}</span>
          <button onClick={handleLogout} className="btn-logout">Quitter</button>
        </div>
        <div className="card">
          <h1 className="main-title">{isParfait ? "👑 MASTER !" : "FIN !"}</h1>
          <p className="subtitle">{user}, tu as obtenu {score} / {questionsDuNiveau.length}</p>
          
          <div className="history-section">
            <h3>🏆 Hall of Fame (Top 5 Strapi)</h3>
            <ul className="history-list">
              {historique.map((h, i) => {
                const data = h.attributes ? h.attributes : h;
                return (
                  <li key={h.id} className="history-item">
                    <div className="history-user">
                      <span className="rank">#{i + 1}</span>
                      <strong>{data.pseudo}</strong> 
                    </div>
                    <div className="history-details">
                      <span className={`badge-mini ${data.difficulte}`}>{data.difficulte}</span>
                      <strong className="points">
                          {data.points}/{data.total}
                      </strong>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {user.toLowerCase() === "admin" && (
            <button onClick={purgerHistorique} className="btn-reset-scores">
              RÉINITIALISER LES SCORES (ADMIN)
            </button>
          )}
          
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
        <h2 className="welcome-text">Bienvenue sur mon Quizz ! <br /> Un petit jeu pour un peu de détente...</h2>
        <div className="card">
          <h1 className="main-title">QUIZZY!</h1>
          <p className="subtitle">Salut {user} ! Choisis ton niveau :</p>
          <div className="level-grid">
            {Object.keys(questions).map((lv) => (
              <button key={lv} onClick={() => handleDemarrer(lv)} className={`btn-level ${lv}`}>
                {lv.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
        <p className="question-text">{questionsDuNiveau[indexQuestion].q}</p>
        <form onSubmit={validerReponse}>
          <input 
            autoFocus
            className="input-field"
            type="text" 
            value={reponse} 
            onChange={(e) => setReponse(e.target.value)} 
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