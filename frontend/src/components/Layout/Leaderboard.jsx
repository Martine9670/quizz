import { useState } from 'react';

/* --- COMPOSANT LEADERBOARD --- */
const Leaderboard = ({ historique }) => {
  /* --- LOGIQUE DE FILTRAGE --- */
  const [ongletDifficulte, setOngletDifficulte] = useState('facile');
  const [ongletFormat, setOngletFormat] = useState(10); // 10, 50 ou 100

  // On filtre par FORMAT (nb questions) ET par DIFFICULTÉ
  const scoresFiltres = historique
    .map(h => h.attributes ? { ...h.attributes, id: h.id } : h)
    .filter(data => 
      (data.difficulte || 'facile') === ongletDifficulte && 
      (data.total === ongletFormat) // On filtre sur la colonne "total"
    )
    .sort((a, b) => b.points - a.points);

  return (
    <div className="history-section">
      <h3>🏆 Le tableau des légendes</h3>

      {/* --- 1. SÉLECTION DU FORMAT (Rapide, Standard, Marathon) --- */}
      <div className="format-tabs">
        <button 
          className={`tab-btn ${ongletFormat === 10 ? 'active' : ''}`} 
          onClick={() => setOngletFormat(10)}
        >
          ⚡ 10
        </button>
        <button 
          className={`tab-btn ${ongletFormat === 50 ? 'active' : ''}`} 
          onClick={() => setOngletFormat(50)}
        >
          🏆 50
        </button>
        <button 
          className={`tab-btn ${ongletFormat === 100 ? 'active' : ''}`} 
          onClick={() => setOngletFormat(100)}
        >
          🏁 100
        </button>
      </div>

      {/* --- 2. SÉLECTION DE LA DIFFICULTÉ --- */}
      <div className="difficulty-tabs">
        {['facile', 'moyen', 'difficile'].map((niv) => (
          <button 
            key={niv}
            className={`tab-btn ${niv} ${ongletDifficulte === niv ? 'active' : ''}`} 
            onClick={() => setOngletDifficulte(niv)}
          >
            {niv.charAt(0).toUpperCase() + niv.slice(1)}
          </button>
        ))}
      </div>
      
      {/* --- 3. LISTE DES SCORES FILTRÉS --- */}
      <ul className="history-list">
        {scoresFiltres.map((data, i) => (
          <li key={data.id || i} className="history-item">
            <div className="history-user">
              <span className="rank">#{i + 1}</span>
              <div className="user-info-stack">
                <strong>{data.pseudo || data.username}</strong>
                <span className="score-date">Mode {ongletFormat} q.</span>
              </div>
            </div>

            <div className="history-details">
              <span className={`badge-mini ${data.difficulte}`}>{data.difficulte}</span>
              <span className="points">{data.points}/{data.total}</span>
            </div>
          </li>
        ))}
      </ul>
      
      {scoresFiltres.length === 0 && (
        <p className="no-score-message">
          Aucun record en {ongletDifficulte} ({ongletFormat} questions).
        </p>
      )}
    </div>
  );
};

export default Leaderboard;