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
    /* Utilisation de <article> au lieu de <div> pour la sémantique (C1.e) */
    <article className="card">
      <Timer timeLeft={timeLeft} />
      
      {/* On utilise une balise <h2> pour la hiérarchie des titres (C1.e) */}
      <h2 className="question-text">{question}</h2>
      
      <form onSubmit={validerReponse}>
        {/* LABEL OBLIGATOIRE pour l'accessibilité (C1.c) 
            sr-only est une classe pour cacher le texte visuellement mais le laisser pour les malvoyants */}
        <label htmlFor="answer-input" className="sr-only">Votre réponse</label>
        
        <input
          id="answer-input" // Relié au htmlFor du label
          className="input-field"
          value={reponse}
          onChange={e => setReponse(e.target.value)}
          placeholder="Ta réponse..."
          autoFocus
          aria-required="true" // Indique que le champ est obligatoire
        />
        
        <button type="submit" className="btn-primary" aria-label="Valider ma réponse">
          VALIDER
        </button>
      </form>
      
      <button 
        onClick={() => window.confirm("Quitter la partie et enregistrer le score ?") && terminerJeu(score)} 
        className="btn-abandon"
        aria-label="Quitter et enregistrer le score"
      >
        QUITTER
      </button>
    </article>
  );
};

export default QuestionCard;