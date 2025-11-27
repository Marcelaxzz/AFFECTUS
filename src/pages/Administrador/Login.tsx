import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import loginImage from "../../assets/login.png";
import logo from "../../assets/logo.png";

export default function Login() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nomeUsuario, senha }),
        credentials: "include", // ESSENCIAL PARA COOKIES
      });

      // Se voltar 401 → login incorreto
      if (response.status === 401) {
        alert("Usuário ou senha incorretos!");
        return;
      }

      // Se deu erro geral (404, 500, etc)
      if (!response.ok) {
        alert("Erro ao conectar ao servidor.");
        return;
      }

      const data = await response.json();

      if (data.success) {
        alert("Login realizado com sucesso!");
        navigate("/DashboardAdmin");
      } else {
        alert("Usuário ou senha incorretos!");
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      alert("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div className="login-container">
      {/* Lado esquerdo com a imagem */}
      <div className="login-image-section">
        <img
          src={loginImage}
          alt="Profissional"
          className="login-background-image"
        />
        <div className="image-overlay"></div>
      </div>

      {/* Lado direito com o formulário */}
      <div className="login-form-section">
        <div className="login-form-wrapper">
          <img src={logo} alt="Logo Affectus" className="logo-login" />

          <h1 className="welcome-title">SEJA BEM VINDO, PROFISSIONAL!</h1>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                NOME DE USUÁRIO:
              </label>
              <input
                type="text"
                id="username"
                value={nomeUsuario}
                onChange={(e) => setNomeUsuario(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                SENHA:
              </label>
              <input
                type="password"
                id="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <button type="submit" className="login-button">
              ENTRAR
            </button>
          </form>

          <div className="forgot-password-container">
            <a href="/Esqueceu" className="forgot-password-link">
              ESQUECEU SUA SENHA?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
