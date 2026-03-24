/* --- CONFIGURATION --- */
/**
 * Define base URL. 
 * IMPORTANT : 
 * 1. If Strapi Cloud is suspended, make sure to remove VITE_API_URL from your local .env
 * or set it to http://localhost:1337
 * 2. The code below automatically cleans up /api duplicates
 */
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

/**
 * Utility function to centralize fetch error handling
 */
const safeFetch = async (endpoint, options) => {
  // 1. Clean BASE_URL to remove any /api or / at the end
  const sanitizedBase = BASE_URL.replace(/\/api\/?$/, '').replace(/\/$/, '');
  
  // 2. Ensure endpoint starts with /api
  const cleanEndpoint = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;
  
  // 3. Final URL construction
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

/* --- AUTHENTICATION --- */
export const postRegister = async (username, email, password) => {
  return await safeFetch(`/auth/local/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
};

/* --- LOGIN --- */
export const postLogin = async (identifier, password) => {
  return await safeFetch(`/auth/local`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }),
  });
};

/* --- QUESTIONS MANAGEMENT --- */
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

/* --- SCORE MANAGEMENT (LEADERBOARD) --- */
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

/* --- GET PLAYER TOTAL POINTS --- */
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
    .toLowerCase()                     // All lowercase
    .normalize("NFD")                  // Decompose accents (e.g., é -> e + ´)
    .replace(/[\u0300-\u036f]/g, "")   // Remove accents
    .replace(/[-]/g, " ")              // Replace hyphens with spaces
    .trim();                           // Remove unnecessary spaces at start/end
};

/**
 * Calculates Levenshtein distance between two strings.
 * The lower the score, the closer the words.
 */
export const getLevenshteinDistance = (a, b) => {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
};