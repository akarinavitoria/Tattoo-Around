import React, { useEffect, useState } from 'react';
import api from '../services/Api';

function ArtistProfile() {
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchArtistProfile = async () => {
      try {
        const { data } = await api.get('/api/v1/artists/profile');
        setArtist(data.data); // Supondo que a resposta é { success: true, data: {...} }
      } catch (err) {
        console.error(err);
      }
    };

    fetchArtistProfile();
  }, []);

  if (!artist) return <p>Carregando perfil...</p>;

  return (
    <div>
      <h2>Perfil do Artista</h2>
      <p><strong>Nome:</strong> {artist.name}</p>
      <p><strong>Especialidades:</strong> {artist.specialties?.join(', ')}</p>
      {/* Renderize outros campos */}
    </div>
  );
}

export default ArtistProfile;
