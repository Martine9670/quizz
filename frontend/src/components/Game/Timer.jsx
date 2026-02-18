const Timer = ({ timeLeft }) => {
  const totalTime = 15;
  const percentage = (timeLeft / totalTime) * 100;

  return (
    <div className="timer-wrapper">
      <div className="timer-text">⏱ {timeLeft}s</div>
      <div className="timer-bar-bg">
        <div
          className={`timer-bar-fill ${timeLeft <= 5 ? 'danger' : ''}`} // Passé à 5s pour l'alerte
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Timer;