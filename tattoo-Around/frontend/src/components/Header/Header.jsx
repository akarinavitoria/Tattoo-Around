"use client"

import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "./Header.css"

const Header = () => {
  const { user, logout } = useContext(AuthContext)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Tattoo Around
        </Link>

        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
          <div className="nav-links">
            <Link to="/artists" className="nav-link">
              Tatuadores
            </Link>
            <Link to="/styles" className="nav-link">
              Estilos
            </Link>
            <Link to="/gallery" className="nav-link">
              Galeria
            </Link>
            <Link to="/about" className="nav-link">
              Sobre
            </Link>
          </div>

          <div className="auth-section">
            {user ? (
              <>
                <div className="user-profile">
                  <img
                    src={user.profilePic || "https://v0.blob.com/placeholder.svg?height=40&width=40"}
                    alt={user.name}
                    className="profile-pic"
                  />
                  <div className="user-dropdown">
                    <Link to="/profile" className="dropdown-item">
                      Meu Perfil
                    </Link>
                    <Link to="/appointments" className="dropdown-item">
                      Agendamentos
                    </Link>
                    <Link to="/favorites" className="dropdown-item">
                      Favoritos
                    </Link>
                    <button onClick={logout} className="dropdown-item logout">
                      Sair
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="auth-link">
                  Entrar
                </Link>
                <Link to="/signup" className="auth-button">
                  Cadastre-se
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header


