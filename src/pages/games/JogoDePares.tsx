import { useState, useEffect, useRef, useCallback } from "react";
import "./styles/JogoDePares.css";
import {useNavigate} from "react-router-dom";
// Imagens
// Imagens
import img1 from "./assets/JODOPARES/1.png";
import img2 from "./assets/JODOPARES/2.png";
import img3 from "./assets/JODOPARES/3.png";
import img4 from "./assets/JODOPARES/4.png";
import img5 from "./assets/JODOPARES/5.png";
import img6 from "./assets/JODOPARES/6.png";
import img7 from "./assets/JODOPARES/7.png";
import img8 from "./assets/JODOPARES/8.png";
import img9 from "./assets/JODOPARES/9.png";
import img10 from "./assets/JODOPARES/10.png";

// Sons
import somFumaca from "./assets/JODOPARES/FORMOU.mp3";
import somVitoria from "./assets/JODOPARES/1.mp3";
import somBeep from "./assets/JODOPARES/MOVER.mp3";

// Conquistas
import CONQUISTA1 from "./assets/JODOPARES/CON1.png";
import CONQUISTA2 from "./assets/JODOPARES/CON2.png";
import CONQUISTA3 from "./assets/JODOPARES/CON3.png";
import CONQUISTA4 from "./assets/JODOPARES/CON4.png";


// ===== TIPAGENS =====
interface Quadrado {
  id: number;
  idImagem: number;
  img: string;
  combinado: boolean;
  removendo: boolean;
  destacando: boolean;
}

interface GradeConfig {
  linhas: number;
  colunas: number;
}

// ===== Configurações =====
const cores: Record<number, string> = {
  1: "rgba(255, 105, 97, 0.9)",
  2: "rgba(255, 214, 102, 0.9)",
  3: "rgba(119, 187, 255, 0.9)",
  4: "rgba(144, 238, 144, 0.9)",
  5: "rgba(255, 105, 97, 0.9)",
  6: "rgba(255, 214, 102, 0.9)",
  7: "rgba(119, 187, 255, 0.9)",
  8: "rgba(144, 238, 144, 0.9)",
  9: "rgba(255, 105, 97, 0.9)",
  10: "rgba(255, 214, 102, 0.9)",
  11: "rgba(119, 187, 255, 0.9)",
};

const niveis = [4, 6, 8, 10];

const imagensPorNivel: string[][] = [
  [img1, img2, img3, img4],
  [img1, img2, img3, img4, img5, img6],
  [img1, img2, img3, img4, img5, img6, img7, img8],
  [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10],
];

// ===== Funções auxiliares =====
function embaralharArray<T>(array: T[]): T[] {
  return array
    .map((item) => ({ ...item, rand: Math.random() }))
    .sort((a, b) => a.rand - b.rand)
    .map((item) => {
      delete (item as any).rand;
      return item;
    });
}

function calcularGrade(total: number): GradeConfig {
  let diff = Infinity;
  let melhorLin = 1;
  let melhorCol = total;

  for (let i = 1; i <= total; i++) {
    if (total % i === 0) {
      const lin = i;
      const col = total / i;
      const d = Math.abs(lin - col);
      if (d < diff) {
        diff = d;
        melhorLin = lin;
        melhorCol = col;
      }
    }
  }

  return { linhas: melhorLin, colunas: melhorCol };
}

