/**
 * Couche HTTP centralisée — toutes les requêtes vers Laravel passent ici.
 * Le token Bearer est lu depuis localStorage à chaque appel.
 */

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api';

// ─── Utilitaire interne ───────────────────────────────────────────────────────

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('account_token');

  const headers = {
    'Content-Type': 'application/json',
    'Accept':       'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  const data     = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? `Erreur ${response.status}`);
  }

  return data;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const authApi = {
  login:         (creds)   => request('/login',                   { method: 'POST', body: JSON.stringify(creds) }),
  signUp:        (payload) => request('/signup',                  { method: 'POST', body: JSON.stringify(payload) }),
  logout:        ()        => request('/logout',                  { method: 'POST' }),
  me:            ()        => request('/me'),
  forgotPassword:(email)   => request('/forgot-password',         { method: 'POST', body: JSON.stringify({ email }) }),
  getResetToken: (token)   => request(`/reset-password/${token}`),
  resetPassword: (payload) => request('/reset-password',          { method: 'POST', body: JSON.stringify(payload) }),
};

// ─── Profil ───────────────────────────────────────────────────────────────────

export const profileApi = {
  get:    ()        => request('/profile'),
  update: (payload) => request('/profile', { method: 'PUT', body: JSON.stringify(payload) }),
};

// ─── Calculs ──────────────────────────────────────────────────────────────────

export const calculationsApi = {
  store:   (payload) => request('/calculations',       { method: 'POST',   body: JSON.stringify(payload) }),
  index:   ()        => request('/calculations'),
  latest:  ()        => request('/calculations/latest'),
  trends:  ()        => request('/calculations/trends'),
  destroy: (id)      => request(`/calculations/${id}`, { method: 'DELETE' }),
};

// ─── Challenges ───────────────────────────────────────────────────────────────

export const challengesApi = {
  index:          ()             => request('/challenges'),
  mine:           ()             => request('/challenges/mine'),
  join:           (id)           => request(`/challenges/${id}/join`,     { method: 'POST' }),
  updateProgress: (id, progress) => request(`/challenges/${id}/progress`, { method: 'PATCH', body: JSON.stringify({ progress }) }),
  complete:       (id)           => request(`/challenges/${id}/complete`,  { method: 'POST' }),
};

// ─── Badges ───────────────────────────────────────────────────────────────────

export const badgesApi = {
  index: () => request('/badges'),
};

// ─── Stats publiques ──────────────────────────────────────────────────────────

export const statsApi = {
  index: () => request('/stats'),
};

// ─── Contact ──────────────────────────────────────────────────────────────────

export const contactApi = {
  send: (payload) => request('/contact', { method: 'POST', body: JSON.stringify(payload) }),
};
