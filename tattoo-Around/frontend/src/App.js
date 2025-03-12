// src/App.js
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Routes from './Routes'; // Exemplo de arquivo de rotas
import { HeaderWrapper, Title } from './components/Header';
import Button from './components/Button';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );

  return (
    <div>
      <HeaderWrapper>
        <Title>Tattoo Around</Title>
      </HeaderWrapper>
      <main style={{ padding: '1rem', textAlign: 'center' }}>
        <Button primary>Entrar</Button>
        <Button>Registrar</Button>
      </main>
    </div>
  );
}

export default App;
