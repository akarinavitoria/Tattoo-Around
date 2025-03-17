// src/pages/Home.jsx
import { Link } from "react-router-dom"
import "./Home.css"

const artistsData = [
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
  {
    id: 3,
    name: "Marcos Santos",
    specialty: "Blackwork",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Juliana Costa",
    specialty: "Aquarela",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Roberto Almeida",
    specialty: "Geométrico",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
  },
]

const stylesData = [
  {
    id: 1,
    name: "Realismo",
    description: "Tatuagens com alto nível de detalhes e sombreamento",
    image: "/placeholder.svg?height=250&width=250",
  },
  {
    id: 2,
    name: "Old School",
    description: "Estilo tradicional americano com linhas fortes e cores vibrantes",
    image: "/placeholder.svg?height=250&width=250",
  },
  {
    id: 3,
    name: "Blackwork",
    description: "Trabalhos em preto com técnicas de pontilhismo e linhas",
    image: "/placeholder.svg?height=250&width=250",
  },
  {
    id: 4,
    name: "Aquarela",
    description: "Tatuagens coloridas que imitam a técnica de pintura em aquarela",
    image: "/placeholder.svg?height=250&width=250",
  },
]

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Encontre os Melhores Tatuadores</h1>
          <p>Conectamos você aos artistas mais talentosos da sua região</p>
          <div className="hero-buttons">
            <Link to="/artists" className="btn btn-primary">
              Encontrar Tatuador
            </Link>
            <Link to="/styles" className="btn btn-secondary">
              Explorar Estilos
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/placeholder.svg?height=400&width=600" alt="Tattoo Art" />
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="section">
        <div className="section-header">
          <h2>Tatuadores em Destaque</h2>
          <Link to="/artists" className="view-all">
            Ver Todos
          </Link>
        </div>
        <div className="artists-carousel">
          {artistsData.map((artist) => (
            <div className="artist-card" key={artist.id}>
              <div className="artist-image">
                <img src={artist.image || "/placeholder.svg"} alt={artist.name} />
              </div>
              <div className="artist-info">
                <h3>{artist.name}</h3>
                <p className="specialty">{artist.specialty}</p>
                <div className="rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-value">{artist.rating}</span>
                </div>
                <Link to={`/artist/${artist.id}`} className="btn btn-outline">
                  Ver Perfil
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tattoo Styles Section */}
      <section className="section styles-section">
        <div className="section-header">
          <h2>Estilos de Tatuagem</h2>
          <Link to="/styles" className="view-all">
            Ver Todos
          </Link>
        </div>
        <div className="styles-grid">
          {stylesData.map((style) => (
            <div className="style-card" key={style.id}>
              <div className="style-image">
                <img src={style.image || "/placeholder.svg"} alt={style.name} />
              </div>
              <div className="style-info">
                <h3>{style.name}</h3>
                <p>{style.description}</p>
                <Link to={`/styles/${style.id}`} className="btn btn-text">
                  Saiba Mais
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section how-it-works">
        <h2>Como Funciona</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Explore Artistas</h3>
            <p>Navegue por perfis de tatuadores talentosos na sua região</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Escolha seu Estilo</h3>
            <p>Encontre o estilo de tatuagem perfeito para você</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Agende uma Consulta</h3>
            <p>Entre em contato diretamente com o artista e marque sua sessão</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Pronto para sua Próxima Tatuagem?</h2>
          <p>Junte-se a milhares de pessoas que encontraram seus tatuadores ideais através do Tattoo Around</p>
          <Link to="/signup" className="btn btn-large">
            Criar Conta Grátis
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home

