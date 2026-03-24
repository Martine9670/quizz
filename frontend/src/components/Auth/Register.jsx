/* --- REGISTER COMPONENT --- */
// Also get authError here
const Register = ({ handleRegister, setIsRegistering, authError }) => {
  return (
    <section aria-labelledby="register-title">
      {/* --- SECTION TITLE --- */}
      <h2 id="register-title" className="main-title">Inscription</h2>
      
      {/* --- REGISTRATION FORM --- */}
      <form onSubmit={handleRegister} aria-label="Formulaire d'inscription">
        <label htmlFor="reg-username" className="sr-only">Pseudo</label>
        <input id="reg-username" name="username" className="input-field" placeholder="Pseudo..." required />
        
        <label htmlFor="reg-email" className="sr-only">Email</label>
        <input id="reg-email" name="email" type="email" className="input-field" placeholder="Email..." required />
        
        <label htmlFor="reg-password" className="sr-only">Mot de passe</label>
        <input id="reg-password" name="password" type="password" className="input-field" placeholder="Mot de passe..." required />

        {/* --- AUTHENTICATION ERROR HANDLING --- */}
        {/* --- DISPLAY SERVER OR VALIDATION ERROR --- */}
        {authError && (
          <p style={{ color: '#ff4d4d', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '15px' }} role="alert">
            {authError}
          </p>
        )}

        <button type="submit" className="btn-primary">CRÉER MON COMPTE</button>
        <p className="legal-notice-simple">
          En entrant, vous acceptez nos conditions et notre politique de confidentialité.
        </p>
      </form>

      {/* --- TOGGLE LINK TO LOGIN --- */}
      <button 
        onClick={() => setIsRegistering(false)} 
        className="toggle-auth"
        aria-label="Retourner à la page de connexion"
        type="button"
      >
        Déjà un compte ? Se connecter
      </button>
    </section>
  );
};

/* --- EXPORT --- */
export default Register;