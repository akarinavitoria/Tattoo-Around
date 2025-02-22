import React from 'react';
import styles from './Banner.module.css';

const Banner = () => {
  return (
    <section className={styles.banner}>
      <img 
        src="/imagens/banner.jpg" 
        alt="Banner Tattoo Around" 
        className={styles.bannerImage}
      />
      <h1>Bem Vindo!!</h1>
      <h2>Aqui você encontra os melhores tatuadores perto de você</h2>
      <button className={styles.searchButton}>Procurar</button>
    </section>
  );
};

export default Banner;