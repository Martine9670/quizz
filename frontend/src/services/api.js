/* --- CONFIGURATION --- */
// src/services/api.js
const API_URL = "http://localhost:1337/api";

/* --- AUTHENTIFICATION --- */
export const postRegister = async (username, email, password) => {
  const res = await fetch(`${API_URL}/auth/local/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  return await res.json();
};

/* --- GESTION DES QUESTIONS --- */
export const fetchQuestions = async (niveau) => {
  const res = await fetch(`${API_URL}/questions?filters[niveau][$eq]=${niveau.toLowerCase()}&pagination[limit]=1000`);
  const result = await res.json();
  
  if (result.data?.length > 0) {
    // On fait le "nettoyage" des données Strapi ici
    return result.data.map(item => {
      const rawData = item.attributes ? item.attributes : item;
      return { q: rawData.intitule, a: rawData.reponse };
    }).filter(q => q.q).sort(() => Math.random() - 0.5);
  }
  return [];
};

/* --- GESTION DES SCORES (LEADERBOARD) --- */
// Récupérer le TOP 5 des scores
export const fetchLeaderboard = async () => {
  const res = await fetch(`${API_URL}/scores?sort=points:desc&pagination[limit]=5`);
  return await res.json();
};

// Enregistrer un nouveau score
export const saveScore = async (pseudo, points, total, difficulte) => {
  const payload = { 
    data: { pseudo, points, total, difficulte } 
  };
  const res = await fetch(`${API_URL}/scores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return await res.json();
};