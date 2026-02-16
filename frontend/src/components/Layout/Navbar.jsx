const Navbar = ({ 
  isLoggedIn, user, niveau, termine, 
  resetQuizz, handleLogout, setIsRegistering, isRegistering,
  isDyslexic, setIsDyslexic
}) => {
  return (
    <nav className="navbar" aria-label="Navigation principale">
      <div className="nav-left">
        <h1 className="nav-logo">🕹️ QUIZZY</h1>
        
        {/* --- LE PULSE DE CONNEXION --- */}
        <div className="nav-status" title={isLoggedIn ? "Connecté" : "Hors-ligne"}>
          <span className={`status-indicator ${isLoggedIn ? 'pulse-green' : 'pulse-red'}`}></span>
        </div>
        {/* ----------------------------- */}

        {niveau === null ? (
          <span className="nav-slogan">Prêt à relever le défi ?</span>
        ) : (
          !termine && (
            <div className="nav-game-info">
              Partie en cours : <span className={`badge-mini ${niveau}`}>{niveau}</span>
            </div>
          )
        )}
      </div>

      <div className="nav-links">
        <button 
          onClick={() => setIsDyslexic(!isDyslexic)}
          className="btn-nav"
          data-mode={isDyslexic ? "dys" : "normal"}
        >
          {isDyslexic ? "Mode normal" : "Mode Dys"}
        </button>

        {isLoggedIn ? (
          <>
            <button onClick={resetQuizz} className="nav-item">Accueil</button>
            <button onClick={handleLogout} className="nav-logout-btn">Quitter ({user})</button>
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