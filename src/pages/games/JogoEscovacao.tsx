// ---------------------------------------------
//  JOGO ESCOVAÇÃO — COMPLETO COM BRILHO AJUSTADO NA BOCA
// ---------------------------------------------
import React, { useEffect, useRef, useState } from "react";
import "./styles/JogoEscovacao.css";
import { Sparkles, Star } from "lucide-react";

import MENUPNG from './assets/ESCOVACAO/MENUPNG.png';
import meninaLimpa1 from "./assets/ESCOVACAO/11.png";
import meninaLimpa2 from "./assets/ESCOVACAO/22.png";
import meninaSuja1 from "./assets/ESCOVACAO/33.png";
import meninaSuja2 from "./assets/ESCOVACAO/44.png";

import FIM from "./assets/ESCOVACAO/FIM.png";
import escova from "./assets/ESCOVACAO/ESCOVA.png";
import enxaguante from "./assets/ESCOVACAO/MENTA.png";

import brilhoSom from "./assets/ESCOVACAO/BRILHO.mp3";
import refrescanteSom from "./assets/ESCOVACAO/BRILHO2.mp3";
import escovandoSom from "./assets/ESCOVACAO/ESCOVANDO.mp3";
import { useNavigate } from "react-router-dom";

// Tipagens necessárias
interface Mancha {
  x: number;
  y: number;
  size: number;
  vida: number;
  sizeClass: string;
}

interface Fumaca {
  id: number;
  x: number;
  y: number;
  size: number;
  vida: number;
}

interface Bolha {
  id: number;
  x: number;
  y: number;
  tamanho: number;
}

interface Gota {
  id: number;
  x: number;
  y: number;
}

