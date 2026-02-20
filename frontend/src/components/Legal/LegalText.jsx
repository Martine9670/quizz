import React from 'react';

const LegalText = ({ title, content, onBack }) => {
  return (
    <div className="card animate-fade-in legal-card">
      <h2 className="main-title">{title}</h2>
      <div className="legal-content">
        {content.map((paragraph, index) => (
          <p key={index} className="legal-paragraph">{paragraph}</p>
        ))}
      </div>
      <button onClick={onBack} className="btn-primary" style={{marginTop: '20px'}}>
        Retour au jeu
      </button>
    </div>
  );
};

export default LegalText;