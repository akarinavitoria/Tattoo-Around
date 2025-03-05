import React, { useEffect, useState } from 'react';
import api from '../services/Api';

function TattooArtistCard() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await api.get('/api/v1/artists');
        setArtists(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArtists();
  }, []);

  return (
    <div>
      {artists.map((artist) => (
        <div key={artist._id}>
          <h3>{artist.name}</h3>
          <p>Especialidades: {artist.specialties.join(', ')}</p>
          {/* ... */}
        </div>
      ))}
    </div>
  );
}

export default TattooArtistCard;
