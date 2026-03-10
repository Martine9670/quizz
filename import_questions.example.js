// import_questions.example.js
// Usage: node import_questions.example.js

const axios = require('axios');

const API_URL = 'http://localhost:1337/api/questions';

const exampleQuestions = [
  {
    data: {
      q: "Quelle est la capitale de la France ?",
      a: "Paris",
      categorie: "geographie",
      niveau: "facile"
    }
  },
  {
    data: {
      q: "En quelle année a été créé JavaScript ?",
      a: "1995",
      categorie: "tech",
      niveau: "moyen"
    }
  },
  {
    data: {
      q: "Quel physicien a théorisé l'effet photoélectrique, lui valant le prix Nobel en 1921 ?",
      a: "Albert Einstein",
      categorie: "monde",
      niveau: "difficile"
    }
  }
];

async function seed() {
  console.log("🚀 Démarrage de l'import d'exemple...");
  for (const question of exampleQuestions) {
    try {
      await axios.post(API_URL, question);
      console.log(`✅ Ajouté : ${question.data.q}`);
    } catch (err) {
      console.error(`❌ Erreur pour : ${question.data.q}`, err.message);
    }
  }
  console.log("🏁 Import d'exemple terminé !");
}

seed();