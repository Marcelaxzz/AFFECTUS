import { useEffect, useRef, useState } from "react";
import "./styles/JogoMemoria.css";

import IMG1 from './assets/JogoMemoria/1.png';
import IMG2 from './assets/JogoMemoria/2.png';
import IMG3 from './assets/JogoMemoria/3.png';
import IMG4 from './assets/JogoMemoria/4.png';
import IMG5 from './assets/JogoMemoria/5.png';
import IMG6 from './assets/JogoMemoria/6.png';
import medal from './assets/JogoMemoria/TROFEU.png';
import duvida from './assets/JogoMemoria/carta.png';
import flipSound from "./assets/JogoMemoria/flipCard.wav";
import matchSound from "./assets/JogoMemoria/match.mp3";
import errorSound from "./assets/JogoMemoria/error.mp3";
import CERTO from './assets/JogoMemoria/POSITIVO.png';
import NEGATIVO from './assets/JogoMemoria/NEGATIVO.png';
import soundVitoria from './assets/JogoMemoria/SUCESSO.mp3';
import CEREBRO from './assets/JogoMemoria/ARTISTA.png';
import TROFEU from './assets/JogoMemoria/SARGENTO.png';
import { useNavigate } from "react-router-dom";

// TYPES
interface Carta {
    uid: string;
    idPar: number;
    img: string;
    combinado: boolean;
    virado: boolean;
}

interface Props {
    aoSair?: () => void;
    efeitosAtivos?: boolean;
}

export default function JogoMemoria({
    efeitosAtivos: efeitosIniciais = true
}: Props) {

    const imagens: string[] = [IMG1, IMG2, IMG3, IMG4, IMG5, IMG6];

    // MONTA E EMBARALHA O BARALHO
    function montarBaralho(imgs: string[]): Carta[] {
        const baralho: Carta[] = imgs.flatMap((img, idx) => [
            { uid: `${idx}-a`, idPar: idx, img, combinado: false, virado: false },
            { uid: `${idx}-b`, idPar: idx, img, combinado: false, virado: false }
        ]);

        for (let i = baralho.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [baralho[i], baralho[j]] = [baralho[j], baralho[i]];
        }
        return baralho;
    }

    // STATES
    const [baralho, setBaralho] = useState<Carta[]>(() => montarBaralho(imagens));
    const [primeiroIndice, setPrimeiroIndice] = useState<number | null>(null);
    const [segundoIndice, setSegundoIndice] = useState<number | null>(null);
    const [desabilitado, setDesabilitado] = useState<boolean>(false);
    const [paresCombinados, setParesCombinados] = useState<number>(0);
    const [movimentos, setMovimentos] = useState<number>(0);

    const [mostrarVitoria, setMostrarVitoria] = useState<boolean>(false);
    const [efeitosAtivos, setEfeitosAtivos] = useState<boolean>(efeitosIniciais);
    const [mostarAcerto, setMostarAcerto] = useState<boolean>(false);
    const [mostrarErro, setMostarErro] = useState<boolean>(false);
    const [mostrarConquista, setMostrarConquista] = useState<"" | "cerebro" | "trofeu">("");

    // REFS
    const flipRef = useRef<HTMLAudioElement | null>(null);
    const matchRef = useRef<HTMLAudioElement | null>(null);
    const errorRef = useRef<HTMLAudioElement | null>(null);
    const victoryRef = useRef<HTMLAudioElement | null>(null);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const animTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // DETECTA VITÓRIA
    useEffect(() => {
        if (paresCombinados === baralho.length / 2) {
            const delay = setTimeout(() => {
                if (efeitosAtivos && victoryRef.current) {
                    victoryRef.current.currentTime = 0;
                    victoryRef.current.play().catch(() => {});
                }
                setMostrarVitoria(true);
            }, 1160);
            return () => clearTimeout(delay);
        }
    }, [paresCombinados, baralho.length, efeitosAtivos]);

    // CONQUISTAS
    useEffect(() => {
        if (paresCombinados === 3) {
            setMostrarConquista("cerebro");
            setTimeout(() => setMostrarConquista(""), 3000);
        } else if (paresCombinados === 6) {
            setMostrarConquista("trofeu");
            setTimeout(() => setMostrarConquista(""), 3000);
        }
    }, [paresCombinados]);

    // LIMPA TIMEOUTS AO SAIR
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
        };
    }, []);

    // RESET
    const resetEscolhas = (novoBaralho?: Carta[]) => {
        setPrimeiroIndice(null);
        setSegundoIndice(null);
        setDesabilitado(false);
        if (novoBaralho) setBaralho(novoBaralho);
    };
    

    // CLIQUE NA CARTA
    const handleCartaClick = (i: number) => {
        if (desabilitado) return;

        const carta = baralho[i];
        if (carta.virado || carta.combinado) return;

        const novoBaralho = baralho.map((c, idx) =>
            idx === i ? { ...c, virado: true } : c
        );
        setBaralho(novoBaralho);

        if (efeitosAtivos && flipRef.current) {
            flipRef.current.currentTime = 0;
            flipRef.current.play().catch(() => {});
        }

        if (primeiroIndice === null) {
            setPrimeiroIndice(i);
            return;
        }

        if (segundoIndice !== null) return;

        setSegundoIndice(i);
        setDesabilitado(true);
        setMovimentos(m => m + 1);

        timeoutRef.current = setTimeout(() => {
            const primeira = novoBaralho[primeiroIndice];
            const segunda = novoBaralho[i];

            // ACERTO
            if (primeira.idPar === segunda.idPar) {
                const atualizado = novoBaralho.map(c =>
                    c.idPar === primeira.idPar ? { ...c, combinado: true } : c
                );
                setBaralho(atualizado);
                setParesCombinados(m => m + 1);

                if (efeitosAtivos && matchRef.current) {
                    matchRef.current.currentTime = 0;
                    matchRef.current.play().catch(() => {});
                }

                animTimeoutRef.current = setTimeout(() => {
                    setMostarAcerto(true);
                    setTimeout(() => setMostarAcerto(false), 900);
                }, 50);

            } else {
                // ERRO
                const atualizado = novoBaralho.map((c, idx) =>
                    idx === primeiroIndice || idx === i ? { ...c, virado: false } : c
                );
                setBaralho(atualizado);

                if (efeitosAtivos && errorRef.current) {
                    errorRef.current.currentTime = 0;
                    errorRef.current.play().catch(() => {});
                }

                animTimeoutRef.current = setTimeout(() => {
                    setMostarErro(true);
                    setTimeout(() => setMostarErro(false), 900);
                }, 50);
            }

            resetEscolhas();
        }, 700);
    };

    // REINICIAR
    const reiniciarJogo = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        setBaralho(montarBaralho(imagens));
        setParesCombinados(0);
        setMovimentos(0);
        resetEscolhas();
        setMostrarVitoria(false);
        setMostarAcerto(false);
        setMostarErro(false);
    };
