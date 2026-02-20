const GDPR = ({ onBack }) => {
  return (
    <div className="game-layout-wrapper"> {/* Pour éviter que ce soit sous la Navbar */}
      <div className="card" style={{ maxWidth: '800px', textAlign: 'left' }}>
        <h1 className="main-title">Confidentialité & RGPD</h1>
        
        <p>Conformément au RGPD, nous vous informons que :</p>
        
        <ul style={{ lineHeight: '2' }}>
          <li><strong>Données collectées :</strong> Pseudo et Email (uniquement pour le compte utilisateur).</li>
          <li><strong>Finalité :</strong> Sauvegarder vos scores et votre progression.</li>
          <li><strong>Conservation :</strong> Vos données sont conservées tant que votre compte est actif.</li>
          <li><strong>Vos droits :</strong> Vous pouvez demander la suppression de vos données via l'administration Strapi.</li>
        </ul>

        <button 
          onClick={onBack} 
          className="btn-primary" 
          style={{ marginTop: '20px' }}
        >
          RETOUR AU JEU
        </button>
      </div>
    </div>
  );
};

export default GDPR;