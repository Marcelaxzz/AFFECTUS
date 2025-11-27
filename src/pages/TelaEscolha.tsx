import { useState } from "react";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { Volume2 } from 'lucide-react';

// Import das imagens da pasta assets
import logo from "../assets/logo.png";
import macote from "../assets/macote.png"; 
import voltarImg from "../assets/Voltar.png";

// Componente de Áudio para Acessibilidade com voz infantilizada do mascote
const AudioButton: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = () => {
    if ('speechSynthesis' in window) {
      // Cancela qualquer fala em andamento
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      
      // Voz mais rápida e despojada (menos travada)
      utterance.rate = 1.15;
      
      // Tom bem mais agudo para soar infantilizado e animado
      utterance.pitch = 1.4;
      
      // Volume máximo para energia
      utterance.volume = 1.0;
      
      // Tenta selecionar uma voz feminina/infantil se disponível
      const voices = window.speechSynthesis.getVoices();
      const brVoices = voices.filter(voice => voice.lang.startsWith('pt-BR') || voice.lang.startsWith('pt'));
      
      // Prefere vozes femininas (geralmente soam mais infantis)
      const femaleVoice = brVoices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('feminino') ||
        voice.name.toLowerCase().includes('luciana') ||
        voice.name.toLowerCase().includes('francisca')
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      } else if (brVoices.length > 0) {
        utterance.voice = brVoices[0];
      }
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Desculpe, seu navegador não suporta síntese de voz.');
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const audioButtonStyle: CSSProperties = {
    background: isSpeaking 
      ? 'linear-gradient(135deg, #FF5722, #F44336)' 
      : 'linear-gradient(135deg, #4CAF50, #45a049)',
    border: '2px solid rgba(255, 255, 255, 0.6)',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: 'white',
    boxShadow: isSpeaking 
      ? '0 4px 12px rgba(255, 87, 34, 0.6)' 
      : '0 4px 12px rgba(76, 175, 80, 0.4)',
    marginLeft: '10px',
    padding: 0,
    verticalAlign: 'middle',
    animation: isSpeaking ? 'audioButtonPulse 1s infinite' : 'none',
  };

  return (
    <button
      onClick={isSpeaking ? stopSpeaking : speakText}
      style={audioButtonStyle}
      className={className}
      aria-label={isSpeaking ? 'Parar leitura' : 'Ouvir o Dentinho Molar'}
      title={isSpeaking ? 'Parar leitura' : 'Ouvir o Dentinho Molar'}
      onMouseEnter={(e) => {
        if (!isSpeaking) {
          e.currentTarget.style.transform = 'scale(1.15)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(76, 175, 80, 0.6)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSpeaking) {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.4)';
        }
      }}
    >
      <Volume2 size={18} />
    </button>
  );
};

export default function TelaEscolha() {
  const navigate = useNavigate();

  // === Estilos ===
  const containerStyle: CSSProperties = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    fontFamily: "Arial, sans-serif",
    overflow: "hidden",
  };

  const headerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
  };

  const logoStyle: CSSProperties = {
    height: "110px",
  };

  const escolhaContainer: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: "200px",
    padding: "10px 40px",
    marginRight: "315px",
  };

  const escolhaStyle: CSSProperties = {
    backgroundColor: "#dceeff",
    padding: "10px 20px",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "35px",
    alignSelf: "flex-start",
    marginTop: "-40px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const personagemStyle: CSSProperties = {
    width: "460px",
    display: "block",
    marginLeft: "230px",
    alignSelf: "flex-end",
    marginBottom: "-10px",
  };

  const bottomContainer: CSSProperties = {
    backgroundColor: "#8FD694",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "40px",
    minHeight: "350px",
  };

  const botaoBase: CSSProperties = {
    width: "400px",
    padding: "30px",
    borderRadius: "60px",
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    cursor: "pointer",
    border: "3px solid",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.25)",
    transition: "transform 0.2s ease-in-out",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
  };

  // === Componente genérico de botão ===
  interface BotaoProps {
    texto: string;
    estilo: CSSProperties;
    onClick?: () => void;
  }

  const Botao = ({ texto, estilo, onClick }: BotaoProps) => {
    const [hover, setHover] = useState(false);
    return (
      <button
        style={{ ...estilo, transform: hover ? "scale(1.05)" : "scale(1)" }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onClick}
      >
        <span>{texto}</span>
        <AudioButton text={texto} />
      </button>
    );
  };

  // === JSX ===
  return (
    <div style={containerStyle}>
      {/* Estilos para animação do botão de áudio */}
      <style>{`
        @keyframes audioButtonPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 4px 12px rgba(255, 87, 34, 0.6);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(255, 87, 34, 0.8);
          }
        }
      `}</style>

      {/* Header */}
     {/* Header */} 
<div style={headerStyle}>
  <img
    src={voltarImg}
    alt="Voltar"
    style={{ height: "30px", marginRight: "15px", cursor: "pointer" }}
    onClick={() => navigate("/HomeKids")}
  />
  <img src={logo} alt="Logo" style={logoStyle} />
</div>


      {/* Parte de cima */}
      <div style={escolhaContainer}>
        <img src={macote} alt="Mascote" style={personagemStyle} />
        <div style={escolhaStyle}>
          ESCOLHA UMA OPÇÃO:
          <AudioButton text="ESCOLHA UMA OPÇÃO!" />
        </div>
      </div>

      {/* Parte verde */}
      <div style={bottomContainer}>
        <Botao
          texto="QUERO LER!"
          estilo={{ ...botaoBase, backgroundColor: "#C5F3C1", borderColor: "#4CAF50", color: "#000" }}
          onClick={() => navigate("/LerLivros")}
        />
        <Botao
          texto="QUERO COLORIR"
          estilo={{ ...botaoBase, backgroundColor: "#F7B8C6", borderColor: "#FF4D6D", color: "#000" }}
          onClick={() => navigate("/ColorirLivros")}
        />
      </div>
    </div>
  );
}
