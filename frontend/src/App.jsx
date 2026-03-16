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
import { postRegister, postLogin, fetchQuestions, fetchLeaderboard, saveScore, fetchUserTotalPoints } from './services/api';

// Composants - Game
import LevelSelector from './components/Game/LevelSelector';
import QuestionCard from './components/Game/QuestionCard';
import CategorySelector from './components/Game/CategorySelector';
import GameModeSelector from './components/Game/GameModeSelector';
import { normalizeText } from './services/api';

// Composant LandingPage
import LandingPage from "./components/Layout/LandingPage";

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
import './styles/LandingPage.css';

/* --- DICTIONNAIRE DES CATÉGORIES --- */
const labelsCategories = {
  tech: 'Tech & Code',
  espace: 'Espace',
  cine: 'Cinéma',
  gaming: 'Gaming',
  monde: 'Aléatoire',
  cuisine: 'Cuisine',
  sport: 'Sport',
  musique: 'Musique',
  histoire: 'Histoire',
  geographie: 'Géographie'
};

const getBadgeData = (score) => {
  if (score >= 1000) return { label: "LE GOAT", icon: "🐐", class: "badge-goat" };
  if (score >= 500)  return { label: "Légende",  icon: "👑", class: "badge-legende" };
  if (score >= 250)  return { label: "Expert",   icon: "🏆", class: "badge-expert" };
  if (score >= 100)  return { label: "Guerrier", icon: "⚔️", class: "badge-guerrier" };
  if (score >= 50)   return { label: "Apprenti", icon: "🛡️", class: "badge-apprenti" };
  return { label: "Novice", icon: "🐣", class: "badge-novice" };
};

const Home = ({ userStats }) => {
  const badge = getBadgeData(userStats?.total_points || 0);
  return (
    <div className="game-layout-wrapper">
      <h1 className="welcome-player-title">
        Bienvenue, <span>{userStats?.username}</span>
      </h1>
      <div className={`badge-container ${badge.class}`}>
        <span className="badge-icon">{badge.icon}</span>
        <span className="badge-label">{badge.label}</span>
      </div>
    </div>
  );
};

/* --- INITIALISATION DES ASSETS AUDIO --- */
const successSound = new Audio('/sounds/correct.mp3');
const errorSound = new Audio('/sounds/wrong.mp3');
successSound.volume = 0.5;
errorSound.volume = 0.4;

