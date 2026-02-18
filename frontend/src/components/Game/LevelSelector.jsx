/* --- COMPOSANT SÉLECTEUR DE NIVEAU --- */
const LevelSelector = ({ handleDemarrer }) => {
  return (
    <div className="card">
      {/* --- TITRE DE L'ÉCRAN DE SÉLECTION --- */}
      <h2 className="main-title">CHOISIS TON NIVEAU DE DIFFICULTÉ</h2>
      
      {/* --- GRILLE DES BOUTONS DE DIFFICULTÉ --- */}
      <div className="level-grid">
        {['facile', 'moyen', 'difficile'].map(lv => (
          <button 
            key={lv} 
            onClick={() => handleDemarrer(lv)} 
            className={`btn-level ${lv}`}
          >
            {lv.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

/* --- EXPORT --- */
export default LevelSelector;