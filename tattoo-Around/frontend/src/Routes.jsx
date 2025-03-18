// src/Routes.jsx 
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from "./pages/Signup";
import ArtistProfile from './pages/ArtistProfile';
import Profile from './pages/Profile';
import Appointments from './pages/Appointments';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/artist-profile" element={<ArtistProfile />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/appointments" element={<Appointments />} /> 
      <Route path="/Protected-Route" element={<ProtectedRoute />} />
      {/* Outras rotas conforme necessário */}
    </Routes>
  );
}

export default AppRoutes;



