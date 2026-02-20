import LegalText from './LegalText';

const CGU = ({ onBack }) => {
  const content = [
    "Bienvenue sur Quizzy. En utilisant ce jeu, vous acceptez de ne pas tricher.",
    "Les scores sont enregistrés pour le classement mondial. Votre pseudo est public.",
    "Tout pseudo injurieux sera supprimé."
  ];
  return <LegalText title="Conditions Générales" content={content} onBack={onBack} />;
};

export default CGU;