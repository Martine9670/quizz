import { useState } from 'react';

/* --- COMPOSANT LEADERBOARD --- */
const Leaderboard = ({ historique }) => {
  /* --- LOGIQUE DE FILTRAGE PAR DIFFICULTÉ --- */
  // On initialise sur 'facile' pour correspondre à ton premier niveau
  const [ongletDifficulte, setOngletDifficulte] = useState('facile');

  // Filtrage et tri des scores selon le niveau exact choisi
  const scoresFiltres = historique
    .map(h => h.attributes ? { ...h.attributes, id: h.id } : h)
    .filter(data => (data.difficulte || 'facile') === ongletDifficulte)
    .sort((a, b) => b.points - a.points);

  return (
    <div className="history-section">
      {/* --- ENTÊTE --- */}
      <h3>🏆 Le tableau des légendes</h3>

      {/* --- ONGLETS DE SÉLECTION DE NIVEAU --- */}
      <div className="difficulty-tabs" style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
        <button 
          className={ongletDifficulte === 'facile' ? 'active' : ''} 
          onClick={() => setOngletDifficulte('facile')}
        >
          Facile
        </button>
        <button 
          className={ongletDifficulte === 'moyen' ? 'active' : ''} 
          onClick={() => setOngletDifficulte('moyen')}
        >
          Moyen
        </button>
        <button 
          className={ongletDifficulte === 'difficile' ? 'active' : ''} 
          onClick={() => setOngletDifficulte('difficile')}
        >
          Difficile
        </button>
      </div>
      
      {/* --- LISTE DES SCORES FILTRÉS --- */}
      <ul className="history-list">
        {scoresFiltres.map((data, i) => {
          return (
            <li key={data.id || i} className="history-item">
              
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
      {scoresFiltres.length === 0 && (
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
          Aucun score enregistré en niveau {ongletDifficulte}.
        </p>
      )}
    </div>
  );
};

/* --- EXPORT --- */
export default Leaderboard;