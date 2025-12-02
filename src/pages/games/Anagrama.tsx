import { useEffect, useState, useRef } from "react";
import "./styles/Anagrama.css";

import ACERTOU from "./assets/ANAGRAMA/POP.mp3";
import ERROU from "./assets/ANAGRAMA/ERROU.mp3";
import CARD from "./assets/ANAGRAMA/CARD4.png";
import VITORIA from "./assets/ANAGRAMA/WIN.mp3";
import TROFEU from "./assets/ANAGRAMA/AUSTRONAUTA.gif";
import PREMIO from "./assets/ANAGRAMA/POSITIVO.png";
import NEGATIVO from "./assets/ANAGRAMA/NEGATIVO.png";

// Conquistas
import CONQUISTA1 from "./assets/ANAGRAMA/CONQUISTA1.png";
import CONQUISTA2 from "./assets/ANAGRAMA/CONQUISTA2.png";
import { useNavigate } from "react-router-dom";

type Palavra = {
  dica: string;
  palavra: string;
};

const palavras: Palavra[] = [
  { dica: "Se usa para limpar os dentes", palavra: "ESCOVA" },
  { dica: "Usa-se junto da escova", palavra: "CREME" },
  { dica: "Parte do corpo que mastiga", palavra: "DENTE" },
  { dica: "O profissional que cuida dos dentes", palavra: "DENTISTA" },
  { dica: "É usado para enxaguar a boca", palavra: "ENXAGUANTE" },
  { dica: "Parte vermelha que fica na boca", palavra: "LÍNGUA" },
  { dica: "Problema causado por não escovar", palavra: "CÁRIE" },
  { dica: "Precisamos cuidar para ficar saudável", palavra: "SORRISO" },
  { dica: "Mantém a boca saudável", palavra: "HIGIENE" },
  { dica: "Devemos fazer após comer", palavra: "ESCOVAR" },
];

type Conquista = {
  img: string;
  texto: string;
} | null;

