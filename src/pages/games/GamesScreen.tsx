import { Link, useNavigate } from "react-router-dom";
import "./styles/GamesScreen.css";
import dente1 from "./assets/dente2.png";
import elefante from "./assets/3d.png";
import control from "./assets/control.png";
import memoriaImg from "./assets/memoria.jpg";
import jogoArrasta from "./assets/certoerrado-Photoroom (1).png";
import matematica from "./assets/matematico-Photoroom (1).png";
import anagramaImg from "./assets/anagrama.jpg";
import PIRATAIMG from "./assets/tesouro.jpg";
import REFLEXOIMG from "./assets/reflexo.jpg";
import JOGOVELHA from "./assets/jogovelha.jpg";
import EQUACAOimg from "./assets/equação.jpeg";
import PARESIMG from "./assets/pares.jpg";
import ESCOVANDO from "./assets/escovação.jpg";
import { ArrowLeft } from "lucide-react";
import React from "react";

export default function GamesScreen() {
  const navigate = useNavigate();

  const games = [
    { id: 1, img: memoriaImg, name: "Jogo Da Memória" },
    { id: 2, img: jogoArrasta, name: "Certo e Errado" },
    { id: 3, img: anagramaImg, name: "Anagrama De Palavras" },
    { id: 4, img: matematica, name: "Jogo Matemático" },
    { id: 5, img: ESCOVANDO, name: "Jogo De Escovação" },
    { id: 6, img: PIRATAIMG, name: "Caça ao Tesouro" },
    { id: 7, img: PARESIMG, name: "Jogo Dos Pares" },
    { id: 8, img: JOGOVELHA, name: "Jogo Da Velha" },
    { id: 9, img: EQUACAOimg, name: "Equação Misteriosa" },
    { id: 10, img: REFLEXOIMG, name: "Jogo Do Reflexo" },
  ];

  const goToHomeKids = () => navigate("/HomeKids");

  // TIPAGEM CORRETA QUE REMOVE O ERRO
  const backButtonStyle: React.CSSProperties = {
    background: "white",
    border: "none",
    height: "40px",
    width: "40px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    position: "fixed",
    top: "16px",
    left: "16px",
    zIndex: 99999,
  };

  return (
    <div className="areaJogos-container">
      {/* BOTÃO VOLTAR */}
      <button
        onClick={goToHomeKids}
        style={backButtonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#f3f4f6";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "white";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <ArrowLeft size={24} color="#1f2937" />
      </button>

      {/* HEADER */}
      <header className="areaJogos-header">
        <div className="imgLeft-container">
          <img src={dente1} alt="Left" className="areaJogosLeft-img" />
        </div>

        <div className="areaJogosHeader-center">
          <h1 className="areaJogosTitle">COLORS PLAY</h1>
          <h1 className="areaJogosTitle2">APRENDA INGLÊS JOGANDO!</h1>

          <button
            className="areaJogosPlay-btn"
            onClick={() =>
              (window.location.href = "https://colors-play-affectus.vercel.app")
            }
          >
            JOGAR!
          </button>
        </div>

        <div className="imgRight-container">
          <img src={elefante} alt="Right" className="areaJogosRight-img" />
        </div>
      </header>

      {/* GRID DE JOGOS */}
      <div className="jogosPlace-container">
        <div className="jogosPlace-header">
          <img src={control} alt="Controle" className="jogosPlace-icone" />
          <h1 className="jogosPlaceH1">LET'S PLAY! - VAMOS JOGAR!</h1>
        </div>

        <div className="jogosPlace-grid">
          {games.map((game) => (
            <Link key={game.id} to={`/game/${game.id}`} className="game-card">
              <img src={game.img} alt={game.name} />
              <div className="jogo-info">
                <span>{game.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