function App() {
  /* --- ÉTATS - AUTHENTICATION & UI --- */
  const [user, setUser]                     = useState(localStorage.getItem("quizzUser") || "");
  const [isLoggedIn, setIsLoggedIn]         = useState(!!localStorage.getItem("quizzUser"));
  const [isRegistering, setIsRegistering]   = useState(false);
  const [isDyslexic, setIsDyslexic]         = useState(false);
  const [activePage, setActivePage]         = useState("game");
  const [authError, setAuthError]           = useState("");
  const [totalPoints, setTotalPoints]       = useState(0);
  const [showLanding, setShowLanding]       = useState(!localStorage.getItem("quizzUser"));
  const [isMuted, setIsMuted]               = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  /* --- ÉTATS - LOGIQUE DE JEU --- */
  const [nbQuestions, setNbQuestions]           = useState(10);
  const [categorie, setCategorie]               = useState(null);
  const [niveau, setNiveau]                     = useState(null);
  const [questionsDuNiveau, setQuestionsDuNiveau] = useState([]);
  const [indexQuestion, setIndexQuestion]       = useState(0);
  const [score, setScore]                       = useState(0);
  const [termine, setTermine]                   = useState(false);
  const [reponse, setReponse]                   = useState("");
  const [historique, setHistorique]             = useState([]);
  const [timeLeft, setTimeLeft]                 = useState(15);

  /* --- RÉFÉRENCES --- */
  const bgMusicRef = useRef(new Audio('/sounds/musicgame.mp3'));

  /* --- ACTIONS API --- */
  const chargerScores = useCallback(async () => {
    try {
      const result = await fetchLeaderboard();
      if (result && result.data) setHistorique(result.data);
    } catch (err) {
      console.error("Erreur scores:", err);
    }
  }, []);

  const enregistrerScore = useCallback(async (finalScore, currentLevel) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Utilisateur non authentifié, score non enregistré.");
      return;
    }
    try {
      await saveScore(user, finalScore, questionsDuNiveau.length, currentLevel, token);
      setTotalPoints(prev => prev + finalScore);
      chargerScores();
    } catch (err) {
      console.error("Erreur enregistrement:", err);
    }
  }, [user, questionsDuNiveau.length, chargerScores]);

  /* --- GESTIONNAIRES AUTH --- */
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
        setShowLanding(false);
        setShowWelcomePopup(true);
        setTimeout(() => setShowWelcomePopup(false), 4000);
      } else {
        setAuthError(data.error.message);
      }
    } catch (err) {
      setAuthError("Erreur de connexion au serveur.");
      console.error("Erreur inscription:", err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    const identifier = e.target.username.value.trim();
    const password = e.target.password.value;
    if (!identifier || !password) {
      setAuthError("Pseudo et mot de passe requis.");
      return;
    }
    try {
      const data = await postLogin(identifier, password);
      if (data.jwt) {
        localStorage.setItem("token", data.jwt);
        localStorage.setItem("quizzUser", data.user.username);
        setUser(data.user.username);
        setIsLoggedIn(true);
        setShowLanding(false);
        const points = await fetchUserTotalPoints(data.user.username);
        setTotalPoints(points);
      } else {
        setAuthError("Pseudo ou mot de passe incorrect.");
      }
    } catch (err) {
      setAuthError("Erreur de connexion au serveur.");
      console.error("Erreur login:", err);
    }
  };

  const handleLogout = () => {
    if (niveau && !termine && score > 0) enregistrerScore(score, niveau);
    localStorage.removeItem("quizzUser");
    localStorage.removeItem("token");
    setUser("");
    setIsLoggedIn(false);
    setCategorie(null);
    setNiveau(null);
    setTermine(false);
    setShowLanding(true);
    if (!isMuted) {
      bgMusicRef.current.play().catch(() => console.log("Musique bloquée"));
    }
  };

  /* --- GESTIONNAIRES GAME --- */
  const handleDemarrer = async (choix) => {
    try {
      const selection = await fetchQuestions(categorie, choix, nbQuestions);
      if (selection && selection.length > 0) {
        bgMusicRef.current.pause();
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

  const terminerJeu = useCallback((scoreFinal) => {
    setTermine(true);
    if (niveau) enregistrerScore(scoreFinal, niveau);
  }, [niveau, enregistrerScore]);

/* --- DANS App.jsx --- */

const validerReponse = useCallback((e = null) => {
  if (e) e.preventDefault();
  
  const bonneReponse = questionsDuNiveau[indexQuestion]?.a;
  let nouveauScore = score;

  // Utilisation de normalizeText pour une comparaison flexible
  // On compare les deux versions "nettoyées" (minuscules, sans accents, sans tirets)
  if (normalizeText(reponse) === normalizeText(bonneReponse)) {
    successSound.currentTime = 0;
    successSound.play().catch(err => console.error("Audio error:", err));
    nouveauScore = score + 1;
    setScore(nouveauScore);
  } else {
    errorSound.currentTime = 0;
    errorSound.play().catch(err => console.error("Audio error:", err));
  }

  // Suite de la logique (passage à la question suivante ou fin)
  if (indexQuestion + 1 < questionsDuNiveau.length) {
    setIndexQuestion(i => i + 1);
    setReponse("");
    setTimeLeft(15);
  } else {
    terminerJeu(nouveauScore);
  }
}, [indexQuestion, questionsDuNiveau, reponse, score, terminerJeu]);

  const handleRejouer = () => {
    setCategorie(null);
    setNiveau(null);
    setScore(0);
    setTermine(false);
    setQuestionsDuNiveau([]);
    setIndexQuestion(0);
    setActivePage("game");
    if (!isMuted) {
      bgMusicRef.current.play().catch(() => console.log("Musique relancée"));
    }
    chargerScores();
  };

  const resetQuizz = () => {
    bgMusicRef.current.pause();
    bgMusicRef.current.currentTime = 0;
    bgMusicRef.current.play().catch(() => console.log("Musique en attente d'interaction"));
    setUser("");
    setIsLoggedIn(false);
    localStorage.removeItem("quizzUser");
    localStorage.removeItem("token");
    setCategorie(null);
    setNiveau(null);
    setScore(0);
    setTermine(false);
    setQuestionsDuNiveau([]);
    setIndexQuestion(0);
    setActivePage("game");
    setIsRegistering(false);
    setShowLanding(true);
    chargerScores();
  };

  const toggleMute = () => {
    const music = bgMusicRef.current;
    if (isMuted) {
      music.play().catch(() => console.log("Musique bloquée"));
    } else {
      music.pause();
    }
    setIsMuted(!isMuted);
  };

  /* --- EFFETS --- */
  useEffect(() => {
    const music = bgMusicRef.current;
    music.loop = true;
    music.volume = 0.1;

    const startMusic = () => {
      if (!isMuted && music.paused) {
        music.play().catch(() => console.log("Autoplay bloqué"));
      }
      window.removeEventListener('click', startMusic);
    };

    if (isMuted) {
      music.pause();
    } else {
      if (showLanding || !niveau) {
        music.play().catch(() => {});
      }
    }

    window.addEventListener('click', startMusic);
    return () => window.removeEventListener('click', startMusic);
  }, [isMuted, showLanding, niveau]);

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

  useEffect(() => {
    const initAppData = async () => {
      await chargerScores();
      if (user) {
        try {
          const points = await fetchUserTotalPoints(user);
          setTotalPoints(points);
        } catch (err) {
          console.error("Erreur chargement points user:", err);
        }
      }
    };
    initAppData();
  }, [chargerScores, user]);

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

  /* --- RENDU --- */
  return (
    <main className={`app-container ${isDyslexic ? 'dyslexic-mode' : ''}`}>

      {/* Popup de bienvenue après inscription */}
      {showWelcomePopup && (
        <div className="welcome-popup">
          🎉 Bienvenue {user} ! Ton compte a été créé avec succès !
        </div>
      )}

      {/* Symboles décoratifs de fond */}
      <div className="bg-symbol symbol-1">?</div>
      <div className="bg-symbol symbol-2">!</div>
      <div className="bg-symbol symbol-3">+</div>
      <div className="bg-symbol symbol-4">=</div>

      {/* Barre de navigation */}
      <Navbar {...{
        isLoggedIn, user, niveau, termine,
        resetQuizz: () => { resetQuizz(); setActivePage("game"); },
        handleLogout,
        setIsRegistering: (val) => { setShowLanding(false); setIsRegistering(val); },
        isRegistering, isDyslexic, setIsDyslexic,
        isMuted, toggleMute
      }} />

      {activePage === "game" && (
        <>
          {showLanding && !isLoggedIn ? (
            <LandingPage
              onStart={() => setShowLanding(false)}
              historique={historique}
              isMuted={isMuted}
            />
          ) : (
            <div className="game-layout">
              {!isLoggedIn ? (
                <div className="auth-container">
                  <h1 className="welcome-text">Identification</h1>
                  <div className="card">
                    {isRegistering ? (
                      <Register handleRegister={handleRegister} setIsRegistering={setIsRegistering} authError={authError} />
                    ) : (
                      <Login handleLogin={handleLogin} setIsRegistering={setIsRegistering} authError={authError} />
                    )}
                  </div>
                </div>
              ) : (
                <div className="game-content-area">
                  {termine ? (
                    <div className="card">
                      <h2 className="main-title">{score === questionsDuNiveau.length ? "👑 PARFAIT !" : "VOICI TON RÉSULTAT"}</h2>
                      <p className="subtitle">Score : {score} / {questionsDuNiveau.length}</p>
                      <button onClick={handleRejouer} className="btn-primary">REJOUER</button>
                    </div>
                  ) : !categorie ? (
                    <div className="game-layout-wrapper">
                      {(() => {
                        const badge = getBadgeData(totalPoints);
                        return (
                          <div className="badge-wrapper">
                            <h1 className="welcome-player-title">À TOI DE JOUER <span>{user}</span> !</h1>
                            <div className={`badge-container ${badge.class}`}>
                              <span className="badge-icon">{badge.icon}</span>
                              <span className="badge-label">{badge.label}</span>
                            </div>
                          </div>
                        );
                      })()}
                      <CategorySelector
                        onSelectCategory={(cat) => setCategorie(cat)}
                        labels={labelsCategories}
                      />
                    </div>
                  ) : !niveau ? (
                    <div className="game-layout-wrapper">
                      <div className="game-header-selection">
                        <h1 className="welcome-player-title">
                          Thème : <span>{labelsCategories[categorie] || categorie}</span>
                        </h1>
                        <button
                          onClick={() => setCategorie(null)}
                          className="answer-btn-exit btn-small"
                        >
                          ← Retour au choix du thème
                        </button>
                      </div>
                      <GameModeSelector selectedNb={nbQuestions} onSelect={setNbQuestions} />
                      <div className="separator"></div>
                      <LevelSelector handleDemarrer={handleDemarrer} user={user} />
                    </div>
                  ) : (
                    <div className="game-container">
                      <QuestionCard
                        timeLeft={timeLeft}
                        question={questionsDuNiveau[indexQuestion]?.q}
                        reponse={reponse}
                        setReponse={setReponse}
                        validerReponse={validerReponse}
                        terminerJeu={terminerJeu}
                        score={score}
                      />
                      <div className="question-progress">
                        Question <span>{indexQuestion + 1}</span> / {questionsDuNiveau.length}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {(isLoggedIn || (!isLoggedIn && !showLanding)) && (
                <aside className="sidebar-leaderboard">
                  <Leaderboard historique={historique} />
                </aside>
              )}
            </div>
          )}
        </>
      )}

      {activePage === "contact"  && <Contact   onBack={() => setActivePage("game")} />}
      {activePage === "cgu"      && <CGU       onBack={() => setActivePage("game")} />}
      {activePage === "mentions" && <Mentions  onBack={() => setActivePage("game")} />}
      {activePage === "gdpr"     && <GDPR      onBack={() => setActivePage("game")} />}

      <Footer onNavigate={setActivePage} />
    </main>
  );
}

export default App;