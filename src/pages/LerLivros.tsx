import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '@react-pdf-viewer/core/lib/styles/index.css'; 
import mascote from "../assets/macote.png";
import logo from "../assets/logo.png";
import voltarIcon from "../assets/Voltar.png";
import pequenoPrincipe from "../assets/LivroLua.png";
import marcelo from "../assets/LivroMarcelo.png";
import meninoCachorro from "../assets/LivroMeninoCachorro.png";
import porquinhos from "../assets/LivroTresPorquinhos.png";
import princesaSapo from "../assets/LivroPricesaeSapo.png";
import AlfabetoMovel from "../assets/livroAlfabeto.png";
import euvovo from "../assets/euvovo.jpg";
import revolta from "../assets/revolta.jpg";
import saci from "../assets/LivroSaci.png";
import salto from "../assets/salto.jpg";
import bisaBia from "../assets/LivroBisaBia.png";
import sobreser from "../assets/sobreser.png";


const useMascoteVoice = () => {
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const childLikeVoice =
        voices.find(v =>
          v.name.toLowerCase().includes("child") ||
          v.name.toLowerCase().includes("kid") ||
          v.name.toLowerCase().includes("boy") ||
          v.name.toLowerCase().includes("girl")
        ) || voices.find(v => v.lang.startsWith("pt") || v.lang.startsWith("pt-BR")) || voices[0];
      setVoice(childLikeVoice || null);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = (text: string) => {
    if (!text) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = voice;
    utter.pitch = 1.3; // som mais infantil
    utter.rate = 1.05;
    utter.volume = 1;
    utter.lang = voice?.lang || "pt-BR";
    window.speechSynthesis.speak(utter);
  };

  return speak;
};


// 🎨 Estilos originais mantidos
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "100vw",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    width: "100%",
    backgroundColor: "transparent",
    color: "#000",
    display: "flex",
    alignItems: "center",
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "bold",
  },
  voltar: {
    background: "none",
    border: "none",
    cursor: "pointer",
    marginRight: 10,
  },
  voltarImg: {
    height: 28,
    width: 28,
  },
  logo: {
    height: 100,
    marginRight: 12,
  },
  topContent: {
    width: "95%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: -40,
    marginBottom: 0,
  },
  mascote: {
    height: 250,
    marginLeft: 200,
    marginTop: -20,
  },
  botaoAsas: {
    backgroundColor: "#cce5ff",
    border: "none",
    padding: "30px 50px",
    borderRadius: 8,
    fontWeight: "bold",
    fontSize: 18,
    cursor: "pointer",
    margin: "0 20px",
    marginLeft: -120,
    marginTop: -90,
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: "8px 16px",
    width: 320,
    boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
    marginTop: -230,
  },
  input: {
    border: "none",
    outline: "none",
    fontSize: 14,
    flex: 1,
    padding: "8px",
    background: "transparent",
  },
  searchIcon: {
    fontSize: 20,
    color: "#0b4f9c",
    marginLeft: 8,
    cursor: "pointer",
  },
  gridContainer: {
    width: "95%",
    backgroundColor: "#0b4f9c",
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    display: "flex",
    justifyContent: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: 45,
  },
  card: {
    width: 175,
    height: 245,
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    cursor: "pointer",
    transition: "transform 0.3s ease-in-out",
  },
  capa: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },
  sinopse: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "#fff",
    padding: "10px",
    opacity: 0,
    transition: "opacity 0.4s ease, transform 0.4s ease",
    fontSize: "14px",
    textAlign: "center",
    transform: "translateY(100%)",
    borderRadius: "0 0 8px 8px",
  },
  cardHover: {
    transform: "scale(1.05)",
  },
  cardHoverSinopse: {
    opacity: 1,
    transform: "translateY(0)",
  },
  soundIcon: {
    marginLeft: 6,
    cursor: "pointer",
    fontSize: 18,
    color: "#0b4f9c",
  },
};


// 🔤 Tipo dos livros
interface Livro {
  titulo: string;
  capa: string;
  pdf: string;
  sinopse: string;
}

