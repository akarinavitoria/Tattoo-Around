import React, { createContext, useState, useEffect } from 'react';
import api from '../services/Api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Armazena dados do usuário
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica se existe token armazenado
    const token = localStorage.getItem('token');
    if (token) {
      // Opcional: poderíamos validar o token no backend ou buscar dados do user
      // Por enquanto, apenas dizemos que está logado
      api.defaults.headers.Authorization = `Bearer ${token}`;
      // Se quiser, faça um request para /api/v1/auth/me e pegue dados do user
      setUser({ token }); 
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Chama o endpoint de login
    const { data } = await api.post('/api/v1/auth/login', { email, password });
    // Exemplo de retorno: { success: true, token, data: user }
    localStorage.setItem('token', data.token);
    api.defaults.headers.Authorization = `Bearer ${data.token}`;
    setUser(data.data); // user completo retornado pelo backend
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    // Remove o header Authorization
    delete api.defaults.headers.Authorization;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
