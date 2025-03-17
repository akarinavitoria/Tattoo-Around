"use client"

import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import "./Profile.css"

const Profile = () => {
  const { user: authUser } = useContext(AuthContext)
  const [user, setUser] = useState(authUser)
  const [activeTab, setActiveTab] = useState("info")

  useEffect(() => {
    if (!authUser) {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }
  }, [authUser])

  // Dados de exemplo para favoritos
  const favoriteArtists = [
    {
      id: 1,
      name: "Carlos Silva",
      specialty: "Realismo",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
    },
    {
      id: 2,
      name: "Ana Oliveira",
      specialty: "Old School",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
    },
  ]

  // Dados de exemplo para agendamentos
  const appointments = [
    {
      id: 1,
      artistName: "Carlos Silva",
      date: "2023-12-15",
      time: "14:00",
      status: "confirmed",
      service: "Consulta inicial",
    },
    {
      id: 2,
      artistName: "Ana Oliveira",
      date: "2024-01-10",
      time: "10:30",
      status: "pending",
      service: "Sessão de tatuagem",
    },
  ]

  // Dados de exemplo para histórico
  const history = [
    {
      id: 1,
      artistName: "Marcos Santos",
      date: "2023-10-05",
      service: "Tatuagem de braço",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      artistName: "Juliana Costa",
      date: "2023-08-20",
      service: "Tatuagem de costas",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  if (!user) {
    return (
      <div className="profile-page">
        <div className="not-logged-in">
          <h2>Você precisa estar logado para acessar esta página</h2>
          <p>Faça login ou crie uma conta para continuar</p>
          <div className="auth-buttons">
            <Link to="/login" className="btn-primary">
              Entrar
            </Link>
            <Link to="/signup" className="btn-outline">
              Criar conta
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-cover">
          <img src="/placeholder.svg?height=300&amp;width=1200" alt="Cover" />
        </div>
        <div className="profile-info-container">
          <div className="profile-avatar">
            <img src={user.profilePic || "/placeholder.svg?height=150&width=150"} alt={user.name} />
          </div>
          <div className="profile-details">
            <h1>{user.name}</h1>
            <p className="profile-email">{user.email}</p>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-value">2</span>
                <span className="stat-label">Tatuagens</span>
              </div>
              <div className="stat">
                <span className="stat-value">{favoriteArtists.length}</span>
                <span className="stat-label">Favoritos</span>
              </div>
              <div className="stat">
                <span className="stat-value">{appointments.length}</span>
                <span className="stat-label">Agendamentos</span>
              </div>
            </div>
          </div>
          <div className="profile-actions">
            <button className="btn-outline">Editar Perfil</button>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-tabs">
          <button className={`tab-button ${activeTab === "info" ? "active" : ""}`} onClick={() => setActiveTab("info")}>
            Informações Pessoais
          </button>
          <button
            className={`tab-button ${activeTab === "favorites" ? "active" : ""}`}
            onClick={() => setActiveTab("favorites")}
          >
            Tatuadores Favoritos
          </button>
          <button
            className={`tab-button ${activeTab === "appointments" ? "active" : ""}`}
            onClick={() => setActiveTab("appointments")}
          >
            Agendamentos
          </button>
          <button
            className={`tab-button ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            Histórico
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "info" && (
            <div className="info-tab">
              <div className="info-card">
                <h3>Informações Pessoais</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Nome</span>
                    <span className="info-value">{user.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">{user.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Telefone</span>
                    <span className="info-value">Não informado</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Data de Nascimento</span>
                    <span className="info-value">Não informado</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Localização</span>
                    <span className="info-value">Não informado</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Membro desde</span>
                    <span className="info-value">Novembro 2023</span>
                  </div>
                </div>
                <button className="btn-primary">Atualizar Informações</button>
              </div>
            </div>
          )}

          {/* As outras abas continuam como estavam */}
        </div>
      </div>
    </div>
  )
}

export default Profile


