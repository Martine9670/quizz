/* --- CONFIGURATION --- */
// On utilise la variable d'environnement définie dans .env
const API_URL = import.meta.env.VITE_API_URL;

/* --- AUTHENTIFICATION --- */
export const postRegister = async (username, email, password) => {
  const res = await fetch(`${API_URL}/auth/local/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  return await res.json();
};

/* --- CONNEXION (LOGIN) --- */
export const postLogin = async (identifier, password) => {
  const res = await fetch(`${API_URL}/auth/local`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }), // Strapi utilise 'identifier' (pseudo ou email)
  });
  return await res.json();
};

/* --- GESTION DES QUESTIONS (Version Optimisée) --- */
// On ajoute 'limit' en paramètre avec une valeur par défaut (ex: 50)
export const fetchQuestions = async (categorie, niveau, limit = 50) => {
  try {
    // Ajout du paramètre &limit dans l'URL
    const res = await fetch(
      `${API_URL}/questions/random?categorie=${categorie.toLowerCase()}&niveau=${niveau.toLowerCase()}&limit=${limit}`
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
// Récupérer le TOP 5 des scores
export const fetchLeaderboard = async () => {
  const res = await fetch(`${API_URL}/scores?sort=points:desc&pagination[limit]=5`);
  return await res.json();
};

// Enregistrer un nouveau score
export const saveScore = async (pseudo, points, total, difficulte, token) => {
  const payload = { 
    data: { pseudo, points, total, difficulte } 
  };
  const res = await fetch(`${API_URL}/scores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(payload)
  });
  return await res.json();
};

/* --- RÉCUPÉRER LE TOTAL DES POINTS D'UN JOUEUR --- */
export const fetchUserTotalPoints = async (pseudo) => {
  const res = await fetch(`${API_URL}/scores?filters[pseudo][$eq]=${pseudo}&pagination[limit]=100`);
  const result = await res.json();
  
  if (result.data?.length > 0) {
    // On additionne tous les points de chaque partie trouvée
    const total = result.data.reduce((sum, item) => {
      const p = item.attributes ? item.attributes.points : item.points;
      return sum + p;
    }, 0);
    return total;
  }
  return 0;
};