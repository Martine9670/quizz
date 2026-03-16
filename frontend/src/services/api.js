/* --- CONFIGURATION --- */
/**
 * On définit l'URL de base. 
 * IMPORTANT : 
 * 1. Si Strapi Cloud est suspendu, assurez-vous de supprimer VITE_API_URL de votre .env local
 * ou de le régler sur http://localhost:1337
 * 2. Le code ci-dessous nettoie automatiquement les doublons de /api
 */
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

/**
 * Fonction utilitaire pour centraliser la gestion des erreurs de fetch
 */
const safeFetch = async (endpoint, options) => {
  // 1. On nettoie BASE_URL pour enlever tout /api ou / à la fin
  const sanitizedBase = BASE_URL.replace(/\/api\/?$/, '').replace(/\/$/, '');
  
  // 2. On s'assure que l'endpoint commence par /api
  const cleanEndpoint = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;
  
  // 3. Construction de l'URL finale
  const url = `${sanitizedBase}${cleanEndpoint}`;

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Erreur serveur: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`Erreur lors de l'appel à ${url} :`, error.message);
    throw error;
  }
};

/* --- AUTHENTIFICATION --- */
export const postRegister = async (username, email, password) => {
  return await safeFetch(`/auth/local/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
};

/* --- CONNEXION (LOGIN) --- */
export const postLogin = async (identifier, password) => {
  return await safeFetch(`/auth/local`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }),
  });
};

/* --- GESTION DES QUESTIONS --- */
export const fetchQuestions = async (categorie, niveau, limit = 50) => {
  try {
    const result = await safeFetch(
      `/questions/random?categorie=${categorie.toLowerCase()}&niveau=${niveau.toLowerCase()}&limit=${limit}`,
      { method: 'GET' }
    );
    
    const data = result.data || result;
    if (data && Array.isArray(data)) {
      return data.map(item => ({
        q: item.intitule, 
        a: item.reponse 
      }));
    }
  } catch (error) {
    console.error("Impossible de récupérer les questions :", error.message);
  }
  return [];
};

/* --- GESTION DES SCORES (LEADERBOARD) --- */
export const fetchLeaderboard = async () => {
  try {
    return await safeFetch(`/scores?sort=points:desc&pagination[limit]=5`, {
      method: 'GET'
    });
  } catch (error) {
    console.error("Erreur leaderboard :", error.message);
    return { data: [] };
  }
};

export const saveScore = async (pseudo, points, total, difficulte, token) => {
  const payload = { 
    data: { pseudo, points, total, difficulte } 
  };
  return await safeFetch(`/scores`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify(payload)
  });
};

/* --- RÉCUPÉRER LE TOTAL DES POINTS D'UN JOUEUR --- */
export const fetchUserTotalPoints = async (pseudo) => {
  try {
    const result = await safeFetch(`/scores?filters[pseudo][$eq]=${pseudo}&pagination[limit]=100`, {
      method: 'GET'
    });
    
    const data = result.data || [];
    if (data.length > 0) {
      return data.reduce((sum, item) => {
        const p = item.attributes ? item.attributes.points : item.points;
        return sum + p;
      }, 0);
    }
  } catch (error) {
    console.error("Erreur points totaux :", error.message);
  }
  return 0;
};

export const normalizeText = (text) => {
  return text
    .toLowerCase()                     // Tout en minuscules
    .normalize("NFD")                  // Décompose les accents (ex: é -> e + ´)
    .replace(/[\u0300-\u036f]/g, "")   // Supprime les accents
    .replace(/[-]/g, " ")              // Remplace les tirets par des espaces
    .trim();                           // Enlève les espaces inutiles au début/fin
};