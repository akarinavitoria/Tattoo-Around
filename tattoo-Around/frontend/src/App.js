// src/App.js
import React from 'react';
import { HeaderWrapper, Title } from './components/Header/Header';
import { AuthProvider } from './context/AuthContext';
import Routes from './Routes'; // Exemplo de arquivo de rotas

function App() {
  return (
    <AuthProvider>
      <div>
        <HeaderWrapper>
          <Title>Tattoo Around</Title>
        </HeaderWrapper>
        <Routes />
      </div>
    </AuthProvider>
  );
}

export default App;
