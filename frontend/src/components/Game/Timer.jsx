const Timer = ({ timeLeft }) => {
  return (
    <div className="timer-wrapper">
      <div className="timer-text">⏱ {timeLeft}s</div>
      <div className="timer-bar-bg">
        <div
          className={`timer-bar-fill ${timeLeft <= 3 ? 'danger' : ''}`}
          style={{ width: `${timeLeft * 20}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Timer;