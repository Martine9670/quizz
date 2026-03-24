import React, { useEffect } from 'react';
import '../../styles/LandingPage.css';

const LandingPage = ({ onStart, historique, isMuted }) => {

  // 2. Block to control App music from Landing
  useEffect(() => {
    // Look for application audio element (App.js bgMusicRef)
    // If no ID, try stopping via global logic
    const music = document.querySelector('audio'); // Targets background audio
    
    if (music) {
      if (isMuted) {
        music.pause();
      } else {
        // Only restart if user is not on "Mute"
        music.play().catch(() => console.log("Attente interaction"));
      }
    }
  }, [isMuted]); // Se déclenche dès que le bouton Mute change

  return (
    <div className="landing-wrapper">
      {/* ... all the rest of your code remains identical ... */}
        <h1 className="welcome-text">BIENVENUE SUR QUIZZY</h1>
      <section className="landing-intro">
        <div className="landing-text">
          <h1 className="main-title">Devenez le prochain <span>GOAT</span> du Quizz</h1>
          <p className="description-text">
            Testez vos connaissances, faites travailler votre mémoire, gagnez des badges et grimpez dans le classement.
            Une expérience fluide, inclusive et compétitive.
          </p>
          <button onClick={onStart} className="btn-primary btn-cta">
            COMMENCER L'AVENTURE
          </button>
        </div>
        
        <div className="landing-preview neon-border-card">
          <h3 className="sidebar-title">Top Joueurs 🏆</h3>
          <ul className="leaderboard-mini">
            {historique.slice(0, 3).map((item, index) => (
              <li key={index}>
                {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'} {item.attributes?.pseudo || item.pseudo}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="landing-features">
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Rapide</h3>
          <p>15 secondes par question pour tester vos réflexes.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🛡️</div>
          <h3>Sécurisé</h3>
          <p>Authentification pour protéger vos scores.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">👁️</div>
          <h3>Inclusif</h3>
          <p>Mode dyslexique intégré pour une lecture facilitée.</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;