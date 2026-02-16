const Leaderboard = ({ historique }) => {
  return (
    <div className="history-section">
      <h3>🏆 Le tableau des légendes 🏆</h3>
      <ul className="history-list">
        {historique.map((h, i) => {
          const data = h.attributes ? h.attributes : h;
          return (
            <li key={h.id || i} className="history-item">
              <div className="history-user">
                <span className="rank">#{i + 1}</span>
                <div className="user-info-stack">
                  <strong>{data.pseudo || data.username}</strong>
                  <span className="score-date">Record</span>
                </div>
              </div>
              <div className="history-details">
                <span className={`badge-mini ${data.difficulte}`}>{data.difficulte}</span>
                <span className="points">{data.points}/{data.total}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Leaderboard;