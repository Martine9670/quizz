import React from 'react';

/* --- COMPOSANT FOOTER --- */
const Footer = ({ onNavigate }) => {
  return (
    <footer className="footer" aria-label="Pied de page">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} QUIZZY</p>
        <nav className="footer-links">
          <button className="footer-btn" onClick={() => onNavigate('contact')}>Contact</button>
          <button className="footer-btn" onClick={() => onNavigate('cgu')}>CGU</button>
          <button className="footer-btn" onClick={() => onNavigate('mentions')}>Mentions</button>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;