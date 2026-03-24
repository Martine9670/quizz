import { useRef } from 'react';

/* --- COMPOSANT SÉLECTEUR DE NIVEAU --- */
const LevelSelector = ({ handleDemarrer}) => {
  // UX : Gestion des références pour la navigation aux flèches du clavier
  const buttonsRef = useRef([]);
  const levels = ['facile', 'moyen', 'difficile'];

  const handleKeyDown = (e, index) => {
    // Si flèche droite ou bas -> bouton suivant
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % levels.length;
      buttonsRef.current[nextIndex].focus();
    }
    // Si flèche gauche ou haut -> bouton précédent
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + levels.length) % levels.length;
      buttonsRef.current[prevIndex].focus();
    }
  };

  return (
    <div className="card">
      {/* Utilisation de <h2> pour la hiérarchie sémantique */}
      <h2 className="main-title">CHOISIS TON NIVEAU DE DIFFICULTÉ</h2>
      
      {/* On définit le rôle "group" pour indiquer que ces boutons sont liés entre eux */}
      <div className="level-grid" role="group" aria-labelledby="difficulty-title">
        {levels.map((lv, index) => (
          <button 
            key={lv} 
            ref={el => buttonsRef.current[index] = el}
            onKeyDown={(e) => handleKeyDown(e, index)}
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