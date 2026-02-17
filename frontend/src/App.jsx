import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

// Composants - Layout
import Navbar from './components/Layout/Navbar';
import Leaderboard from './components/Layout/Leaderboard';
// Composants - Auth
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { postRegister, fetchQuestions, fetchLeaderboard, saveScore } from './services/api';

// Composants - Game
import LevelSelector from './components/Game/LevelSelector';
import QuestionCard from './components/Game/QuestionCard';

// Styles
import './styles/Global.css';
import './styles/Navbar.css';
import './styles/Game.css';
import './styles/Leaderboard.css';

// --- INITIALISATION DES SONS ---
// Placés ici pour ne pas être recréés à chaque rendu du composant
const successSound = new Audio('/sounds/correct.mp3');
const errorSound = new Audio('/sounds/wrong.mp3');
successSound.volume = 0.5;
errorSound.volume = 0.4;

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
      const result = await fetchLeaderboard();
      if (result && result.data) setHistorique(result.data);
    } catch (err) { 
      console.error("Erreur scores:", err); 
    }
  }, []);

  const enregistrerScore = useCallback(async (finalScore, currentLevel) => {
    try {
      await saveScore(user, finalScore, questionsDuNiveau.length, currentLevel);
      chargerScores();
    } catch (err) { 
      console.error("Erreur enregistrement:", err); 
    }
  }, [user, questionsDuNiveau.length, chargerScores]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthError("");
    const { username, email, password } = e.target;
    try {
      const data = await postRegister(username.value, email.value, password.value);
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
      console.error("Erreur inscription:", err);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError("");
    const name = e.target.username.value.trim();
    const pseudoRegex = /^[a-zA-Z0-9]{3,15}$/;
    if (!pseudoRegex.test(name)) {
      setAuthError("Pseudo invalide : 3 à 15 caractères.");
      return;
    }
    localStorage.setItem("quizzUser", name);
    setUser(name);
    setIsLoggedIn(true);
  };

  // --- LOGIQUE DU JEU ---
  const handleDemarrer = async (choix) => {
    try {
      const selection = await fetchQuestions(choix);
      if (selection && selection.length > 0) {
        setQuestionsDuNiveau(selection);
        setNiveau(choix);
        setIndexQuestion(0);
        setReponse("");
        setTimeLeft(5);
        setTermine(false);
      }
    } catch (err) { 
      console.error("Erreur questions:", err); 
    }
  };

  const terminerJeu = useCallback((scoreFinal) => {
    setTermine(true);
    if (niveau) enregistrerScore(scoreFinal, niveau);
  }, [niveau, enregistrerScore]);

  const validerReponse = useCallback((e = null) => {
    if (e) e.preventDefault();
    const bonneReponse = questionsDuNiveau[indexQuestion]?.a;
    let nouveauScore = score;

    // --- LOGIQUE AUDIO + SCORE ---
    if (reponse.trim().toLowerCase() === bonneReponse?.toLowerCase()) {
      // Succès
      successSound.currentTime = 0;
      successSound.play().catch(err => console.error("Audio error:", err));
      nouveauScore = score + 1;
      setScore(nouveauScore);
    } else {
      // Échec (ou temps écoulé)
      errorSound.currentTime = 0;
      errorSound.play().catch(err => console.error("Audio error:", err));
    }

    if (indexQuestion + 1 < questionsDuNiveau.length) {
      setIndexQuestion(i => i + 1);
      setReponse("");
      setTimeLeft(5);
    } else { 
        terminerJeu(nouveauScore); 
    }
  }, [indexQuestion, questionsDuNiveau, reponse, score, terminerJeu]);

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
    setNiveau(null);
    setScore(0);
    setTermine(false);
    chargerScores();
  };

  // --- EFFETS ---
  useEffect(() => {
    const initScores = async () => {
      await chargerScores();
    };
    initScores();
  }, [chargerScores]);

  useEffect(() => {
    if (termine && score === questionsDuNiveau.length && score > 0) confetti();
  }, [termine, score, questionsDuNiveau.length]);

  useEffect(() => {
    if (!niveau || termine || questionsDuNiveau.length === 0) return;

    if (timeLeft === 0) {
      const timeoutId = setTimeout(() => {
        validerReponse();
      }, 0);
      return () => clearTimeout(timeoutId);
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, niveau, termine, questionsDuNiveau.length, validerReponse]);

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
                <Register handleRegister={handleRegister} setIsRegistering={setIsRegistering} authError={authError} />
              ) : (
                <Login handleLogin={handleLogin} setIsRegistering={setIsRegistering} authError={authError} />
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