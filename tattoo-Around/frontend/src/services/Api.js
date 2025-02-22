import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('tattooUser'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;