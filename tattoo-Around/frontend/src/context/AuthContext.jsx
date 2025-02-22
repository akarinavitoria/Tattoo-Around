import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar autenticação ao iniciar
  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('tattooUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Função de login
  const login = (userData) => {
    localStorage.setItem('tattooUser', JSON.stringify(userData));
    setUser(userData);
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem('tattooUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};