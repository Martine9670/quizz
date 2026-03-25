/* --- NAVBAR COMPONENT --- */
const Navbar = ({ 
  isLoggedIn, user, niveau, termine, 
  resetQuizz, handleLogout, setIsRegistering, isRegistering,
  isDyslexic, setIsDyslexic,
  isMuted, toggleMute,
  activePage
}) => {
  return (
    <nav className="navbar" aria-label="Navigation principale">
      
{/* --- LEFT SECTION: LOGO & STATUS --- */}
      <div className="nav-left">
        {/* ACCESSIBILITY IMPROVEMENT: h1 remains for SEO, but interaction is in a button */}
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

        {/* --- DYNAMIC DISPLAY --- */}
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

{/* --- RIGHT SECTION: LINKS & ACTIONS --- */}
      <div className="nav-links">
        
        {/* AUDIO BUTTON (New!) */}
        <button 
          onClick={toggleMute}
          className="btn-nav audio-toggle"
          title={isMuted ? "Activer le son" : "Couper le son"}
          aria-label={isMuted ? "Activer le son" : "Couper le son"}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>

        {/* ACCESSIBILITY BUTTON */}
        <button 
          onClick={() => setIsDyslexic(!isDyslexic)}
          className="btn-nav"
          aria-pressed={isDyslexic}
          title="Activer ou désactiver la police dyslexique"
        >
          {isDyslexic ? "Mode Dys : ON" : "Mode Dys : OFF"}
        </button>

        {/* AUTHENTICATION ACTIONS */}
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
          activePage === 'game' && (
            <button onClick={() => setIsRegistering(!isRegistering)} className="nav-item">
              {isRegistering ? "Se connecter" : "S'inscrire"}
            </button>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;