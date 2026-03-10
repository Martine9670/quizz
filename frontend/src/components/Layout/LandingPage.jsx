import React from 'react';
import '../../styles/LandingPage.css';

const LandingPage = ({ onStart, historique }) => {
  return (
    <div className="landing-wrapper">
        <h1 className="welcome-text">BIENVENUE SUR QUIZZY</h1>
      {/* SECTION 1 : ACCUEIL & ACTION */}
      <section className="landing-intro">
        <div className="landing-text">
          <h1 className="main-title">Devenez le prochain <span>GOAT</span> du Quizz</h1>
          <p className="description-text">
            Testez vos connaissances, augmentez vos points, gagnez des badges et grimpez dans le classement mondial.
            Une expérience fluide, inclusive et compétitive.
          </p>
          <button onClick={onStart} className="btn-primary btn-cta">
            COMMENCER L'AVENTURE
          </button>
        </div>
        
        {/* Rappel du Leaderboard dès l'accueil pour le côté "Compétition" */}
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

      {/* SECTION 2 : LES POINTS FORTS */}
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