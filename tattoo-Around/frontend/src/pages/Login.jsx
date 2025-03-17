"use client"

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simulando uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (email === "teste@teste.com" && password === "123456") {
        const userData = {
          id: 1,
          name: "Usuário Teste",
          email: "teste@teste.com",
          profilePic: "/placeholder.svg?height=200&width=200",
        };

        localStorage.setItem("user", JSON.stringify(userData)); // ✅ Salvar no localStorage
        login(userData);
        navigate("/profile");
      } else {
        setError("Email ou senha inválidos");
      }
    } catch (err) {
      setError("Ocorreu um erro ao fazer login. Tente novamente.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Bem-vindo de volta</h1>
            <p>Entre na sua conta para continuar</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              {/* Ajuste principal: adicione o name="email" */}
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              {/* Ajuste principal: adicione o name="password" */}
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                required
              />
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe">Lembrar de mim</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="submit"
              className={`auth-button ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="auth-divider">
            <span>ou</span>
          </div>

          <div className="social-login">
            <button className="social-button google">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
              </svg>
              Continuar com Google
            </button>
            <button className="social-button facebook">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              Continuar com Facebook
            </button>
          </div>

          <div className="auth-footer">
            <p>
              Não tem uma conta? <Link to="/signup">Cadastre-se</Link>
            </p>
          </div>
        </div>

        <div className="auth-image">
          <img src="/placeholder.svg?height=600&width=500" alt="Tattoo art" />
          <div className="image-overlay">
            <h2>Tattoo Around</h2>
            <p>Conectando tatuadores e clientes em um só lugar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
