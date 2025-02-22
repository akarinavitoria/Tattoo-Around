import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <div className={styles.authSection}>
          <a href="#login">Login</a> 
          <span>|</span>
          <a href="#cadastro">Cadastre-se</a>
        </div>
        
        <ul className={styles.navList}>
          <li>Estilos</li>
          <li>Cidade</li>
          <li>Promoção</li>
          <li>Valores</li>
        </ul>
        
        <div className={styles.search}>
          <input type="text" placeholder="Pesquise Aqui" />
        </div>
      </nav>
      <hr />
    </header>
  );
};

export default Header;