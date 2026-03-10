import React from 'react';

const categories = [
  { id: 'tech', label: 'Tech & Code', icon: '💻', color: '#646cff' },
  { id: 'espace', label: 'Espace', icon: '🌌', color: '#a777e3' },
  { id: 'cine', label: 'Cinéma', icon: '🎬', color: '#ff4757' },
  { id: 'gaming', label: 'Gaming', icon: '🕹️', color: '#2ed573' },
  { id: 'monde', label: 'Monde', icon: '🌍', color: '#ffa502' },
  { id: 'cuisine', label: 'Cuisine', icon: '🍳', color: '#ff6b6b' },
  { id: 'sport', label: 'Sport', icon: '⚽', color: '#1e90ff' },
  { id: 'musique', label: 'Musique', icon: '🎵', color: '#ff7f50' },
  { id: 'histoire', label: 'Histoire', icon: '📜', color: '#747d8c' },
  { id: 'geographie', label: 'Géographie', icon: '🗺️', color: '#2ed573' },
];

const CategorySelector = ({ onSelectCategory }) => {
  return (
    <div className="category-selector">
      <h2 className="main-title">Choisis ton thème</h2>
      <div className="category-grid">
        {categories.map((cat) => (
          <button 
            key={cat.id} 
            className="category-card"
            onClick={() => onSelectCategory(cat.id)}
            style={{ '--cat-color': cat.color }}
          >
            <span className="category-icon">{cat.icon}</span>
            <span className="category-label">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;