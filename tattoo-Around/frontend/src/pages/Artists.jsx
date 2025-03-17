"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "./Artists.css"

// Dados de exemplo
const artistsData = [
  {
    id: 1,
    name: "Carlos Silva",
    specialty: "Realismo",
    location: "São Paulo, SP",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 127,
    styles: ["Realismo", "Retratos", "Preto e Cinza"],
  },
  {
    id: 2,
    name: "Ana Oliveira",
    specialty: "Old School",
    location: "Rio de Janeiro, RJ",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 93,
    styles: ["Old School", "Tradicional", "Colorido"],
  },
  {
    id: 3,
    name: "Marcos Santos",
    specialty: "Blackwork",
    location: "Belo Horizonte, MG",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 85,
    styles: ["Blackwork", "Geométrico", "Pontilhismo"],
  },
  {
    id: 4,
    name: "Juliana Costa",
    specialty: "Aquarela",
    location: "Curitiba, PR",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 112,
    styles: ["Aquarela", "Minimalista", "Colorido"],
  },
  {
    id: 5,
    name: "Roberto Almeida",
    specialty: "Geométrico",
    location: "Brasília, DF",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 78,
    styles: ["Geométrico", "Linework", "Minimalista"],
  },
  {
    id: 6,
    name: "Fernanda Lima",
    specialty: "Neo Tradicional",
    location: "Salvador, BA",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 104,
    styles: ["Neo Tradicional", "Colorido", "Ilustrativo"],
  },
  {
    id: 7,
    name: "Diego Souza",
    specialty: "Japonês",
    location: "Porto Alegre, RS",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 136,
    styles: ["Japonês", "Oriental", "Irezumi"],
  },
  {
    id: 8,
    name: "Camila Ferreira",
    specialty: "Fineline",
    location: "Recife, PE",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 91,
    styles: ["Fineline", "Minimalista", "Delicado"],
  },
]

// Lista de estilos para o filtro
const allStyles = [
  "Realismo",
  "Old School",
  "Blackwork",
  "Aquarela",
  "Geométrico",
  "Neo Tradicional",
  "Japonês",
  "Fineline",
  "Minimalista",
  "Colorido",
  "Pontilhismo",
  "Retratos",
  "Tradicional",
  "Oriental",
]

const Artists = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStyles, setSelectedStyles] = useState([])
  const [locationFilter, setLocationFilter] = useState("")
  const [sortBy, setSortBy] = useState("rating")

  // Filtrar artistas com base nos critérios
  const filteredArtists = artistsData.filter((artist) => {
    // Filtro de pesquisa por nome
    const nameMatch = artist.name.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro por estilos
    const styleMatch = selectedStyles.length === 0 || artist.styles.some((style) => selectedStyles.includes(style))

    // Filtro por localização
    const locationMatch = locationFilter === "" || artist.location.toLowerCase().includes(locationFilter.toLowerCase())

    return nameMatch && styleMatch && locationMatch
  })

  // Ordenar artistas
  const sortedArtists = [...filteredArtists].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating
    } else if (sortBy === "reviews") {
      return b.reviews - a.reviews
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    }
    return 0
  })

  // Alternar seleção de estilo
  const toggleStyle = (style) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter((s) => s !== style))
    } else {
      setSelectedStyles([...selectedStyles, style])
    }
  }

  // Limpar todos os filtros
  const clearFilters = () => {
    setSearchTerm("")
    setSelectedStyles([])
    setLocationFilter("")
    setSortBy("rating")
  }

  return (
    <div className="artists-page">
      <div className="artists-header">
        <h1>Tatuadores</h1>
        <p>Encontre os melhores tatuadores para o seu estilo</p>
      </div>

      <div className="artists-container">
        {/* Sidebar com filtros */}
        <div className="filters-sidebar">
          <div className="filter-section">
            <h3>Buscar</h3>
            <input
              type="text"
              placeholder="Nome do tatuador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-section">
            <h3>Localização</h3>
            <input
              type="text"
              placeholder="Cidade, Estado..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-section">
            <h3>Estilos</h3>
            <div className="styles-filter">
              {allStyles.map((style) => (
                <div
                  key={style}
                  className={`style-tag ${selectedStyles.includes(style) ? "selected" : ""}`}
                  onClick={() => toggleStyle(style)}
                >
                  {style}
                </div>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Ordenar por</h3>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
              <option value="rating">Avaliação</option>
              <option value="reviews">Número de Avaliações</option>
              <option value="name">Nome (A-Z)</option>
            </select>
          </div>

          <button className="clear-filters" onClick={clearFilters}>
            Limpar Filtros
          </button>
        </div>

        {/* Lista de artistas */}
        <div className="artists-list">
          <div className="results-info">
            <p>Mostrando {sortedArtists.length} tatuadores</p>
          </div>

          <div className="artists-grid">
            {sortedArtists.map((artist) => (
              <div className="artist-card" key={artist.id}>
                <div className="artist-image">
                  <img src={artist.image || "/placeholder.svg"} alt={artist.name} />
                </div>
                <div className="artist-info">
                  <h3>{artist.name}</h3>
                  <p className="specialty">{artist.specialty}</p>
                  <p className="location">{artist.location}</p>
                  <div className="rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-value">{artist.rating}</span>
                    <span className="reviews-count">({artist.reviews} avaliações)</span>
                  </div>
                  <div className="artist-styles">
                    {artist.styles.map((style) => (
                      <span key={style} className="artist-style-tag">
                        {style}
                      </span>
                    ))}
                  </div>
                  <Link to={`/artist/${artist.id}`} className="btn btn-primary">
                    Ver Perfil
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {sortedArtists.length === 0 && (
            <div className="no-results">
              <h3>Nenhum tatuador encontrado</h3>
              <p>Tente ajustar seus filtros para ver mais resultados.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Artists

