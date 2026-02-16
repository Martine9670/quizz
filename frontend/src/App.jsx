import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

// Composants - Layout
import Navbar from './components/Layout/Navbar';
import Leaderboard from './components/Layout/Leaderboard';
// Composants - Auth
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
// Composants - Game
import LevelSelector from './components/Game/LevelSelector';
import QuestionCard from './components/Game/QuestionCard';

// Styles
import './styles/Global.css';
import './styles/Navbar.css';
import './styles/Game.css';
import './styles/Leaderboard.css';

// --- CONFIGURATION ---
const API_URL_SCORES = "http://localhost:1337/api/scores";
const API_URL_QUESTIONS = "http://localhost:1337/api/questions";
const API_URL_REGISTER = "http://localhost:1337/api/auth/local/register";

function App() {
  // --- ÉTATS (STATES) ---
  const [user, setUser] = useState(localStorage.getItem("quizzUser") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("quizzUser"));
  const [isRegistering, setIsRegistering] = useState(false);
  const [isDyslexic, setIsDyslexic] = useState(false);
  const [authError, setAuthError] = useState("");

  const [niveau, setNiveau] = useState(null);
  const [questionsDuNiveau, setQuestionsDuNiveau] = useState([]);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [termine, setTermine] = useState(false);
  const [reponse, setReponse] = useState("");
  const [historique, setHistorique] = useState([]);
  const [timeLeft, setTimeLeft] = useState(5);

  // --- ACTIONS API ---
  const chargerScores = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL_SCORES}?sort=points:desc&pagination[limit]=5`);
      const result = await res.json();
      if (result && result.data) setHistorique(result.data);
    } catch (err) { 
      console.error("Erreur scores:", err); 
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthError("");
    const { username, email, password } = e.target;
    
    try {
      const res = await fetch(API_URL_REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.value, email: email.value, password: password.value }),
      });
      const data = await res.json();
      if (data.jwt) {
        localStorage.setItem("quizzUser", data.user.username);
        localStorage.setItem("token", data.jwt);
        setUser(data.user.username);
        setIsLoggedIn(true);
      } else { 
        setAuthError(data.error.message); 
      }
    } catch (err) { 
      setAuthError("Erreur de connexion au serveur.");
      console.error("Register Error:", err);
    }
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
    } catch (err) { 
      console.error("Erreur enregistrement:", err); 
    }
  }, [user, questionsDuNiveau.length, chargerScores]);

  // --- LOGIQUE DU JEU ---
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
        setTermine(false);
      }
    } catch (err) { 
      console.error("Erreur fetch questions:", err); 
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError("");
    const name = e.target.username.value.trim();
    const pseudoRegex = /^[a-zA-Z0-9]{3,15}$/;

    if (!pseudoRegex.test(name)) {
      setAuthError("Pseudo invalide : 3 à 15 caractères (sans symboles).");
      return;
    }

    localStorage.setItem("quizzUser", name);
    setUser(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    if (niveau && !termine && score > 0) enregistrerScore(score, niveau);
    localStorage.removeItem("quizzUser");
    localStorage.removeItem("token");
    setUser("");
    setIsLoggedIn(false);
    setNiveau(null);
    setTermine(false);
    setAuthError("");
  };

  const resetQuizz = () => {
    setNiveau(null);
    setQuestionsDuNiveau([]);
    setIndexQuestion(0);
    setScore(0);
    setTermine(false);
    setReponse("");
    setTimeLeft(5);
    chargerScores();
  };

  // --- EFFETS ---
  useEffect(() => {
    const fetchData = async () => { await chargerScores(); };
    fetchData();
  }, [chargerScores]); 

  useEffect(() => {
    if (termine && score === questionsDuNiveau.length && score > 0) {
      confetti();
    }
  }, [termine, score, questionsDuNiveau.length]);

  useEffect(() => {
    if (!niveau || termine || questionsDuNiveau.length === 0) return;
    if (timeLeft === 0) {
      const timerId = setTimeout(() => { validerReponse(); }, 0); 
      return () => clearTimeout(timerId);
    }
    const interval = setInterval(() => { setTimeLeft((prev) => prev - 1); }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, niveau, termine, questionsDuNiveau.length, validerReponse]);

  // --- RENDU ---
  return (
    <main className={`app-container ${isDyslexic ? 'dyslexic-mode' : ''}`}>      
    <Navbar {...{
        isLoggedIn, user, niveau, termine, resetQuizz, handleLogout, 
        setIsRegistering, isRegistering, isDyslexic, setIsDyslexic 
      }} />

      {!isLoggedIn ? (
        <div className="game-layout">
          <div className="auth-container">
            <h1 className="welcome-text">Bienvenue sur Quizzy !</h1>
            <div className="card">
              {isRegistering ? (
                <Register 
                  handleRegister={handleRegister} 
                  setIsRegistering={setIsRegistering} 
                  authError={authError} 
                />
              ) : (
                <Login 
                  handleLogin={handleLogin} 
                  setIsRegistering={setIsRegistering} 
                  authError={authError} 
                />
              )}
            </div>
          </div>
          <aside className="sidebar-leaderboard">
            <Leaderboard historique={historique} />
          </aside>
        </div>
      ) : (
        <>
          {termine ? (
            <div className="card">
              <h2 className="main-title">{score === questionsDuNiveau.length ? "👑 PARFAIT !" : "À BIENTÔT !"}</h2>
              <p className="subtitle">Score : {score} / {questionsDuNiveau.length}</p>
              <button onClick={resetQuizz} className="btn-primary">REJOUER</button>
              <Leaderboard historique={historique} />
            </div>
          ) : !niveau ? (
            <div className="game-layout">
              <LevelSelector handleDemarrer={handleDemarrer} />
              <aside className="sidebar-leaderboard">
                <Leaderboard historique={historique} />
              </aside>
            </div>
          ) : (
            <QuestionCard 
              timeLeft={timeLeft}
              question={questionsDuNiveau[indexQuestion]?.q}
              reponse={reponse}
              setReponse={setReponse}
              validerReponse={validerReponse}
              terminerJeu={terminerJeu}
              score={score}
            />
          )}
        </>
      )}
    </main>
  );
}

export default App;