export default function JogoEscovacao() {
  const [jogoIniciado, setJogoIniciado] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [olhosAbertos, setOlhosAbertos] = useState(true);
  const [dentesLimpos, setDentesLimpos] = useState(false);
  const [somAtivo, setSomAtivo] = useState(true);
  const [escovaSelecionada, setEscovaSelecionada] = useState(false);
  const [escovaPos, setEscovaPos] = useState({ x: 0, y: 0 });
  const [manchas, setManchas] = useState<Mancha[]>([]);
  const [mostrarBrilho, setMostrarBrilho] = useState(false);
  const [bolhas, setBolhas] = useState<Bolha[]>([]);
  const [fumaca, setFumaca] = useState<Fumaca[]>([]);
  const [enxaguanteSelecionado, setEnxaguanteSelecionado] = useState(false);
  const [enxaguantePos, setEnxaguantePos] = useState({ x: 0, y: 0 });
  const [mostrarRefrescante, setMostrarRefrescante] = useState(false);
  const [agua, setAgua] = useState<Gota[]>([]);
  const [jogoFinalizado, setJogoFinalizado] = useState(false);

  const areaRef = useRef<HTMLDivElement | null>(null);
  const meninaRef = useRef<HTMLImageElement | null>(null);

  const brilhoPlayedRef = useRef(false);
  const escovandoAudioRef = useRef<HTMLAudioElement | null>(null);
  const contatoCountRef = useRef(0);
  const refrescantePlayedRef = useRef(false);
  const aguaAudioRef = useRef<HTMLAudioElement | null>(null);

  const classesTamanho = ["pequena", "media", "grande"];

  const [meninaSize, setMeninaSize] = useState({ width: 0, height: 0 });

  const boca = { x: 0.45, y: 0.52 };

  useEffect(() => {
    function atualizar() {
      if (meninaRef.current) {
        const r = meninaRef.current.getBoundingClientRect();
        if (r.width > 0) {
          setMeninaSize({ width: r.width, height: r.height });
        }
      }
    }
    atualizar();
    window.addEventListener("resize", atualizar);
    return () => window.removeEventListener("resize", atualizar);
  }, []);

  const manchasFixas = [
    { x: 0.33, y: 0.58, size: 0.09 },
    { x: 0.60, y: 0.58, size: 0.09 },
    { x: 0.49, y: 0.58, size: 0.09 },
    { x: 0.42, y: 0.58, size: 0.09 },
    { x: 0.34, y: 0.58, size: 0.09 }
  ];

  const fumacaFixas = [
    { x: 0.45, y: 0.58, size: 0.12 },
    { x: 0.50, y: 0.58, size: 0.12 },
    { x: 0.55, y: 0.58, size: 0.12 }
  ];

  const iniciarJogo = () => {
    setJogoIniciado(true);
    setMostrarBrilho(false);
    setDentesLimpos(false);

    brilhoPlayedRef.current = false;
    refrescantePlayedRef.current = false;
    contatoCountRef.current = 0;
    setJogoFinalizado(false);

    setManchas(
      manchasFixas.map((m) => ({
        ...m,
        vida: 50,
        sizeClass: classesTamanho[Math.floor(Math.random() * classesTamanho.length)],
      }))
    );

    gerarFumaca();
  };

  const alternarSom = () => setSomAtivo((p) => !p);

  useEffect(() => {
    escovandoAudioRef.current = new Audio(escovandoSom);
    escovandoAudioRef.current.volume = 0.5;

    aguaAudioRef.current = new Audio(refrescanteSom);
    aguaAudioRef.current.loop = true;
    aguaAudioRef.current.volume = 0.35;
  }, []);

  useEffect(() => {
    if (!jogoIniciado) return;
    const t = setInterval(() => {
      setOlhosAbertos(false);
      setTimeout(() => setOlhosAbertos(true), 300);
    }, 3000);
    return () => clearInterval(t);
  }, [jogoIniciado]);

  const gerarFumaca = () => {
    setFumaca(
      fumacaFixas.map((f) => ({
        id: Math.random(),
        x: f.x,
        y: f.y,
        size: f.size,
        vida: 180,
      }))
    );
  };

  useEffect(() => {
    if (!jogoIniciado) return;

    if (manchas.length === 0 && !brilhoPlayedRef.current) {
      brilhoPlayedRef.current = true;
      setMostrarBrilho(true);
      setDentesLimpos(true);

      if (somAtivo) new Audio(brilhoSom).play().catch(() => {});

      setTimeout(() => setMostrarBrilho(false), 2500);
    }
  }, [manchas, jogoIniciado]);

  useEffect(() => {
    if (
      jogoIniciado &&
      manchas.length === 0 &&
      fumaca.length === 0 &&
      dentesLimpos
    ) {
      setTimeout(() => setJogoFinalizado(true), 4200);
    }
  }, [manchas, fumaca, dentesLimpos]);

  // ---------------------------------------------
  // MOVIMENTO ESCOVA
  // ---------------------------------------------
const navigate = useNavigate();
  useEffect(() => {
    const escovaLargura = 80;

    const handleMove = (e: MouseEvent) => {
      if (!escovaSelecionada || !areaRef.current) return;

      const rect = areaRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - escovaLargura / 2;
      const y = e.clientY - rect.top - escovaLargura / 2;

      setEscovaPos({ x, y });

      setManchas((prev) => {
        let colidiu = false;

        const atualizadas = prev
          .map((m) => {
            const xReal = m.x * meninaSize.width;
            const yReal = m.y * meninaSize.height;
            const sReal = m.size * meninaSize.width;

            const dist = Math.hypot(xReal - x, yReal - y);

            if (dist < sReal * 0.7) {
              colidiu = true;

              const id = Math.random();
              setBolhas((b) => [...b, { id, x, y, tamanho: 18 }]);
              setTimeout(
                () => setBolhas((b) => b.filter((bb) => bb.id !== id)),
                900
              );

              return { ...m, vida: m.vida - 1 };
            }

            return m;
          })
          .filter((m) => m.vida > 0);

        if (colidiu && somAtivo && contatoCountRef.current < 2) {
          contatoCountRef.current += 1;
          new Audio(escovandoSom).play().catch(() => {});
        }

        return atualizadas;
      });
    };

    const cancelar = () => setEscovaSelecionada(false);

    if (escovaSelecionada) {
      document.body.classList.add("cursor-none");
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("click", cancelar);
    }

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", cancelar);
      document.body.classList.remove("cursor-none");
    };
  }, [escovaSelecionada, meninaSize]);

  // ---------------------------------------------
  // ENXAGUANTE
  // ---------------------------------------------
  useEffect(() => {
    if (!enxaguanteSelecionado) return;

    const area = areaRef.current;
    if (!area) return;

    const enxaguanteLargura = 80;

    const handleMove = (e: MouseEvent) => {
      const rect = area.getBoundingClientRect();
      const x = e.clientX - rect.left - enxaguanteLargura / 2;
      const y = e.clientY - rect.top - enxaguanteLargura / 2;

      setEnxaguantePos({ x, y });

      let tocou = false;

      setFumaca((prev) => {
        const novas = prev
          .map((f) => {
            const fx = f.x * meninaSize.width;
            const fy = f.y * meninaSize.height;
            const fSize = f.size * meninaSize.width;

            const dist = Math.hypot(fx - x, fy - y);

            if (dist < fSize * 0.8) {
              tocou = true;
              return { ...f, vida: f.vida - 1 };
            }
            return f;
          })
          .filter((f) => f.vida > 0);

        if (novas.length === 0 && !refrescantePlayedRef.current) {
          refrescantePlayedRef.current = true;
          setMostrarRefrescante(true);

          if (somAtivo) {
            aguaAudioRef.current?.play().catch(() => {});
          }

          setTimeout(() => setMostrarRefrescante(false), 3000);
        }

        if (tocou) {
          const id = Math.random();
          setAgua((a) => [...a, { id, x, y }]);
          setTimeout(() => setAgua((a) => a.filter((aa) => aa.id !== id)), 600);
        }

        return novas;
      });
    };

    const cancelar = () => setEnxaguanteSelecionado(false);

    document.body.classList.add("cursor-none");
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("click", cancelar);

    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", cancelar);

      if (aguaAudioRef.current) {
        aguaAudioRef.current.pause();
        aguaAudioRef.current.currentTime = 0;
      }
    };
  }, [enxaguanteSelecionado, meninaSize, somAtivo]);

  const handleSelecionarEscova = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    setEscovaSelecionada((p) => !p);
    setEnxaguanteSelecionado(false);
  };

  const handleSelecionarEnxaguante = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    setEscovaSelecionada(false);
    setEnxaguanteSelecionado(true);

    const area = areaRef.current;
    if (area) {
      const rect = area.getBoundingClientRect();
      const enxaguanteLargura = 80;
      const x = e.clientX - rect.left - enxaguanteLargura / 2;
      const y = e.clientY - rect.top - enxaguanteLargura / 2;
      setEnxaguantePos({ x, y });
    }
  };

  const imagemMenina = dentesLimpos
    ? olhosAbertos ? meninaLimpa1 : meninaLimpa2
    : olhosAbertos ? meninaSuja1 : meninaSuja2;

  // ---------------------------------------------
  // RENDER
  // ---------------------------------------------

  return (
    <div className="escovacao-container">
      {!jogoIniciado ? (
        <div className="escovacao-menu">
          <h1 className="escovacao-titulo">Jogo da Escovação</h1>
          <img src={MENUPNG} className="escovacao-img-menu" />

          <button className="escovacao-btn jogar" onClick={iniciarJogo}>
            JOGAR
          </button>

          <button className="escovacao-btn sair" onClick={() => navigate("/GamesScreen")}>
            SAIR
          </button>
        </div>
      ) : (
        <div className="escovacao-tela" ref={areaRef}>

          {/* HEADER */}
          <header className="escovacao-header">
            <button className="escovacao-btn voltar" onClick={() => navigate("/GamesScreen")}>⮜</button>
            <button className="escovacao-btn acessorios" onClick={() => setMostrarModal(true)}>⚙</button>
            <button className="escovacao-btn som" onClick={alternarSom}>
              {somAtivo ? "♫" : "🔇"}
            </button>
          </header>

          <div className="escovacao-area">
            <div className="escovacao-menina-container">

              <img
                ref={meninaRef}
                src={imagemMenina}
                className="escovacao-menina"
                onLoad={() => {
                  const r = meninaRef.current?.getBoundingClientRect();
                  if (r) setMeninaSize({ width: r.width, height: r.height });
                }}
              />

              {/* MANCHAS */}
              {!dentesLimpos &&
                manchas.map((m, i) => {
                  const xReal = m.x * meninaSize.width;
                  const yReal = m.y * meninaSize.height;
                  const sReal = m.size * meninaSize.width;

                  return (
                    <div
                      key={i}
                      className={`escovacao-mancha ${m.sizeClass}`}
                      style={{
                        left: xReal,
                        top: yReal,
                        ...( { ["--mancha-size"]: `${sReal}px` } as React.CSSProperties )
                      }}
                    />
                  );
                })}

              {/* FUMAÇA */}
              {fumaca.map((f) => {
                const realX = f.x * meninaSize.width;
                const realY = f.y * meninaSize.height;
                const realSize = f.size * meninaSize.width;

                return (
                  <div
                    key={f.id}
                    className="escovacao-fumaca"
                    style={{
                      left: realX,
                      top: realY,
                      width: realSize,
                      height: realSize,
                      opacity: f.vida / 40,
                    }}
                  />
                );
              })}

              {/* GOTAS DE ÁGUA */}
              {agua.map((a) => (
                <div key={a.id} className="escovacao-agua" style={{ left: a.x, top: a.y }} />
              ))}

              {/* BOLHAS */}
              {bolhas.map((b) => (
                <div
                  key={b.id}
                  className="escovacao-bolha"
                  style={{ left: b.x, top: b.y, width: b.tamanho, height: b.tamanho }}
                />
              ))}

              {/* BRILHO */}
              {mostrarBrilho && (
                <div
                  className="escovacao-brilho"
                  style={{
                    left: meninaSize.width * boca.x,
                    top: meninaSize.height * boca.y,
                    transform: "translate(-50%, -50%)"
                  }}
                >
                  <Sparkles className="brilho-estrela estrela1" />
                  <Sparkles className="brilho-estrela estrela2" />
                  <Sparkles className="brilho-estrela estrela3" />
                </div>
              )}

              {/* ESCOVA */}
              {escovaSelecionada && (
                <img
                  src={escova}
                  className="escovacao-escova"
                  style={{ left: escovaPos.x, top: escovaPos.y }}
                />
              )}

              {mostrarRefrescante && (
                <div
                  className="escovacao-refrescante"
                  style={{
                    left: meninaSize.width * boca.x,
                    top: meninaSize.height * boca.y,
                    transform: "translate(-50%, -50%)"
                  }}
                >
                  <Star className="escovacao-estrela estrela1" />
                  <Star className="escovacao-estrela estrela2" />
                  <Star className="escovacao-estrela estrela3" />
                </div>
              )}

              {/* ENXAGUANTE */}
              {enxaguanteSelecionado && (
                <img
                  src={enxaguante}
                  className="escovacao-enxaguante"
                  style={{ left: enxaguantePos.x, top: enxaguantePos.y }}
                />
              )}
            </div>

            {/* ÍCONES */}
            <div className="escovacao-icon-container">
              <div className="escovacao-icon-item">
                <img
                  src={escova}
                  className={`escovacao-icon ${escovaSelecionada ? "selecionada" : ""}`}
                  onClick={handleSelecionarEscova}
                />
                <p className="escovacao-icon-texto">Escovar</p>
              </div>

              <div className="escovacao-icon-item">
                <img
                  src={enxaguante}
                  className={`escovacao-icon ${enxaguanteSelecionado ? "selecionada" : ""}`}
                  onClick={handleSelecionarEnxaguante}
                />
                <p className="escovacao-icon-texto">Enxaguar</p>
              </div>

            </div>
          </div>

          {/* MODAL AJUDA */}
          {mostrarModal && (
            <div className="escovacao-modal-AJUDA" onClick={() => setMostrarModal(false)}>
              <div className="escovacao-modal-conteudo-AJUDA" onClick={(e) => e.stopPropagation()}>
                <h3 className="escovacao-modal-titulo-AJUDA">Acessórios do Jogo</h3>

                <div className="escovacao-modal-lista-AJUDA">
                  <div className="escovacao-modal-item-AJUDA">
                    <img src={escova} className="escovacao-modal-img-AJUDA" />
                    <p className="escovacao-modal-AJUDA-p">ESCOVA: Clique e passe nos dentes para limpar.</p>
                  </div>
                  <div className="escovacao-modal-item-AJUDA">
                    <img src={enxaguante} className="escovacao-modal-img-AJUDA" />
                    <p className="escovacao-modal-AJUDA-p">ENXAGUANTE: Passe sobre a fumaça para refrescar.</p>
                  </div>
                </div>

                <button className="escovacao-modal-btn-fechar-AJUDA" onClick={() => setMostrarModal(false)}>
                  FECHAR
                </button>
              </div>
            </div>
          )}

          {/* TELA FINAL */}
          {jogoFinalizado && (
            <div className="escovacao-modal" onClick={() => setJogoFinalizado(false)}>
              <div className="escovacao-modal-conteudo" onClick={(e) => e.stopPropagation()}>
                <img src={FIM} className="escovacao-modal-conteudo-img" />
                <h2 className="escovacao-modal-titulo">PARABÉNS!</h2>
                <p className="escovacao-modal-texto">DENTES LIMPOS E HÁLITO REFRESCANTE!</p>

                <button
                  className="escovacao-modal-btn-fechar"
                  onClick={() => {
                    setJogoFinalizado(false);
                    setJogoIniciado(false);
                  }}
                >
                  VOLTAR AO MENU
                </button>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
