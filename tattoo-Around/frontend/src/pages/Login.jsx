"use client"

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulação de delay

      const validUser = {
        email: "teste@teste.com",
        password: "Mustang75!",
      };

      if (formData.email === validUser.email && formData.password === validUser.password) {
        const userData = {
          id: 1,
          name: "Usuário Teste",
          email: validUser.email,
          profilePic: "/placeholder.svg?height=200&width=200",
        };

        if (formData.rememberMe) {
          localStorage.setItem("user", JSON.stringify(userData));
        }

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
    <div className="auth-page" data-testid="page-loaded">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Bem-vindo de volta</h1>
            <p>Entre na sua conta para continuar</p>
          </div>

          {error && <div className="auth-error" data-testid="login-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
                data-testid="login-email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Sua senha"
                required
                data-testid="login-password"
              />
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  data-testid="login-remember"
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
              data-testid="login-submit"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="auth-divider">
            <span>ou</span>
          </div>

          <div className="social-login">
            <button className="social-button google" data-testid="login-google" aria-label="Entrar com Google">
              Continuar com Google
            </button>
            <button className="social-button facebook" data-testid="login-facebook" aria-label="Entrar com Facebook">
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


