import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import RatingSystem from '../components/RatingSystem';

const ArtistProfile = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await api.get(`/artists/${id}`);
        setArtist(response.data);
      } catch (error) {
        console.error('Error fetching artist:', error);
      }
      setLoading(false);
    };
    fetchArtist();
  }, [id]);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="artist-profile">
      <div className="profile-header">
        <h1>{artist.name}</h1>
        <RatingSystem initialRating={artist.rating} />
        <img src={artist.profileImage} alt={artist.name} />
      </div>
      
      <div className="portfolio-section">
        <h3>Portfólio</h3>
        <div className="portfolio-grid">
          {artist.portfolio.map((img, index) => (
            <img key={index} src={img} alt={`Trabalho ${index + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;