import { useState } from "react";
import { Volume2, X } from "lucide-react";
import logo from "../assets/logo.png";
import ilustracao from "../assets/kids.png";
import "../index.css";
import { useNavigate } from "react-router-dom";

export default function BemVindo() {
  const [showModal, setShowModal] = useState(false);
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  const handleNavigate = () => {
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!nomeCompleto.trim() || !dataNascimento) {
      alert("Por favor, preencha os campos!");
      return;
    }
    // Aqui você pode navegar ou salvar os dados
    console.log("Nome:", nomeCompleto, "Data:", dataNascimento);
    navigate("/HomeKids");
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      window.speechSynthesis.cancel(); // Cancela qualquer fala anterior
      window.speechSynthesis.speak(utterance);
    }
  };
const navigate = useNavigate();

  return (
    <div className="bem-vindo-container">
      <img src={logo} alt="Logo" className="logo" />
      <img src={ilustracao} alt="Ilustração" className="ilustracao" />

      <div className="right-content">
        <h1 className="welcome-header">BEM-VINDO</h1>
        <p className="title">AFFECTUS TE RECEBE COM UM SORRISO.</p>
        <p className="highlighted-text">
          PRONTO PARA EMBARCAR EM UMA JORNADA DE DIVERSÃO E APRENDIZADO?
        </p>

        <p className="descricao">
          Esse é nosso espaço mágico, nosso Safe Space! Aqui você vai se divertir com jogos,
          desafios e muitas coisas legais para aprender de um jeito bem fácil e divertido.
          E lembre-se:
          <a style={{ display: "block", marginTop: "8px" }}>
            O legal é ser diferente!
          </a>
        </p>

        <div className="buttons">
          <button className="btn-entrar" onClick={handleNavigate}>
            VAMOS LÁ!
          </button>
          <a href="/Login" className="professional-area">
            ÁREA PROFISSIONAL
          </a>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button 
              className="modal-close-btn" 
              onClick={() => setShowModal(false)}
              aria-label="Fechar"
            >
              <X size={24} />
            </button>

            <div className="modal-content">
              <div className="modal-title-wrapper">
                <h2 className="modal-title">
                  Quase lá amiguinho! Antes, preencha os dados abaixo:
                </h2>
                <button 
                  className="audio-btn"
                  onClick={() => speakText("Quase lá amiguinho! Antes, preencha os dados abaixo:")}
                  aria-label="Ouvir título"
                >
                  <Volume2 size={20} />
                </button>
              </div>

              <div className="modal-subtitle-wrapper">
                <p className="modal-subtitle">
                  Caso não consiga, peça ajuda para o seu responsável!
                </p>
                <button 
                  className="audio-btn"
                  onClick={() => speakText("Caso não consiga, peça ajuda para o seu responsável!")}
                  aria-label="Ouvir observação"
                >
                  <Volume2 size={18} />
                </button>
              </div>

              <div className="modal-form">
                <div className="form-group">
                  <div className="label-wrapper">
                    <label htmlFor="nome-completo" className="form-label">
                      Nome Completo
                    </label>
                    <button 
                      className="audio-btn"
                      onClick={() => speakText("Nome Completo")}
                      aria-label="Ouvir campo nome"
                    >
                      <Volume2 size={18} />
                    </button>
                  </div>
                  <input
                    id="nome-completo"
                    type="text"
                    className="form-input"
                    value={nomeCompleto}
                    onChange={(e) => setNomeCompleto(e.target.value)}
                    placeholder="Digite seu nome"
                  />
                </div>

                <div className="form-group">
                  <div className="label-wrapper">
                    <label htmlFor="data-nascimento" className="form-label">
                      Data de Nascimento
                    </label>
                    <button 
                      className="audio-btn"
                      onClick={() => speakText("Data de Nascimento")}
                      aria-label="Ouvir campo data"
                    >
                      <Volume2 size={18} />
                    </button>
                  </div>
                  <input
                    id="data-nascimento"
                    type="date"
                    className="form-input"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                  />
                </div>

                <button className="modal-btn-entrar" onClick={handleSubmit}>
                  ENTRAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}