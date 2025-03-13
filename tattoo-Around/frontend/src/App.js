// src/App.js
import React from 'react';
import Header from './components/Header/Header';
import { AuthProvider } from './context/AuthContext';
import Routes from './Routes'; // Exemplo de arquivo de rotas

function App() {
  return (
    <AuthProvider>
      <div>
        <Header />
        <Routes />
      </div>
    </AuthProvider>
  );
}

export default App;
