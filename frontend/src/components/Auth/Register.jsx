/* --- COMPOSANT D'INSCRIPTION --- */
// On récupère authError ici aussi
const Register = ({ handleRegister, setIsRegistering, authError }) => {
  return (
    <section aria-labelledby="register-title">
      {/* --- TITRE DE LA SECTION --- */}
      <h2 id="register-title" className="main-title">Inscription</h2>
      
      {/* --- FORMULAIRE D'INSCRIPTION --- */}
      <form onSubmit={handleRegister} aria-label="Formulaire d'inscription">
        <label htmlFor="reg-username" className="sr-only">Pseudo</label>
        <input id="reg-username" name="username" className="input-field" placeholder="Pseudo..." required />
        
        <label htmlFor="reg-email" className="sr-only">Email</label>
        <input id="reg-email" name="email" type="email" className="input-field" placeholder="Email..." required />
        
        <label htmlFor="reg-password" className="sr-only">Mot de passe</label>
        <input id="reg-password" name="password" type="password" className="input-field" placeholder="Mot de passe..." required />

        {/* --- GESTION DES ERREURS D'AUTHENTIFICATION --- */}
        {/* --- AFFICHAGE DE L'ERREUR SERVEUR OU VALIDATION --- */}
        {authError && (
          <p style={{ color: '#ff4d4d', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '15px' }} role="alert">
            {authError}
          </p>
        )}

        <button type="submit" className="btn-primary">CRÉER MON COMPTE</button>
      </form>

      {/* --- LIEN DE BASCULE VERS CONNEXION --- */}
      <button 
        onClick={() => setIsRegistering(false)} 
        className="toggle-auth"
        style={{ background: 'none', border: 'none', font: 'inherit' }}
        type="button"
      >
        Déjà un compte ? Se connecter
      </button>
    </section>
  );
};

/* --- EXPORT --- */
export default Register;