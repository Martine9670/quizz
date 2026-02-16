const LevelSelector = ({ handleDemarrer }) => {
  return (
    <div className="card">
      <h2 className="main-title">NIVEAUX</h2>
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

export default LevelSelector;