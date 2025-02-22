import React from 'react';
import styles from './TattooArtistCard.module.css';

const TattooArtistCard = ({ artist }) => {
  return (
    <div className={styles.card}>
      <img 
        src={artist.image} 
        alt="Foto do Tatuador" 
        className={styles.profileImage}
      />
      <div className={styles.info}>
        <h3>{artist.name}</h3>
        <p>Cidade: {artist.city}</p>
        <p>Clientes/mês: {artist.clientsPerMonth}</p>
        <p>Limite diário: {artist.dailyLimit}</p>
      </div>
      <div className={styles.buttons}>
        <button className={styles.portfolioButton}>Ver Portfólio</button>
        <button className={styles.contactButton}>Entrar em Contato</button>
      </div>
    </div>
  );
};

export default TattooArtistCard;