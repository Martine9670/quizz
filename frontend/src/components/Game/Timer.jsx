/* --- TIMER COMPONENT --- */
const Timer = ({ timeLeft }) => {
  /* --- CALCULATION LOGIC --- */
  const totalTime = 15;
  const percentage = (timeLeft / totalTime) * 100;

  return (
    <div className="timer-wrapper">
      {/* DIGITAL DISPLAY */}
      <div className="timer-text">
        <span className="sr-only">Temps restant : </span>
        ⏱ {timeLeft}s
      </div>
      
      {/* VISUAL PROGRESS BAR (C1.c & C1.d) */}
      <div className="timer-bar-bg">
        <div
          className={`timer-bar-fill ${timeLeft <= 5 ? 'danger' : ''}`}
          style={{ width: `${percentage}%` }}
          /* --- ACCESSIBILITY ATTRIBUTES --- */
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