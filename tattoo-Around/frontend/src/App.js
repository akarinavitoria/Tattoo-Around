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