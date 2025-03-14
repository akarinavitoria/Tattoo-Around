import { BrowserRouter } from "react-router-dom"
import Header from "./components/Header"
import { AuthProvider } from "./context/AuthContext"
import AppRoutes from "./AppRoutes" // Ajustado para o nome correto do arquivo de rotas

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-container">
          <Header />
          <main>
            <AppRoutes />
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App


