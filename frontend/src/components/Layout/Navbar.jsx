/* --- COMPOSANT NAVBAR --- */
const Navbar = ({ 
  isLoggedIn, user, niveau, termine, 
  resetQuizz, handleLogout, setIsRegistering, isRegistering,
  isDyslexic, setIsDyslexic
}) => {
  return (
    <nav className="navbar" aria-label="Navigation principale">
      
{/* --- SECTION GAUCHE : LOGO & STATUT --- */}
      <div className="nav-left">
        {/* On ajoute onClick et le style cursor pour le retour accueil */}
        <h1 
          className="nav-logo" 
          aria-label="Quizzy - Le jeu de quiz"
          onClick={resetQuizz}
          style={{ cursor: 'pointer' }}
        >
          🕹️ QUIZZY
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
        {/* BOUTON ACCESSIBILITÉ (C1.c) */}
        <button 
          onClick={() => setIsDyslexic(!isDyslexic)}
          className="btn-nav"
          aria-pressed={isDyslexic}
          title="Activer ou désactiver la police dyslexique"
        >
          {isDyslexic ? "Désactiver Mode Dys" : "Activer Mode Dys"}
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