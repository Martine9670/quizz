/* --- IMPORTS --- */
import { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';

// Composants - Layout
import Navbar from './components/Layout/Navbar';
import Leaderboard from './components/Layout/Leaderboard';
import Footer from './components/Layout/Footer';

// Composants - Auth
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { postRegister, fetchQuestions, fetchLeaderboard, saveScore } from './services/api';

// Composants - Game
import LevelSelector from './components/Game/LevelSelector';
import QuestionCard from './components/Game/QuestionCard';

// Composants - Legal
import Contact from './components/Legal/Contact';
import LegalText from './components/Legal/LegalText';
import CGU from './components/Legal/CGU';
import Mentions from './components/Legal/Mentions';
import GDPR from './components/Legal/GDPR';

// Styles
import './styles/Global.css';
import './styles/Navbar.css';
import './styles/Game.css';
import './styles/Leaderboard.css';

/* --- INITIALISATION DES ASSETS AUDIO --- */
const successSound = new Audio('/sounds/correct.mp3');
const errorSound = new Audio('/sounds/wrong.mp3');
successSound.volume = 0.5;
errorSound.volume = 0.4;

function App() {
  /* --- ÉTATS (STATES) - AUTHENTICATION & UI --- */
  const [user, setUser] = useState(localStorage.getItem("quizzUser") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("quizzUser"));
  const [isRegistering, setIsRegistering] = useState(false);
  const [isDyslexic, setIsDyslexic] = useState(false);
  const [activePage, setActivePage] = useState("game"); // "game", "contact", "cgu", ou "mentions"
  const [authError, setAuthError] = useState("");

  /* --- ÉTATS (STATES) - LOGIQUE DE JEU --- */
  const [niveau, setNiveau] = useState(null);
  const [questionsDuNiveau, setQuestionsDuNiveau] = useState([]);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [termine, setTermine] = useState(false);
  const [reponse, setReponse] = useState("");
  const [historique, setHistorique] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15);
  
  /* --- RÉFÉRENCES (REFS) --- */
  const bgMusicRef = useRef(new Audio('/sounds/musicgame.mp3'));

  /* --- ACTIONS API (SERVICES) --- */
  // Récupération du classement mondial
  const chargerScores = useCallback(async () => {
    try {
      const result = await fetchLeaderboard();
      if (result && result.data) setHistorique(result.data);
    } catch (err) { 
      console.error("Erreur scores:", err); 
    }
  }, []);

  // Enregistrement du score final en base de données
  const enregistrerScore = useCallback(async (finalScore, currentLevel) => {
    try {
      await saveScore(user, finalScore, questionsDuNiveau.length, currentLevel);
      chargerScores();
    } catch (err) { 
      console.error("Erreur enregistrement:", err); 
    }
  }, [user, questionsDuNiveau.length, chargerScores]);

  /* --- GESTIONNAIRES D'ÉVÉNEMENTS - AUTH --- */
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

  const handleLogout = () => {
    if (niveau && !termine && score > 0) enregistrerScore(score, niveau);
    localStorage.removeItem("quizzUser");
    localStorage.removeItem("token");
    setUser("");
    setIsLoggedIn(false);
    setNiveau(null);
    setTermine(false);
    // Relance la musique d'ambiance après déconnexion
    bgMusicRef.current.play().catch(() => {
      console.log("Lecture bloquée au logout");
    });
  }

  /* --- GESTIONNAIRES D'ÉVÉNEMENTS - GAME LOGIC --- */
  // Initialisation d'une nouvelle partie
  const handleDemarrer = async (choix) => {
    try {
      const selection = await fetchQuestions(choix);
      if (selection && selection.length > 0) {
        bgMusicRef.current.pause(); // Coupe la musique d'ambiance pendant le jeu
        setQuestionsDuNiveau(selection);
        setNiveau(choix);
        setIndexQuestion(0);
        setReponse("");
        setTimeLeft(15);
        setTermine(false);
      }
    } catch (err) { 
      console.error("Erreur questions:", err); 
    }
  };

  // Fin de session
  const terminerJeu = useCallback((scoreFinal) => {
    setTermine(true);
    if (niveau) enregistrerScore(scoreFinal, niveau);
  }, [niveau, enregistrerScore]);

  // Vérification de la réponse saisie
  const validerReponse = useCallback((e = null) => {
    if (e) e.preventDefault();
    const bonneReponse = questionsDuNiveau[indexQuestion]?.a;
    let nouveauScore = score;

    if (reponse.trim().toLowerCase() === bonneReponse?.toLowerCase()) {
      successSound.currentTime = 0;
      successSound.play().catch(err => console.error("Audio error:", err));
      nouveauScore = score + 1;
      setScore(nouveauScore);
    } else {
      errorSound.currentTime = 0;
      errorSound.play().catch(err => console.error("Audio error:", err));
    }

    if (indexQuestion + 1 < questionsDuNiveau.length) {
      setIndexQuestion(i => i + 1);
      setReponse("");
      setTimeLeft(15);
    } else { 
        terminerJeu(nouveauScore); 
    }
  }, [indexQuestion, questionsDuNiveau, reponse, score, terminerJeu]);

  const handleRejouer = () => {
    // On remet à zéro la logique du jeu SANS déconnecter l'utilisateur
    setNiveau(null);
    setScore(0);
    setTermine(false);
    setQuestionsDuNiveau([]);
    setIndexQuestion(0);
    setActivePage("game");
    
    // On relance la musique si elle était en pause
    bgMusicRef.current.play().catch(() => console.log("Musique relancée"));
    
    chargerScores();
  };

const resetQuizz = () => {
    // 1. Reset de la musique (On revient au début du fichier audio)
    bgMusicRef.current.pause();
    bgMusicRef.current.currentTime = 0;
    bgMusicRef.current.play().catch(() => console.log("Musique en attente d'interaction"));

    // 2. Réinitialisation de la session (Identification)
    setUser("");
    setIsLoggedIn(false);
    localStorage.removeItem("quizzUser");
    localStorage.removeItem("token");

    // 3. Réinitialisation du jeu
    setNiveau(null);
    setScore(0);
    setTermine(false);
    setQuestionsDuNiveau([]);
    setIndexQuestion(0);
    
    // 4. Retour à la page de garde
    setActivePage("game");
    setIsRegistering(false); 
    
    chargerScores();
  };

  /* --- EFFETS (USEEFFECT) --- */
  // Gestion de la musique de fond et de l'interaction utilisateur
  useEffect(() => {
    const music = bgMusicRef.current;
    music.loop = true;
    music.volume = 0.1;

    const startMusic = () => {
      music.play().catch(() => console.log("Autoplay blocked, waiting for interaction"));
      window.removeEventListener('click', startMusic);
    };

    window.addEventListener('click', startMusic);

    return () => {
      music.pause();
      window.removeEventListener('click', startMusic);
    };
  }, []);

  // Chargement initial des scores
  useEffect(() => {
    const initScores = async () => {
      await chargerScores();
    };
    initScores();
  }, [chargerScores]);

  // Déclenchement des confettis en cas de victoire parfaite
  useEffect(() => {
    if (termine && score === questionsDuNiveau.length && score > 0) confetti();
  }, [termine, score, questionsDuNiveau.length]);

  // Logique du Timer (Compte à rebours)
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

/* --- RENDU (JSX) --- */
  return (
    <main className={`app-container ${isDyslexic ? 'dyslexic-mode' : ''}`}>      
      {/* Barre de navigation haute */}
      <Navbar {...{
          isLoggedIn, user, niveau, termine, 
          resetQuizz: () => { resetQuizz(); setActivePage("game"); }, // On s'assure de revenir au jeu
          handleLogout, setIsRegistering, isRegistering, isDyslexic, setIsDyslexic 
      }} />

      {/* SI ON EST SUR LA PAGE DU JEU */}
      {activePage === "game" && (
        <>
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
                  <button onClick={handleRejouer} className="btn-primary">REJOUER</button>
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
        </>
      )}

{/* --- FIN DE LA LOGIQUE DU JEU --- */}
      
      {/* PAGE : CONTACT */}
      {activePage === "contact" && <Contact onBack={() => setActivePage("game")} />}

      {/* PAGE : CGU */}
      {activePage === "cgu" && <CGU onBack={() => setActivePage("game")} />}

      {/* PAGE : MENTIONS LÉGALES */}
      {activePage === "mentions" && <Mentions onBack={() => setActivePage("game")} />}
      
      {/* PAGE : RGPD */}
      {activePage === "gdpr" && <GDPR onBack={() => setActivePage("game")} />}

      {/* FOOTER (Toujours visible) */}
      <Footer onNavigate={setActivePage} />

      <div className="footer-overlay"></div>
    </main>
  );
}

export default App;
