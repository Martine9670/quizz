/* --- COMPOSANT DE CONNEXION --- */
// On ajoute "authError" dans les props récupérées
const Login = ({ handleLogin, setIsRegistering, authError }) => {
  return (
    <section aria-labelledby="login-title">
      {/* --- TITRE DE LA SECTION --- */}
      <h2 id="login-title" className="main-title">Identification</h2>
      
      {/* --- FORMULAIRE DE CONNEXION --- */}
      <form onSubmit={handleLogin} aria-label="Formulaire de connexion">
        <label htmlFor="login-username" className="sr-only">Votre Pseudo</label>
        <input 
          id="login-username"
          name="username" 
          className="input-field" 
          placeholder="Pseudo..." 
          required 
          autoFocus 
          aria-required="true"
        />

        {/* --- SECTION GESTION D'ERREUR --- */}
        {/* --- AFFICHAGE DE L'ERREUR REGEX --- */}
        {authError && (
          <p style={{ color: '#ff4d4d', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '15px' }} role="alert">
            {authError}
          </p>
        )}
        
        {/* --- BOUTON DE VALIDATION --- */}
        <button type="submit" className="btn-primary" aria-label="Se connecter au jeu">
          ENTRER
        </button>
      </form>

      {/* --- LIEN DE BASCULE VERS INSCRIPTION --- */}
      <button 
        onClick={() => setIsRegistering(true)} 
        className="toggle-auth"
        style={{ background: 'none', border: 'none', font: 'inherit' }}
        type="button"
      >
        Pas de compte ? S'inscrire
      </button>
    </section>
  );
};

/* --- EXPORT --- */
export default Login;