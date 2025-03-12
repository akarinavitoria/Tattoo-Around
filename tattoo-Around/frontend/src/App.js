// src/App.js
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Routes from './Routes'; // Exemplo de arquivo de rotas

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
