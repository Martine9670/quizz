/* --- COMPOSANT LEADERBOARD --- */
const Leaderboard = ({ historique }) => {
  return (
    <div className="history-section">
      {/* --- ENTÊTE --- */}
      <h3>🏆 Le tableau des légendes 🏆</h3>
      
      {/* --- LISTE DES SCORES --- */}
      <ul className="history-list">
        {historique.map((h, i) => {
          /* Extraction des données (Compatible Strapi & API locale) */
          const data = h.attributes ? h.attributes : h;
          
          return (
            <li key={h.id || i} className="history-item">
              
              {/* SECTION GAUCHE : RANG ET UTILISATEUR */}
              <div className="history-user">
                <span className="rank">#{i + 1}</span>
                <div className="user-info-stack">
                  <strong>{data.pseudo || data.username}</strong>
                  <span className="score-date">Record</span>
                </div>
              </div>

              {/* SECTION DROITE : DIFFICULTÉ ET SCORE */}
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

/* --- EXPORT --- */
export default Leaderboard;