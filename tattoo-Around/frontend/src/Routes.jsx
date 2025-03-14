// src/Routes.jsx 
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ArtistProfile from './pages/ArtistProfile';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route 
          path="/artist-profile" 
          element={
            <ProtectedRoute>
              <ArtistProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
