"use client"

import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import "./Auth.css"

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "client", // 'client' ou 'artist'
    agreeTerms: false,
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    // Validar nome
    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    // Validar senha
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória"
    } else if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres"
    }

    // Validar confirmação de senha
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem"
    }

    // Validar termos
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "Você deve concordar com os termos"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulando uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulando um cadastro bem-sucedido
      const userData = {
        id: 1,
        name: formData.name,
        email: formData.email,
        userType: formData.userType,
        profilePic: "/placeholder.svg?height=200&width=200",
      }

      login(userData)

      // Redirecionar para a página de perfil ou onboarding
      if (formData.userType === "artist") {
        navigate("/artist-onboarding")
      } else {
        navigate("/profile")
      }
    } catch (err) {
      setErrors({ form: "Erro ao criar conta. Tente novamente." })
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card signup-card">
          <div className="auth-header">
            <h1>Crie sua conta</h1>
            <p>Junte-se à comunidade Tattoo Around</p>
          </div>

          {errors.form && <div className="auth-error">{errors.form}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">Nome completo</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome completo"
                className={errors.name ? "error" : ""}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo de 6 caracteres"
                className={errors.password ? "error" : ""}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar senha</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Digite a senha novamente"
                className={errors.confirmPassword ? "error" : ""}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <div className="form-group user-type">
              <label>Você é:</label>
              <div className="user-type-options">
                <div
                  className={`user-type-option ${formData.userType === "client" ? "selected" : ""}`}
                  onClick={() => setFormData({ ...formData, userType: "client" })}
                >
                  <div className="option-icon client-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="option-text">
                    <h4>Cliente</h4>
                    <p>Quero encontrar tatuadores</p>
                  </div>
                </div>
                <div
                  className={`user-type-option ${formData.userType === "artist" ? "selected" : ""}`}
                  onClick={() => setFormData({ ...formData, userType: "artist" })}
                >
                  <div className="option-icon artist-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                    </svg>
                  </div>
                  <div className="option-text">
                    <h4>Tatuador</h4>
                    <p>Quero divulgar meu trabalho</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group terms">
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className={errors.agreeTerms ? "error" : ""}
                />
                <label htmlFor="agreeTerms">
                  Eu concordo com os <Link to="/terms">Termos de Serviço</Link> e{" "}
                  <Link to="/privacy">Política de Privacidade</Link>
                </label>
              </div>
              {errors.agreeTerms && <span className="error-message">{errors.agreeTerms}</span>}
            </div>

            <button type="submit" className={`auth-button ${isLoading ? "loading" : ""}`} disabled={isLoading}>
              {isLoading ? "Criando conta..." : "Criar conta"}
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
              Já tem uma conta? <Link to="/login">Entrar</Link>
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
  )
}

export default Signup

