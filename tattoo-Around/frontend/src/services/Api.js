// src/services/Api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
});

// Interceptador para inserir token em cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // ou sessionStorage, ou AuthContext
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
