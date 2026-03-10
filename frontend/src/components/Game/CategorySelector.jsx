import React from 'react';

const categories = [
  { id: 'mix', label: 'Mélange', icon: '🎲', color: '#a777e3' },
  { id: 'tech', label: 'Tech & Code', icon: '💻', color: '#646cff' },
  { id: 'science', label: 'Sciences', icon: '🧪', color: '#4ade80' },
  { id: 'art', label: 'Arts & Culture', icon: '🎨', color: '#ffcc00' },
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