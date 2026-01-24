import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication endpoints
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => localStorage.removeItem('token')
};

// Users endpoints
export const usersAPI = {
  getUser: (id) => api.get(`/users/${id}`),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  getAllUsers: () => api.get('/users'),
  changePassword: (id, data) => api.put(`/users/${id}/password`, data)
};

// Tournaments endpoints
export const tournamentsAPI = {
  getAll: () => api.get('/tournaments'),
  getOne: (id) => api.get(`/tournaments/${id}`),
  create: (data) => api.post('/tournaments', data),
  update: (id, data) => api.put(`/tournaments/${id}`, data),
  delete: (id) => api.delete(`/tournaments/${id}`),
  addTeam: (id, teamId) => api.post(`/tournaments/${id}/teams`, { teamId }),
  removeTeam: (id, teamId) => api.delete(`/tournaments/${id}/teams/${teamId}`)
};

// Teams endpoints
export const teamsAPI = {
  getAll: () => api.get('/teams'),
  getOne: (id) => api.get(`/teams/${id}`),
  create: (data) => api.post('/teams', data),
  addMember: (id, identifier) => api.post(`/teams/${id}/members`, { identifier }),
  removeMember: (id, memberId) => api.delete(`/teams/${id}/members/${memberId}`),
  updateStats: (id, data) => api.put(`/teams/${id}/stats`, data),
  delete: (id) => api.delete(`/teams/${id}`)
};

// Matches endpoints
export const matchesAPI = {
  getAll: () => api.get('/matches'),
  getTournamentMatches: (tournamentId) => api.get(`/matches/tournament/${tournamentId}`),
  create: (data) => api.post('/matches', data),
  update: (id, data) => api.put(`/matches/${id}`, data)
};

// Games endpoints
export const gamesAPI = {
  getAll: () => api.get('/games'),
  search: (query) => api.get(`/games/search/${query}`),
  addGame: (data) => api.post('/games', data),
  getPopular: () => api.get('/games/esports/popular')
};
