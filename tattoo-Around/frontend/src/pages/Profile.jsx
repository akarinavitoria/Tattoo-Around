"use client"

import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import "./Profile.css"

const Profile = () => {
  const { user } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState("info")

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

              <div className="info-card">
                <h3>Preferências</h3>
                <div className="preferences">
                  <div className="preference-item">
                    <span className="preference-label">Estilos Favoritos</span>
                    <div className="preference-tags">
                      <span className="tag">Realismo</span>
                      <span className="tag">Blackwork</span>
                      <span className="tag">Geométrico</span>
                      <button className="add-tag">+ Adicionar</button>
                    </div>
                  </div>
                  <div className="preference-item">
                    <span className="preference-label">Notificações</span>
                    <div className="toggle-switches">
                      <div className="toggle-item">
                        <span>Email</span>
                        <label className="switch">
                          <input type="checkbox" checked />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="toggle-item">
                        <span>SMS</span>
                        <label className="switch">
                          <input type="checkbox" />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn-primary">Salvar Preferências</button>
              </div>
            </div>
          )}

          {activeTab === "favorites" && (
            <div className="favorites-tab">
              <h3>Tatuadores Favoritos</h3>
              {favoriteArtists.length > 0 ? (
                <div className="favorites-grid">
                  {favoriteArtists.map((artist) => (
                    <div className="favorite-card" key={artist.id}>
                      <div className="favorite-image">
                        <img src={artist.image || "/placeholder.svg"} alt={artist.name} />
                      </div>
                      <div className="favorite-info">
                        <h4>{artist.name}</h4>
                        <p className="specialty">{artist.specialty}</p>
                        <div className="rating">
                          <span className="stars">★★★★★</span>
                          <span className="rating-value">{artist.rating}</span>
                        </div>
                        <div className="favorite-actions">
                          <Link to={`/artist/${artist.id}`} className="btn-outline">
                            Ver Perfil
                          </Link>
                          <button className="btn-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>Você ainda não adicionou nenhum tatuador aos favoritos.</p>
                  <Link to="/artists" className="btn-primary">
                    Explorar Tatuadores
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === "appointments" && (
            <div className="appointments-tab">
              <h3>Seus Agendamentos</h3>
              {appointments.length > 0 ? (
                <div className="appointments-list">
                  {appointments.map((appointment) => (
                    <div className={`appointment-card ${appointment.status}`} key={appointment.id}>
                      <div className="appointment-status">
                        {appointment.status === "confirmed" ? (
                          <span className="status confirmed">Confirmado</span>
                        ) : appointment.status === "pending" ? (
                          <span className="status pending">Pendente</span>
                        ) : (
                          <span className="status cancelled">Cancelado</span>
                        )}
                      </div>
                      <div className="appointment-details">
                        <h4>{appointment.service}</h4>
                        <p className="artist">com {appointment.artistName}</p>
                        <div className="appointment-date">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          <span>
                            {new Date(appointment.date).toLocaleDateString("pt-BR")} às {appointment.time}
                          </span>
                        </div>
                      </div>
                      <div className="appointment-actions">
                        <button className="btn-outline">Detalhes</button>
                        {appointment.status !== "cancelled" && <button className="btn-text">Cancelar</button>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>Você não tem nenhum agendamento.</p>
                  <Link to="/artists" className="btn-primary">
                    Agendar Consulta
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === "history" && (
            <div className="history-tab">
              <h3>Histórico de Tatuagens</h3>
              {history.length > 0 ? (
                <div className="history-grid">
                  {history.map((item) => (
                    <div className="history-card" key={item.id}>
                      <div className="history-image">
                        <img src={item.image || "/placeholder.svg"} alt={item.service} />
                      </div>
                      <div className="history-info">
                        <h4>{item.service}</h4>
                        <p className="artist">por {item.artistName}</p>
                        <p className="date">{new Date(item.date).toLocaleDateString("pt-BR")}</p>
                        <button className="btn-outline">Ver Detalhes</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>Você ainda não registrou nenhuma tatuagem.</p>
                  <button className="btn-primary">Adicionar Tatuagem</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile

