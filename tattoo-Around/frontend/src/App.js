import { BrowserRouter } from "react-router-dom"
import { HeaderWrapper, Title } from "./components/Header/Header" // Importação correta dos componentes nomeados
import { AuthProvider } from "./context/AuthContext"
import Routes from "./Routes" // Ajuste para o nome correto do seu arquivo de rotas

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-container">
          <HeaderWrapper>
            <Title>Tattoo Around</Title>
          </HeaderWrapper>
          <main>
            <Routes />
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

