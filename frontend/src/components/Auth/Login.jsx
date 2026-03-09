/* --- COMPOSANT DE CONNEXION --- */
const Login = ({ handleLogin, setIsRegistering, authError }) => {
  return (
    <section aria-labelledby="login-title">
      <h2 id="login-title" className="main-title">Identification</h2>
      
      <form onSubmit={handleLogin} aria-label="Formulaire de connexion">
        {/* --- CHAMP PSEUDO --- */}
        <label htmlFor="login-username" className="sr-only">Votre Pseudo</label>
        <input 
          id="login-username"
          name="username" 
          type="text"
          className="input-field" 
          placeholder="Pseudo ou Email..." 
          required 
          autoFocus 
          aria-required="true"
        />

        {/* --- NOUVEAU : CHAMP MOT DE PASSE --- */}
        <label htmlFor="login-password" className="sr-only">Votre Mot de passe</label>
        <input 
          id="login-password"
          name="password" 
          type="password" 
          className="input-field" 
          placeholder="Mot de passe..." 
          required 
          aria-required="true"
        />

        {/* --- GESTION D'ERREUR --- */}
        {authError && (
          <p className="error-message" role="alert" style={{ color: '#ff4d4d', fontSize: '0.9rem', marginBottom: '10px' }}> 
            {authError}
          </p>
        )}
        
        <button type="submit" className="btn-primary" aria-label="Se connecter au jeu">
          ENTRER
        </button>
        
        <p className="legal-notice-simple">
          En entrant, vous acceptez nos conditions et notre politique de confidentialité.
        </p>
      </form>

      <button 
        onClick={() => setIsRegistering(true)} 
        className="toggle-auth"
        aria-label="Aller à la page d'inscription"
        type="button"
      >
        Pas de compte ? S'inscrire
      </button>
    </section>
  );
};

export default Login;