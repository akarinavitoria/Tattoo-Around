// src/Routes.jsx 
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ArtistProfile from './pages/ArtistProfile';
import ProtectedRouteWrapper from "./ProtectedRouteWrapper"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/artist-profile" element={<ArtistProfile />} />
      {/* Outras rotas conforme necessário */}

      <Route path="*" element={<div>Página não encontrada</div>} />
    </Routes>

  );
}

export default AppRoutes;



