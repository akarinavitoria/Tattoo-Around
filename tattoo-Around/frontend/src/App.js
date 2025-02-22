import React from 'react';
import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import TattooArtistCard from './components/TattooArtistCard/TattooArtistCard';
import './App.css';

const App = () => {
  const tattooArtists = [
    {
      id: 1,
      name: "Artista 1",
      city: "São Paulo",
      clientsPerMonth: 15,
      dailyLimit: 3,
      image: "/imagens/tatuador1.jpg"
    },
    // Adicione mais artistas aqui
    const mockArtists = [
      {
        id: 2,
        name: "João Tattoo",
        city: "São Paulo",
        rating: 4.5,
        profileImage: "/images/artist1.jpg",
        portfolio: ["/images/work1.jpg", "/images/work2.jpg"]
      }
    ];
    const mockArtists = [
      {
        id: 3,
        name: "João Tattoo",
        city: "São Paulo",
        rating: 4.5,
        profileImage: "/images/artist1.jpg",
        portfolio: ["/images/work1.jpg", "/images/work2.jpg"]
      }
    ];

    const mockArtists = [
      {
        id: 4,
        name: "João Tattoo",
        city: "São Paulo",
        rating: 4.5,
        profileImage: "/images/artist1.jpg",
        portfolio: ["/images/work1.jpg", "/images/work2.jpg"]
      }
    ];

    const mockArtists = [
      {
        id: 5,
        name: "João Tattoo",
        city: "São Paulo",
        rating: 4.5,
        profileImage: "/images/artist1.jpg",
        portfolio: ["/images/work1.jpg", "/images/work2.jpg"]
      }
    ];
  ];

  return (
    <div className="App">
      <Header />
      
      <main>
        <Banner />
        
        <section className="artists-section">
          <h1>Veja aqui alguns tatuadores!</h1>
          <div className="artists-grid">
            {tattooArtists.map(artist => (
              <TattooArtistCard 
                key={artist.id} 
                artist={artist} 
              />
            ))}
          </div>
        </section>
      </main>

      <footer>
        <hr />
        <p>&copy; TattooAround - 2025</p>
      </footer>
    </div>
  );
};

export default App;