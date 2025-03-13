// src/App.js
import React from 'react';
import Header from './components/Header/Header';
import { AuthProvider } from './context/AuthContext';
import Routes from './Routes'; // Exemplo de arquivo de rotas

function App() {
  return (
    <div>
      <Header />
      <Routes />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