const navigate = useNavigate();
    return (
        <div className="jogoMemoria-container">

            {/* AUDIOS */}
            <audio ref={flipRef} src={flipSound} preload="auto" />
            <audio ref={matchRef} src={matchSound} preload="auto" />
            <audio ref={errorRef} src={errorSound} preload="auto" />
            <audio ref={victoryRef} src={soundVitoria} preload="auto" />

            <div className="jogoMemoria-content">

                {/* TOPO */}
                <div className="jogoMemoria-topbar">
                    <div className="jogoMemoria-container-topo">
                        <button className="jogoMemoria-btn-sair" onClick={() => navigate("/GamesScreen")}>
                            ⮜
                        </button>

                        <button className="jogoMemoria-btn" onClick={reiniciarJogo}>
                            🗘
                        </button>
                    </div>

                    <div className="stats">Movimentos: {movimentos}</div>
                    <div className="stats">Pares: {paresCombinados}/{baralho.length / 2}</div>

                    <button
                        className="jogoMemoria-musicaON-OFF"
                        onClick={() => setEfeitosAtivos(prev => !prev)}
                    >
                        {efeitosAtivos ? "🔊" : "🔇"}
                    </button>
                </div>

                {/* GRID */}
                <div className="jogoMemoria-grid">
                    {baralho.map((carta, idx) => (
                        <button
                            key={carta.uid}
                            className={`carta-memoria ${carta.virado || carta.combinado ? "flipped" : ""}`}
                            onClick={() => handleCartaClick(idx)}
                            disabled={carta.combinado}
                        >
                            <div className="carta-inner">
                                <div className="carta-front">
                                    <img src={duvida} alt="Carta frente" />
                                </div>
                                <div className="carta-back">
                                    <img src={carta.img} alt="figura" />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

            </div>

            {/* VITÓRIA */}
            {mostrarVitoria && (
                <div className="jogoMemoria-vitoria">
                    <div className="vitoria-carta">
                        <img src={medal} alt="Vitoria" className="modalVitoria-img" />
                        <h2>Você venceu!</h2>
                        <p>Movimentos: {movimentos}</p>

                        <div className="vitoria-acoes">
                            <button onClick={() => navigate("/game/1")}>
                                JOGAR NOVAMENTE
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ACERTO */}
            {mostarAcerto && (
                <div className="modal-acerto">
                    <img src={CERTO} alt="Acerto" className="modal-acerto-img" />
                </div>
            )}

            {/* ERRO */}
            {mostrarErro && (
                <div className="modal-erro">
                    <img src={NEGATIVO} alt="Erro" className="modal-erro-img" />
                </div>
            )}

            {/* CONQUISTAS */}
            {mostrarConquista === "cerebro" && (
                <div className="memoria-conquista-pop">
                    <img src={CEREBRO} alt="Cérebro Rápido" className="memoria-conquista-img" />
                    <p className="memoria-conquista-texto">ARTISTA NATO: VOCÊ TEM TALENTO!</p>
                </div>
            )}

            {mostrarConquista === "trofeu" && (
                <div className="memoria-conquista-pop">
                    <img src={TROFEU} alt="Mestre" className="memoria-conquista-img" />
                    <p className="memoria-conquista-texto">BRAVO SOLDADO: VOCÊ TEM BRAVURA!</p>
                </div>
            )}

        </div>
    );
}
