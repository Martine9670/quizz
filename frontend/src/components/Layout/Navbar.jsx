/* --- COMPOSANT NAVBAR --- */
const Navbar = ({ 
  isLoggedIn, user, niveau, termine, 
  resetQuizz, handleLogout, setIsRegistering, isRegistering,
  isDyslexic, setIsDyslexic,
  isMuted, toggleMute
}) => {
  return (
    <nav className="navbar" aria-label="Navigation principale">
      
{/* --- SECTION GAUCHE : LOGO & STATUT --- */}
      <div className="nav-left">
        {/* AMÉLIORATION ACCESSIBILITÉ : Le h1 reste pour le SEO, mais l'interaction est dans un bouton */}
        <h1 className="nav-logo">
          <button 
            onClick={resetQuizz} 
            className="btn-logo-reset"
            aria-label="Retour à l'accueil Quizzy"
          >🕹️ QUIZZY</button>
        </h1>
        
        <div className="nav-status">
          <span 
            className={`status-indicator ${isLoggedIn ? 'pulse-green' : 'pulse-red'}`}
            role="img" 
            aria-label={isLoggedIn ? "Statut : Connecté" : "Statut : Hors-ligne"}
          ></span>
        </div>

        {/* --- AFFICHAGE DYNAMIQUE --- */}
        {niveau === null ? (
          <span className={`nav-slogan ${isDyslexic ? 'dyslexic-mode' : ''}`}>
            Prêt à relever le défi ?
          </span>
        ) : (
          !termine && (
            <div className={`nav-game-info ${isDyslexic ? 'dyslexic-mode' : ''}`}>
              Partie en cours : <span className={`badge-mini ${niveau}`}>{niveau}</span>
            </div>
          )
        )}      
      </div>

{/* --- SECTION DROITE : LIENS & ACTIONS --- */}
      <div className="nav-links">
        
        {/* BOUTON AUDIO (Nouveau !) */}
        <button 
          onClick={toggleMute}
          className="btn-nav audio-toggle"
          title={isMuted ? "Activer le son" : "Couper le son"}
          aria-label={isMuted ? "Activer le son" : "Couper le son"}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>

        {/* BOUTON ACCESSIBILITÉ */}
        <button 
          onClick={() => setIsDyslexic(!isDyslexic)}
          className="btn-nav"
          aria-pressed={isDyslexic}
          title="Activer ou désactiver la police dyslexique"
        >
          {isDyslexic ? "Mode Dys : ON" : "Mode Dys : OFF"}
        </button>

        {/* ACTIONS D'AUTHENTIFICATION */}
        {isLoggedIn ? (
          <>
            <button onClick={resetQuizz} className="nav-item">Accueil</button>
            <button 
                onClick={handleLogout} 
                className="nav-logout-btn" 
                aria-label={`Se déconnecter de ${user}`}
            >
                Quitter ({user})
            </button>
          </>
        ) : (
          <button onClick={() => setIsRegistering(!isRegistering)} className="nav-item">
            {isRegistering ? "Se connecter" : "S'inscrire"}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;