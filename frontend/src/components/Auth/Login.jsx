const Login = ({ handleLogin, setIsRegistering }) => {
  return (
    <>
      <h2 className="main-title">Identification</h2>
      <form onSubmit={handleLogin}>
        <input name="username" className="input-field" placeholder="Pseudo..." required autoFocus />
        <button type="submit" className="btn-primary">ENTRER</button>
      </form>
      <p onClick={() => setIsRegistering(true)} className="toggle-auth">Pas de compte ? S'inscrire</p>
    </>
  );
};

export default Login;