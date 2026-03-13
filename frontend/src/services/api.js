/* --- CONFIGURATION --- */
/**
 * On utilise la variable d'environnement définie dans .env.
 * Si elle est absente ou que le Cloud est suspendu, on bascule sur http://localhost:1337.
 * Note : J'ai corrigé 'https://localhost' en 'http://localhost' car Strapi local tourne en HTTP par défaut.
 */
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

/* --- AUTHENTIFICATION --- */
export const postRegister = async (username, email, password) => {
  const res = await fetch(`${API_URL}/api/auth/local/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  return await res.json();
};

/* --- CONNEXION (LOGIN) --- */
export const postLogin = async (identifier, password) => {
  const res = await fetch(`${API_URL}/api/auth/local`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }), // Strapi utilise 'identifier' (pseudo ou email)
  });
  return await res.json();
};

/* --- GESTION DES QUESTIONS (Version Optimisée) --- */
export const fetchQuestions = async (categorie, niveau, limit = 50) => {
  try {
    const res = await fetch(
      `${API_URL}/api/questions/random?categorie=${categorie.toLowerCase()}&niveau=${niveau.toLowerCase()}&limit=${limit}`
    );
    
    const result = await res.json();
    
    if (result.data && Array.isArray(result.data)) {
      return result.data.map(item => ({
        q: item.intitule, 
        a: item.reponse 
      }));
    }
  } catch (error) {
    console.error("Erreur API :", error);
  }
  return [];
};

/* --- GESTION DES SCORES (LEADERBOARD) --- */
export const fetchLeaderboard = async () => {
  const res = await fetch(`${API_URL}/api/scores?sort=points:desc&pagination[limit]=5`);
  return await res.json();
};

export const saveScore = async (pseudo, points, total, difficulte, token) => {
  const payload = { 
    data: { pseudo, points, total, difficulte } 
  };
  const res = await fetch(`${API_URL}/api/scores`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify(payload)
  });
  return await res.json();
};

/* --- RÉCUPÉRER LE TOTAL DES POINTS D'UN JOUEUR --- */
export const fetchUserTotalPoints = async (pseudo) => {
  const res = await fetch(`${API_URL}/api/scores?filters[pseudo][$eq]=${pseudo}&pagination[limit]=100`);
  const result = await res.json();
  
  if (result.data?.length > 0) {
    const total = result.data.reduce((sum, item) => {
      // Gestion de la structure Strapi v4 (attributes) ou v5 (direct)
      const p = item.attributes ? item.attributes.points : item.points;
      return sum + p;
    }, 0);
    return total;
  }
  return 0;
};