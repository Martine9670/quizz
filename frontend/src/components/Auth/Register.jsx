const Register = ({ handleRegister, setIsRegistering }) => {
  return (
    <>
      <h2 className="main-title">Inscription</h2>
      <form onSubmit={handleRegister}>
        <input name="username" className="input-field" placeholder="Pseudo..." required />
        <input name="email" type="email" className="input-field" placeholder="Email..." required />
        <input name="password" type="password" className="input-field" placeholder="Mot de passe..." required />
        <button type="submit" className="btn-primary">CRÉER MON COMPTE</button>
      </form>
      <p onClick={() => setIsRegistering(false)} className="toggle-auth">Déjà un compte ? Se connecter</p>
    </>
  );
};

export default Register;