export default function AnagramaJogo() {
  const [indicePalavra, setIndicePalavra] = useState<number>(0);
  const [resposta, setResposta] = useState<string[]>([]);
  const [mensagem, setMensagem] = useState<string>("");
  const [cartasSelecionadas, setCartasSelecionadas] = useState<number[]>([]);
  const [completou, setCompletou] = useState<boolean>(false);
  const [pontuacao, setPontuacao] = useState<number>(0);
  const [somAtivo, setSomAtivo] = useState<boolean>(true);
  const [mostrarPremio, setMostrarPremio] = useState<boolean>(false);
  const [mostrarErro, setMostrarErro] = useState<boolean>(false);
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const [mostrarConquista, setMostrarConquista] = useState<Conquista>(null);

  const [letrasEmbaralhadas, setLetrasEmbaralhadas] = useState<string[]>([]);

  const palavraAtual = palavras[indicePalavra].palavra;
  const dicaAtual = palavras[indicePalavra].dica;
  const totalPalavras = palavras.length;

  // Audios tipados
  const audioAcertoRef = useRef<HTMLAudioElement>(new Audio(ACERTOU));
  const audioErroRef = useRef<HTMLAudioElement>(new Audio(ERROU));
  const audioVitoriaRef = useRef<HTMLAudioElement>(new Audio(VITORIA));

  // Embaralhar letras quando trocar a palavra
  useEffect(() => {
    const embaralhadas = [...palavraAtual].sort(() => Math.random() - 0.5);
    setLetrasEmbaralhadas(embaralhadas);
    setResposta([]);
    setCartasSelecionadas([]);
    setMensagem("");
    setCompletou(false);
  }, [palavraAtual]);

  // Verificar letra
  function vereficarLetra(letra: string, index: number) {
    if (completou) return;

    const proximaLetra = palavraAtual[resposta.length];

    if (letra === proximaLetra) {
      const novaResposta = [...resposta, letra];
      setResposta(novaResposta);
      setCartasSelecionadas((prev) => [...prev, index]);
      setPontuacao((prev) => prev + 5);

      if (somAtivo) {
        audioAcertoRef.current.currentTime = 0;
        audioAcertoRef.current.play();
      }

      // Completou a palavra
      if (novaResposta.length === palavraAtual.length) {
        setCompletou(true);
        setMostrarPremio(true);
        setTimeout(() => setMostrarPremio(false), 900);

        // Conquista 5 palavras
        if (indicePalavra + 1 === 5) {
          setMostrarConquista({
            img: CONQUISTA1,
            texto: "Conquista desbloqueada: 5 palavras!",
          });

          setTimeout(() => setMostrarConquista(null), 5000);
        }

        // Última palavra
        if (indicePalavra + 1 === palavras.length) {
          setMostrarConquista({
            img: CONQUISTA2,
            texto: "Mestre do Anagrama!",
          });

          setTimeout(() => setMostrarConquista(null), 5000);

          setTimeout(() => {
            setMostrarModal(true);
            if (somAtivo) {
              audioVitoriaRef.current.currentTime = 0;
              audioVitoriaRef.current.play();
            }
          }, 2000);
        }
      }
    } else {
      if (somAtivo) {
        audioErroRef.current.currentTime = 0;
        audioErroRef.current.play();
      }

      setMostrarErro(true);
      setTimeout(() => setMostrarErro(false), 900);
    }
  }

  // Próxima palavra
  function proximaPalavra() {
    if (indicePalavra + 1 < palavras.length) {
      setIndicePalavra(indicePalavra + 1);
    }
  }

  // Reiniciar
  function reiniciarJogo() {
    setIndicePalavra(0);
    setResposta([]);
    setMensagem("");
    setCartasSelecionadas([]);
    setPontuacao(0);
    setCompletou(false);
  }
const navigate = useNavigate();

  return (
    <div className="anagrama-jogo-container">
      <div className="anagrama-jogo-content">

        {/* HEADER */}
        <div className="anagrama-jogo-header">
          <div className="anagrama-header-left">
            <button
              className="anagrama-footer-btn-sair"
              onClick={() => navigate("/GamesScreen")}
            >
              ⮜
            </button>

            <button
              className="anagrama-footer-btn-reiniciar"
              onClick={reiniciarJogo}
            >
              🗘
            </button>
          </div>

          <div className="anagrama-header-center">
            <span className="anagrama-header-progresso">
              PALAVRA {indicePalavra + 1}/{totalPalavras}
            </span>
          </div>

          <div className="anagrama-header-right">
            <span className="anagrama-header-pontuacao">⭐ {pontuacao}</span>
            <button
              onClick={() => setSomAtivo((s) => !s)}
              className="anagrama-header-btn-som"
            >
              {somAtivo ? "♫" : "🔇"}
            </button>
          </div>
        </div>

        {/* JOGO */}
        <div className="anagrama-jogo-area">
          <div className="anagrama-jogo-dica">
            <h2>DICA: {dicaAtual}</h2>
          </div>

          <div className="anagrama-jogo-letras">
            {letrasEmbaralhadas.map((letra, index) => (
              <button
                key={index}
                className={`anagrama-letra-btn ${
                  cartasSelecionadas.includes(index) ? "usada" : ""
                }`}
                onClick={() => vereficarLetra(letra, index)}
                disabled={completou || cartasSelecionadas.includes(index)}
                style={{ backgroundImage: `url(${CARD})` }}
              >
                {letra}
              </button>
            ))}
          </div>

          {/* RESPOSTA */}
          <div className="anagrama-jogo-resposta">
            {palavraAtual.split("").map((_, i) => (
              <div key={i} className="anagrama-resposta-letra-container">
                {resposta[i] ? (
                  <div
                    className="anagrama-carta-movida"
                    style={{ backgroundImage: `url(${CARD})` }}
                  >
                    {resposta[i]}
                  </div>
                ) : (
                  "_"
                )}
              </div>
            ))}
          </div>

          <div className="anagrama-proxima-container">
            <button
              className={`anagrama-proxima-btn ${completou ? "ativo" : ""}`}
              onClick={proximaPalavra}
              disabled={!completou}
            >
              🢥
            </button>
          </div>
        </div>
      </div>

      {/* MODAL FINAL */}
      {mostrarModal && (
        <div className="anagrama-modal-vitoria">
          <div className="anagrama-modal-content">
            <img src={TROFEU} alt="Troféu" className="anagrama-modal-image" />
            <h2>{mensagem}</h2>
            <p>Pontuação final: {pontuacao}</p>

            <button
              className="anagrama-modal-btn-voltar"
              onClick={reiniciarJogo}
            >
              VOLTAR AO JOGO
            </button>
          </div>
        </div>
      )}

      {/* EFEITOS */}
      {mostrarPremio && (
        <div className="anagrama-premio-container">
          <img src={PREMIO} className="anagrama-premio-gif" />
        </div>
      )}

      {mostrarErro && (
        <div className="anagrama-erro-container">
          <img src={NEGATIVO} className="anagrama-erro-img" />
        </div>
      )}

      {/* POP-UP DE CONQUISTA */}
      {mostrarConquista && (
        <div className="anagrama-conquista-pop">
          <img
            src={mostrarConquista.img}
            className="anagrama-conquista-img"
            alt="Conquista"
          />
          <p className="anagrama-conquista-texto">
            {mostrarConquista.texto}
          </p>
        </div>
      )}
    </div>
  );
}
