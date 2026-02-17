const Navbar = ({ 
  isLoggedIn, user, niveau, termine, 
  resetQuizz, handleLogout, setIsRegistering, isRegistering,
  isDyslexic, setIsDyslexic
}) => {
  return (
    <nav className="navbar" aria-label="Navigation principale">
      <div className="nav-left">
        <h1 className="nav-logo">🕹️ QUIZZY</h1>
        
        <div className="nav-status" title={isLoggedIn ? "Connecté" : "Hors-ligne"}>
          <span className={`status-indicator ${isLoggedIn ? 'pulse-green' : 'pulse-red'}`}></span>
        </div>

        {niveau === null ? (
          /* ICI : On applique la classe SEULEMENT si isDyslexic est vrai */
          <span className={`nav-slogan ${isDyslexic ? 'dyslexic-mode' : ''}`}>
            Prêt à relever le défi ?
          </span>
        ) : (
          !termine && (
            /* On l'applique aussi ici pour les infos de jeu */
            <div className={`nav-game-info ${isDyslexic ? 'dyslexic-mode' : ''}`}>
              Partie en cours : <span className={`badge-mini ${niveau}`}>{niveau}</span>
            </div>
          )
        )}      
      </div>

      <div className="nav-links">
        <button 
          onClick={() => setIsDyslexic(!isDyslexic)}
          className="btn-nav"
        >
          {/* Libellé logique : si c'est ON, on propose de mettre OFF */}
          {isDyslexic ? "Désactiver Mode Dys" : "Activer Mode Dys"}
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