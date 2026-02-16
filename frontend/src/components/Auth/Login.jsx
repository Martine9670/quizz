// On ajoute "authError" dans les props récupérées
const Login = ({ handleLogin, setIsRegistering, authError }) => {
  return (
    <section aria-labelledby="login-title">
      <h2 id="login-title" className="main-title">Identification</h2>
      
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

        {/* --- CRITÈRE C2.b : AFFICHAGE DE L'ERREUR REGEX --- */}
        {authError && (
          <p style={{ color: '#ff4d4d', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '15px' }} role="alert">
            {authError}
          </p>
        )}
        
        <button type="submit" className="btn-primary" aria-label="Se connecter au jeu">
          ENTRER
        </button>
      </form>

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

export default Login;