/**
 * Service centralisé pour toutes les requêtes HTTP.
 * Ajuste les URL / entêtes selon ton backend.
 */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://10.197.89.8:8000/api';

interface LoginResponse {
  access_token: string;
  user: Record<string, any>;
}

async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  // Si l’API renvoie 4xx ou 5xx, on lève l’erreur JSON
  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
}

export default {
  login,
  // ➜ Ajoute ici d’autres appels (register, logout, refresh, etc.)
};