const livros: Livro[] = [
  { titulo: "A Revolta das Letras", capa: revolta, pdf: "https://affectus-books.vercel.app/livros/revolta.pdf", sinopse: "A história de uma vovó e sua neta..." },
  { titulo: "Alfabeto Móvel", capa: AlfabetoMovel, pdf: "https://affectus-books.vercel.app/livros/afm.pdf", sinopse: "Uma aventura pelo alfabeto com um toque de magia." },
  { titulo: "Bisa Bia Bisa Bel", capa: bisaBia, pdf: "https://affectus-books.vercel.app/livros/bisa.pdf", sinopse: "A história de uma avó e sua neta que se tornam grandes amigas." },
  { titulo: "Eu Vovô e os Números", capa: euvovo, pdf: "https://affectus-books.vercel.app/livros/euvovo.pdf", sinopse: "Uma jornada divertida pelo mundo dos números." },
  { titulo: "Marcelo, Marmelo, Martelo", capa: marcelo, pdf: "https://affectus-books.vercel.app/livros/marcelo_marmelo.pdf", sinopse: "As aventuras de Marcelo e seus amigos em um mundo de fantasia." },
  { titulo: "O Menino Que Quase Virou Cachorro", capa: meninoCachorro, pdf: "https://affectus-books.vercel.app/livros/menino.pdf", sinopse: "Uma história sobre amizade e aceitação." },
  { titulo: "Os Três Porquinhos", capa: porquinhos, pdf: "https://affectus-books.vercel.app/livros/porquinhos.pdf", sinopse: "Uma adaptação do clássico conto infantil." },
  { titulo: "O Salto do Gato Bilingue", capa: salto, pdf: "https://affectus-books.vercel.app/livros/salto.pdf", sinopse: "A história de um gato que aprende duas línguas." },
  { titulo: "O Pequeno Príncipe", capa: pequenoPrincipe, pdf: "https://affectus-books.vercel.app/livros/principe.pdf", sinopse: "As aventuras de um príncipe em diferentes planetas." },
  { titulo: "Princesa Sapo", capa: princesaSapo, pdf: "https://affectus-books.vercel.app/livros/princesa-sapo.pdf", sinopse: "A história de uma princesa que se transforma em sapo." },
  { titulo: "Saci Pererê", capa: saci, pdf: "https://affectus-books.vercel.app/livros/saci.pdf", sinopse: "As travessuras do famoso personagem do folclore brasileiro." },
  { titulo: "Sobre Ser Diferente", capa: sobreser, pdf: "https://affectus-books.vercel.app/livros/sobreser.pdf", sinopse: "Uma reflexão sobre a importância da diversidade e aceitação." },
];

// 📘 Componente principal
const LerLivros = () => {
  const [pesquisa, setPesquisa] = useState<string>("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const speak = useMascoteVoice();

  const livrosFiltrados = livros.filter((livro) =>
    livro.titulo.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const abrirPDF = (pdfUrl: string) => {
    window.open(pdfUrl, "_blank");
  };

  const voltar = () => {
    navigate("/TelaEscolha"); // 🔙 redireciona para a tela de escolha
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button style={styles.voltar} onClick={voltar}>
          <img src={voltarIcon} alt="Voltar" style={styles.voltarImg} />
        </button>
        <img src={logo} alt="Logo" style={styles.logo} />
      </header>

      <div style={styles.topContent}>
        <img src={mascote} alt="Mascote" style={styles.mascote} />
        <button style={styles.botaoAsas}>
          VAMOS DAR ASAS À IMAGINAÇÃO!
          <span
            style={styles.soundIcon}
            onClick={() => speak("Vamos dar asas à imaginação!")}
          >
            🔊
          </span>
        </button>

        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Pesquisar livros..."
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            style={styles.input}
          />
          <span style={styles.searchIcon}>🔍</span>
          <span
            style={styles.soundIcon}
            onClick={() => speak("Pesquisar livros")}
          >
            🔊
          </span>
        </div>
      </div>

      <div style={styles.gridContainer}>
        <div style={styles.grid}>
          {livrosFiltrados.map((livro, idx) => (
            <div
              key={idx}
              style={{
                ...styles.card,
                ...(hoveredIndex === idx ? styles.cardHover : {}),
              }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => abrirPDF(livro.pdf)}
            >
              <img src={livro.capa} alt={livro.titulo} style={styles.capa} />
              <div
                style={{
                  ...styles.sinopse,
                  ...(hoveredIndex === idx ? styles.cardHoverSinopse : {}),
                }}
              >
                {livro.sinopse}
                <span
                  style={styles.soundIcon}
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(livro.sinopse);
                  }}
                >
                  🔊
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LerLivros;
