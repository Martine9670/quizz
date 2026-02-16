const Navbar = ({ 
  isLoggedIn, user, niveau, termine, 
  resetQuizz, handleLogout, setIsRegistering, isRegistering 
}) => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="nav-logo">🕹️ QUIZZY</div>
        <div className="status-dot"></div>
        
        {!niveau ? (
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
        {isLoggedIn ? (
          <>
            <button onClick={resetQuizz} className="nav-item">Accueil</button>
            <button onClick={handleLogout} className="nav-logout-btn">Quitter ({user})</button>
          </>
        ) : (
          <button onClick={() => setIsRegistering(!isRegistering)} className="nav-item">
            {isRegistering ? (isLoggedIn ? "" : "Se connecter") : "S'inscrire"}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;