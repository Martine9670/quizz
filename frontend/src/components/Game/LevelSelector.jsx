/* --- COMPOSANT SÉLECTEUR DE NIVEAU --- */
const LevelSelector = ({ handleDemarrer}) => {
  return (
    <div className="card">
      {/* Utilisation de <h2> pour la hiérarchie sémantique */}
      <h2 className="main-title">CHOISIS TON NIVEAU DE DIFFICULTÉ</h2>
      
      {/* On définit le rôle "group" pour indiquer que ces boutons sont liés entre eux */}
      <div className="level-grid" role="group" aria-labelledby="difficulty-title">
        {['facile', 'moyen', 'difficile'].map(lv => (
          <button 
            key={lv} 
            onClick={() => handleDemarrer(lv)} 
            className={`btn-level ${lv}`}
            /* ARIA-LABEL pour donner une instruction claire */
            aria-label={`Démarrer une partie en mode ${lv}`}
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