import LegalText from './LegalText';

const Mentions = ({ onBack }) => {
  const content = [
    "Éditeur : Martine, Développeur.",
    "Hébergement : Projet réalisé avec React et Strapi.",
    "Données : Conformément au RGPD, vous disposez d'un droit d'accès."
  ];
  return <LegalText title="Mentions Légales" content={content} onBack={onBack} />;
};

export default Mentions;