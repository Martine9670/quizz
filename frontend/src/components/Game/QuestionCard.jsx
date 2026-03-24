/* --- IMPORTS --- */
import Timer from './Timer';

/* --- QUESTION CARD COMPONENT --- */
const QuestionCard = ({ 
  timeLeft, 
  question, 
  reponse, 
  setReponse, 
  validerReponse, 
  terminerJeu, 
  score 
}) => {
  
  // CLEAN CODE: Extract confirmation logic for clarity
  const handleQuit = () => {
    if (window.confirm("Quitter la partie et enregistrer le score ?")) {
      terminerJeu(score);
    }
  };

  return (
    /* --- MAIN STRUCTURE --- */
    /* Using <article> instead of <div> for semantics */
    <article className="card">
      
      {/* TIMER COMPONENT */}
      <Timer timeLeft={timeLeft} />
      
      {/* QUESTION SECTION */}
      {/* Using an <h2> tag for heading hierarchy */}
      <h2 className="question-text">{question}</h2>
      
      {/* ANSWER FORM SECTION */}
      <form onSubmit={validerReponse}>
        {/* MANDATORY LABEL for accessibility 
            sr-only is a class to hide text visually but keep it for screen readers */}
        <label htmlFor="answer-input" className="sr-only">Votre réponse</label>
        
        <input
          id="answer-input" // Relié au htmlFor du label
          className="input-field"
          value={reponse}
          onChange={e => setReponse(e.target.value)}
          placeholder="Ta réponse..."
          autoFocus
          required
          aria-required="true" // Indicates that the field is required
        />
        
        <button type="submit" className="btn-primary answer-btn" aria-label="Valider ma réponse">
          VALIDER
        </button>
      </form>
      
      {/* EXIT ACTIONS SECTION */}
      <button 
        onClick={handleQuit} 
        className="btn-abandon answer-btn-exit"
        aria-label="Quitter et enregistrer le score"
      >
        QUITTER
      </button>
      
    </article>
  );
};

/* --- EXPORT --- */
export default QuestionCard;