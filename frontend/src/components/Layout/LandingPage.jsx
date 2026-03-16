import React, { useEffect } from 'react';
import '../../styles/LandingPage.css';

const LandingPage = ({ onStart, historique, isMuted }) => {

  // 2. Bloc pour contrôler la musique de l'App depuis la Landing
  useEffect(() => {
    // On cherche l'élément audio de l'application (le bgMusicRef de App.js)
    // S'il n'a pas d'ID, on peut essayer de le couper via la logique globale
    const music = document.querySelector('audio'); // Cible l'audio de fond
    
    if (music) {
      if (isMuted) {
        music.pause();
      } else {
        // On ne relance que si l'utilisateur n'est pas sur "Mute"
        music.play().catch(() => console.log("Attente interaction"));
      }
    }
  }, [isMuted]); // Se déclenche dès que le bouton Mute change

  return (
    <div className="landing-wrapper">
      {/* ... tout le reste de ton code reste identique ... */}
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