export default function JogoDePares() {
  const [quadrados, setQuadrados] = useState<Quadrado[]>([]);
  const [triosEncontrados, setTriosEncontrados] = useState(0);
  const [nivelAtual, setNivelAtual] = useState(0);
  const [somLigado, setSomLigado] = useState(true);
  const [vitoria, setVitoria] = useState(false);
  const [modalProximoNivel, setModalProximoNivel] = useState(false);
  const [selecionado, setSelecionado] = useState<number | null>(null);
  const [mostrarConquista, setMostrarConquista] = useState<string | null>(null);
  const [grade, setGrade] = useState<GradeConfig>({ linhas: 0, colunas: 0 });
  const [botaoAtivo, setBotaoAtivo] = useState<string | null>(null);

  const animandoRef = useRef(false);

  const temTrioHorizontal = useCallback(
    (array: Quadrado[], colunas: number) => {
      for (let i = 0; i < array.length; i++) {
        if (i % colunas > colunas - 3) continue;
        if (
          array[i].idImagem === array[i + 1]?.idImagem &&
          array[i].idImagem === array[i + 2]?.idImagem
        )
          return true;
      }
      return false;
    },
    []
  );

  const iniciarNivel = useCallback(
    (nivel: number) => {
      const numTrios = niveis[nivel];
      const imagens = imagensPorNivel[nivel];

      let triplos: Quadrado[] = [];
      let index = 0;

      for (let i = 0; i < numTrios; i++) {
        for (let j = 0; j < 3; j++) {
          triplos.push({
            id: 0,
            idImagem: index + 1,
            img: imagens[index],
            combinado: false,
            removendo: false,
            destacando: false,
          });
        }
        index = (index + 1) % imagens.length;
      }

      const { linhas, colunas } = calcularGrade(triplos.length);
      setGrade({ linhas, colunas });

      let embaralhados: Quadrado[];
      do {
        embaralhados = embaralharArray(triplos).map((item, i) => ({
          ...item,
          id: i,
        }));
      } while (temTrioHorizontal(embaralhados, colunas));

      setQuadrados(embaralhados);
      setTriosEncontrados(0);
      setVitoria(false);
      setSelecionado(null);
      setModalProximoNivel(false);
    },
    [temTrioHorizontal]
  );

  useEffect(() => {
    iniciarNivel(nivelAtual);
  }, [nivelAtual]);

  function mostrarPopupConquista(tipo: string) {
    setMostrarConquista(tipo);
    setTimeout(() => setMostrarConquista(null), 2500);
  }

  const detectarTodosTrios = useCallback(
    (array: Quadrado[]) => {
      if (animandoRef.current) return;

      const { colunas } = grade;
      let trios: number[][] = [];

      // --- Horizontais ---
      for (let i = 0; i < array.length; i++) {
        if (i % colunas > colunas - 3) continue;
        if (
          !array[i].combinado &&
          array[i].idImagem !== 0 &&
          array[i].idImagem === array[i + 1]?.idImagem &&
          array[i].idImagem === array[i + 2]?.idImagem
        ) {
          trios.push([i, i + 1, i + 2]);
        }
      }

      // --- Verticais ---
      for (let i = 0; i < array.length - colunas * 2; i++) {
        if (
          !array[i].combinado &&
          array[i].idImagem !== 0 &&
          array[i].idImagem === array[i + colunas]?.idImagem &&
          array[i].idImagem === array[i + colunas * 2]?.idImagem
        ) {
          trios.push([i, i + colunas, i + colunas * 2]);
        }
      }

      if (trios.length === 0) return;
      animandoRef.current = true;

      const trioAtual = trios[0];
      const novos = [...array];

      trioAtual.forEach((i) => (novos[i].destacando = true));
      setQuadrados(novos);

      if (somLigado) new Audio(somFumaca).play();

      setTimeout(() => {
        const comRemocao = [...novos];
        trioAtual.forEach((i) => {
          comRemocao[i].destacando = false;
          comRemocao[i].removendo = true;
        });
        setQuadrados(comRemocao);

        setTimeout(() => {
          const atualizados = [...comRemocao];
          trioAtual.forEach((i) => {
            atualizados[i].combinado = true;
            atualizados[i].removendo = false;
          });

          setQuadrados(atualizados);

          setTriosEncontrados((prev) => {
            const novo = prev + 1;

            if (novo >= niveis[nivelAtual]) {
              mostrarPopupConquista(`nivel${nivelAtual + 1}`);

              if (nivelAtual + 1 < niveis.length) {
                setTimeout(() => setModalProximoNivel(true), 800);
              } else {
                setTimeout(() => {
                  setVitoria(true);
                  if (somLigado) new Audio(somVitoria).play();
                }, 800);
              }
            }

            animandoRef.current = false;
            setTimeout(() => detectarTodosTrios(atualizados), 100);

            return novo;
          });
        }, 900);
      }, 1500);
    },
    [grade, nivelAtual, somLigado]
  );

  const moverDirecao = useCallback(
    (direcao: string) => {
      if (selecionado === null) return;
      const { colunas } = grade;
      const lin = Math.floor(selecionado / colunas);
      const col = selecionado % colunas;
      let destino: number | null = null;

      if (direcao === "esquerda" && col > 0) destino = selecionado - 1;
      if (direcao === "direita" && col < colunas - 1) destino = selecionado + 1;
      if (direcao === "cima" && lin > 0) destino = selecionado - colunas;
      if (direcao === "baixo" && lin < grade.linhas - 1)
        destino = selecionado + colunas;

      if (destino !== null) {
        const novos = [...quadrados];
        [novos[selecionado], novos[destino]] = [
          novos[destino],
          novos[selecionado],
        ];
        setQuadrados(novos);
        setSelecionado(destino);

        if (somLigado) new Audio(somBeep).play();

        detectarTodosTrios(novos);
      }
    },
    [selecionado, grade, quadrados, somLigado, detectarTodosTrios]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const map: Record<string, string> = {
        ArrowLeft: "esquerda",
        ArrowRight: "direita",
        ArrowUp: "cima",
        ArrowDown: "baixo",
      };

      if (map[e.key]) {
        e.preventDefault();
        moverDirecao(map[e.key]);
        setBotaoAtivo(map[e.key]);
        setTimeout(() => setBotaoAtivo(null), 200);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [moverDirecao]);

  function avancarNivel() {
    setModalProximoNivel(false);
    setNivelAtual((prev) => prev + 1);
  }
const navigate = useNavigate();
  // ================= RENDER ==================
  return (
    <div className="jogo-montar-pares">
      <header className="header-montar-pares">
        <div className="botoes-header-jogo-pares">
          <button onClick={() => navigate("/GamesScreen")}> ⮜ </button>
          <button onClick={() => iniciarNivel(nivelAtual)}> 🗘 </button>
        </div>

        <div className="contador-mostrar-pares">
          {triosEncontrados} / {niveis[nivelAtual]} trios
        </div>

        <button
          onClick={() => setSomLigado(!somLigado)}
          className="botao-som-jogo-pares"
        >
          {somLigado ? "♫" : "🔇"}
        </button>
      </header>

      <div className="tabuleiro-container">
        <div
          className="tabuleiro-montar-pares"
          style={{ gridTemplateColumns: `repeat(${grade.colunas}, 100px)` }}
        >
          {quadrados.map((q, i) => (
            <div
              key={q.id}
              className={`quadrado 
                ${q.combinado ? "combinado" : ""} 
                ${selecionado === i ? "selecionado" : ""} 
                ${q.removendo ? "removendo" : ""} 
                ${q.destacando ? "trio-formado" : ""}`}
              style={{
                backgroundColor: !q.combinado
                  ? cores[q.idImagem]
                  : "rgba(105,105,105,0)",
              }}
              onClick={() => !q.combinado && setSelecionado(i)}
            >
              {!q.combinado && !q.removendo && <img src={q.img} alt="" />}
            </div>
          ))}
        </div>

        <div className="controles-formar-pares">
          <button
            className={botaoAtivo === "esquerda" ? "ativo" : ""}
            onClick={() => moverDirecao("esquerda")}
          >
            ⬅
          </button>
          <button
            className={botaoAtivo === "cima" ? "ativo" : ""}
            onClick={() => moverDirecao("cima")}
          >
            ⬆
          </button>
          <button
            className={botaoAtivo === "direita" ? "ativo" : ""}
            onClick={() => moverDirecao("direita")}
          >
            ➡
          </button>
          <button
            className={botaoAtivo === "baixo" ? "ativo" : ""}
            onClick={() => moverDirecao("baixo")}
          >
            ⬇
          </button>
        </div>
      </div>

      {/* POPUPS */}
      {mostrarConquista === "nivel1" && (
        <div className="jogo-pares-conquista-pop">
          <img src={CONQUISTA1} className="jogo-pares-conquista-img" />
          <p className="jogo-pares-conquista-texto">🎯 Conquista: Aprendiz dos Pares!</p>
        </div>
      )}
      {mostrarConquista === "nivel2" && (
        <div className="jogo-pares-conquista-pop">
          <img src={CONQUISTA2} className="jogo-pares-conquista-img" />
          <p className="jogo-pares-conquista-texto">⚡ Desafiador das Cores!</p>
        </div>
      )}
      {mostrarConquista === "nivel3" && (
        <div className="jogo-pares-conquista-pop">
          <img src={CONQUISTA3} className="jogo-pares-conquista-img" />
          <p className="jogo-pares-conquista-texto">🔥 Mestre das Combinações!</p>
        </div>
      )}
      {mostrarConquista === "nivel4" && (
        <div className="jogo-pares-conquista-pop">
          <img src={CONQUISTA4} className="jogo-pares-conquista-img" />
          <p className="jogo-pares-conquista-texto">🏆 Lenda dos Pares!</p>
        </div>
      )}

      {modalProximoNivel && (
        <div className="modal-vitoria-etapas">
          <div className="modal-container-etapas">
            <h2>🎉 Nível {nivelAtual + 1} concluído!</h2>
            <button onClick={avancarNivel}>Próximo Nível</button>
          </div>
        </div>
      )}

      {vitoria && !modalProximoNivel && (
        <div className="modal-vitoria-final-pares">
          <div className="modal-container-final-pares">
            <h2>🏆 Você venceu todos os níveis!</h2>
            <button
              onClick={() => {
                setNivelAtual(0);
                iniciarNivel(0);
              }}
            >
              JOGAR NOVAMENTE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
