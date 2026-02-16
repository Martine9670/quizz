import Timer from './Timer';

const QuestionCard = ({ 
  timeLeft, 
  question, 
  reponse, 
  setReponse, 
  validerReponse, 
  terminerJeu, 
  score 
}) => {
  return (
    <div className="card">
      <Timer timeLeft={timeLeft} />
      
      <p className="question-text">{question}</p>
      
      <form onSubmit={validerReponse}>
        <input
          className="input-field"
          value={reponse}
          onChange={e => setReponse(e.target.value)}
          placeholder="Ta réponse..."
          autoFocus
        />
        <button type="submit" className="btn-primary">VALIDER</button>
      </form>
      
      <button 
        onClick={() => window.confirm("Quitter ?") && terminerJeu(score)} 
        className="btn-abandon"
      >
        QUITTER
      </button>
    </div>
  );
};

export default QuestionCard;