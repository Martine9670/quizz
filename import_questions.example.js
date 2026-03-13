// import_questions.example.js
// Usage: node import_questions.example.js

const axios = require('axios');

const API_URL = 'http://localhost:1337/api/questions';

const exampleQuestions = [
  // --- FACILE ---
  {
    data: {
      intitule: "Quelle est la capitale de la France ?",
      reponse: "Paris",
      categorie: "geographie",
      niveau: "facile"
    }
  },
  {
    data: {
      intitule: "Combien de couleurs y a-t-il dans un arc-en-ciel ?",
      reponse: "7",
      categorie: "monde",
      niveau: "facile"
    }
  },
  {
    data: {
      intitule: "Quel est le langage de style utilisé pour mettre en forme une page web ?",
      reponse: "CSS",
      categorie: "tech",
      niveau: "facile"
    }
  },
  {
    data: {
      intitule: "Quel sport se joue avec un ballon rond sur un terrain rectangulaire ?",
      reponse: "Football",
      categorie: "sport",
      niveau: "facile"
    }
  },
  {
    data: {
      intitule: "Quelle est la couleur du ciel par temps clair ?",
      reponse: "Bleu",
      categorie: "monde",
      niveau: "facile"
    }
  },

  // --- MOYEN ---
  {
    data: {
      intitule: "En quelle année a été créé JavaScript ?",
      reponse: "1995",
      categorie: "tech",
      niveau: "moyen"
    }
  },
  {
    data: {
      intitule: "Quelle planète est surnommée la planète rouge ?",
      reponse: "Mars",
      categorie: "espace",
      niveau: "moyen"
    }
  },
  {
    data: {
      intitule: "Quel réalisateur a créé la saga Star Wars ?",
      reponse: "George Lucas",
      categorie: "cine",
      niveau: "moyen"
    }
  },
  {
    data: {
      intitule: "Dans quel pays se trouve le Mont Fuji ?",
      reponse: "Japon",
      categorie: "geographie",
      niveau: "moyen"
    }
  },
  {
    data: {
      intitule: "Quel est le symbole chimique de l'or ?",
      reponse: "Au",
      categorie: "monde",
      niveau: "moyen"
    }
  },

  // --- DIFFICILE ---
  {
    data: {
      intitule: "Quel physicien a théorisé l'effet photoélectrique, lui valant le prix Nobel en 1921 ?",
      reponse: "Albert Einstein",
      categorie: "monde",
      niveau: "difficile"
    }
  },
  {
    data: {
      intitule: "Quel algorithme de tri a une complexité moyenne de O(n log n) ?",
      reponse: "Quicksort",
      categorie: "tech",
      niveau: "difficile"
    }
  },
  {
    data: {
      intitule: "Quelle est la distance moyenne entre la Terre et le Soleil en kilomètres ?",
      reponse: "150 millions de km",
      categorie: "espace",
      niveau: "difficile"
    }
  },
  {
    data: {
      intitule: "En quelle année s'est terminée la Première Guerre mondiale ?",
      reponse: "1918",
      categorie: "histoire",
      niveau: "difficile"
    }
  },
  {
    data: {
      intitule: "Quel est le nom du théorème fondamental de l'algèbre démontré par Gauss en 1799 ?",
      reponse: "Théorème fondamental de l'algèbre",
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
      console.log(`✅ Ajouté : ${question.data.intitule}`);
    } catch (err) {
      console.error(`❌ Erreur pour : ${question.data.intitule}`, err.message);
    }
  }
  console.log("🏁 Import d'exemple terminé !");
}

seed();