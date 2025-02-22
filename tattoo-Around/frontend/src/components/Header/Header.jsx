import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './Header.module.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>TattooAround</Link>
        
        <div className={styles.navLinks}>
          <Link to="/artists">Tatuadores</Link>
          <Link to="/styles">Estilos</Link>
        </div>

        <div className={styles.authSection}>
          {user ? (
            <>
              <span>Olá, {user.name}</span>
              <button onClick={logout}>Sair</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Cadastro</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;