/* --- COMPOSANT TIMER --- */
const Timer = ({ timeLeft }) => {
  /* --- LOGIQUE DE CALCUL --- */
  const totalTime = 15;
  const percentage = (timeLeft / totalTime) * 100;

  return (
    <div className="timer-wrapper">
      {/* AFFICHAGE NUMÉRIQUE */}
      <div className="timer-text">
        <span className="sr-only">Temps restant : </span>
        ⏱ {timeLeft}s
      </div>
      
      {/* BARRE DE PROGRESSION VISUELLE (C1.c & C1.d) */}
      <div className="timer-bar-bg">
        <div
          className={`timer-bar-fill ${timeLeft <= 5 ? 'danger' : ''}`}
          style={{ width: `${percentage}%` }}
          /* --- ATTRIBUTS D'ACCESSIBILITÉ --- */
          role="progressbar"
          aria-valuenow={timeLeft}
          aria-valuemin="0"
          aria-valuemax={totalTime}
          aria-label={`Temps restant : ${timeLeft} secondes`}
        ></div>
      </div>
    </div>
  );
};

/* --- EXPORT --- */
export default Timer;