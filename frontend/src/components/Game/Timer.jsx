/* --- COMPOSANT TIMER --- */
const Timer = ({ timeLeft }) => {
  /* --- LOGIQUE DE CALCUL --- */
  const totalTime = 15;
  const percentage = (timeLeft / totalTime) * 100;

  return (
    <div className="timer-wrapper">
      {/* AFFICHAGE NUMÉRIQUE */}
      <div className="timer-text">⏱ {timeLeft}s</div>
      
      {/* BARRE DE PROGRESSION VISUELLE */}
      <div className="timer-bar-bg">
        <div
          className={`timer-bar-fill ${timeLeft <= 5 ? 'danger' : ''}`} // Alerte visuelle sous les 5 secondes
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

/* --- EXPORT --- */
export default Timer;