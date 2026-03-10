import React from 'react';

const GameModeSelector = ({ selectedNb, onSelect }) => {
  const modes = [
    { label: 'Rapide', value: 10, icon: '⚡' },
    { label: 'Standard', value: 50, icon: '🏆' },
    { label: 'Marathon', value: 100, icon: '🏁' }
  ];

  return (
    <div className="game-mode-selector">
      <p className="mode-selection-title"> Choisis ton format :</p>
      <div className="game-mode-container">
        {modes.map((mode) => (
          <button
            key={mode.value}
            className={`mode-btn ${selectedNb === mode.value ? 'active' : ''}`}
            onClick={() => onSelect(mode.value)}
          >
            <span className="mode-icon">{mode.icon}</span>
            <span className="mode-text">{mode.label}</span>
            <span className="mode-count">({mode.value})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameModeSelector;