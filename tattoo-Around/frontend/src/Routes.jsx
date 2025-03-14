// src/Routes.jsx 
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ArtistProfile from './pages/ArtistProfile';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/artist-profile" element={<ArtistProfile />} />
      {/* Outras rotas conforme necessário */}
    </Routes>
  );
}

export default AppRoutes;
  );
}

export default AppRoutes;
