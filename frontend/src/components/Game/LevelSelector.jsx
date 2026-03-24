import { useRef } from 'react';

/* --- LEVEL SELECTOR COMPONENT --- */
const LevelSelector = ({ handleDemarrer}) => {
  // UX: Manage references for keyboard arrow navigation
  const buttonsRef = useRef([]);
  const levels = ['facile', 'moyen', 'difficile'];

  const handleKeyDown = (e, index) => {
    // If right or down arrow -> next button
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % levels.length;
      buttonsRef.current[nextIndex].focus();
    }
    // If left or up arrow -> previous button
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + levels.length) % levels.length;
      buttonsRef.current[prevIndex].focus();
    }
  };

  return (
    <div className="card">
      {/* Using <h2> for semantic hierarchy */}
      <h2 className="main-title">CHOISIS TON NIVEAU DE DIFFICULTÉ</h2>
      
      {/* Define role "group" to indicate these buttons are related */}
      <div className="level-grid" role="group" aria-labelledby="difficulty-title">
        {levels.map((lv, index) => (
          <button 
            key={lv} 
            ref={el => buttonsRef.current[index] = el}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onClick={() => handleDemarrer(lv)} 
            className={`btn-level ${lv}`}
            /* ARIA-LABEL to provide clear instruction */
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