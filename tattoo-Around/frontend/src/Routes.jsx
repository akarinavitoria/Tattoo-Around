// src/Routes.jsx 
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ArtistProfile from './pages/ArtistProfile';
import Appointments from './pages/Appointments';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/artist-profile" element={<ArtistProfile />} />
      <Route path="/appointments" element={<Appointments />} /> 
      <Route path="/Protected-Route" element={<ProtectedRoute />} />
      {/* Outras rotas conforme necessário */}
    </Routes>
  );
}

export default AppRoutes;



