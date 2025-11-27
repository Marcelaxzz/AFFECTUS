import React, { useState } from 'react';
import './styles/Certificados.css';
import { useNavigate } from 'react-router-dom';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface CertificadoData {
  id: number;
  nomeEstudante: string;
  titulo: string;
  conquista: string;
  jogoLivro: string;
  categoria: string;
}

const certificadosData: CertificadoData[] = [
  {
    id: 1,
    nomeEstudante: "GABRIEL GONÇALVES",
    titulo: "MISSÃO MATEMÁTICA",
    conquista: "concluiu a missão e aprendeu com o jogo",
    jogoLivro: "MATEMÁTICO",
    categoria: "jogo"
  },
  {
    id: 2,
    nomeEstudante: "MARCELA LUIZA GONÇALVES",
    titulo: "ANAGRAMA",
    conquista: "concluiu a missão e aprendeu com o jogo",
    jogoLivro: "ANAGRAMA",
    categoria: "jogo"
  },
  {
    id: 3,
    nomeEstudante: "VANDERLEI JUNIO",
    titulo: "LIVRO LUNA",
    conquista: "concluiu a missão e aprendeu com o livro",
    jogoLivro: "LUNA",
    categoria: "livro"
  },
  {
    id: 4,
    nomeEstudante: "MURILO NUNES BRAGA",
    titulo: "COLORINDO: CARRO",
    conquista: "concluiu a missão e aprendeu colorindo",
    jogoLivro: "CARRO",
    categoria: "colorir"
  },
  {
    id: 5,
    nomeEstudante: "GUSTAVO SILVA SOUZA",
    titulo: "SOBRE SER",
    conquista: "concluiu a missão e aprendeu com o livro",
    jogoLivro: "SOBRE SER",
    categoria: "livro"
  },
  {
    id: 6,
    nomeEstudante: "VALDIR NETO",
    titulo: "COLORS PLAY",
    conquista: "concluiu a missão e aprendeu inglês com",
    jogoLivro: "COLORS PLAY",
    categoria: "jogo"
  }
];




const CertificadosGaleria: React.FC = () => {
  const [filtro, setFiltro] = useState('');
  const [certificadoSelecionado, setCertificadoSelecionado] = useState<CertificadoData | null>(null);

  const certificadosFiltrados = certificadosData.filter(cert =>
    cert.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
    cert.categoria.toLowerCase().includes(filtro.toLowerCase())
  );

const handleDownload = async (certificado: CertificadoData) => {
  try {
    const element = document.querySelector(".modal-content .certificado-preview") as HTMLElement;

    if (!element) {
      alert("Erro: Não foi possível encontrar o certificado.");
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });

    const imageData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "px", [canvas.width, canvas.height]);

    pdf.addImage(imageData, "PNG", 0, 0, canvas.width, canvas.height);

    pdf.save(`Certificado-${certificado.nomeEstudante}.pdf`);

  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    alert("Erro ao gerar certificado. Tente novamente.");
  }
};

  const navigate = useNavigate();

  const handleNavigateToHistorico = () => {
    navigate('/Historico');
  };

  return (
    <div className="certificados-galeria">
      {/* Header */}
      <header className="galeria-header">
        <div className="header-content">
          {/* Left Section: Back Button + Logo */}
          <div className="header-left">
            <button className="voltar-btn" onClick={handleNavigateToHistorico}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="logo-section">
              <img src="/logo.png" alt="Logo Affectus" className="logo-icon" />
            </div>
          </div>

          {/* Center Section: Mascot + Speech Bubble */}
          <div className="header-center">
            <div className="mascot-bubble-container">
             <img src="/dentinho_1.png" alt="Mascote Dentinho" className="colorir-mascot" />
              <div className="speech-bubblee">
                <h1>ESSES SÃO SEUS CERTIFICADOS! CLIQUE NELES PARA ABRIR E BAIXAR.</h1>
              </div>
            </div>
          </div>

          {/* Right Section: Search */}
          <div className="header-right">
            <div className="search-container">
              <span className="filter-label">FILTRO</span>
              <input
                type="text"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                placeholder="PESQUISAR"
                className="search-input1"
              />
              <button className="search-btn">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
     
      {/* Grid de Certificados */}
      <main className="certificados-grid">
        {certificadosFiltrados.map((certificado) => (
          <div 
            key={certificado.id} 
            className="certificado-card"
            onClick={() => setCertificadoSelecionado(certificado)}
          >
            <div className="certificado-preview">
              {/* Formas decorativas do fundo */}
              <div className="background-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
                <div className="shape shape-5"></div>
                <div className="shape shape-6"></div>
              </div>

              {/* Elementos decorativos esquerda */}
              <div className="decorative-left">
                
               
                <div className="pencil"></div>
             
              </div>

              {/* Elementos decorativos direita */}
              <div className="decorative-right">
                <div className="graduation-hat">
                  <div className="hat-base"></div>
                  <div className="hat-top"></div>
                  <div className="tassel"></div>
                </div>
              </div>

              {/* Conteúdo principal */}
              <div className="certificado-content">
                
                <h3 className="certificado-subtitle">CERTIFICADO</h3>
                
                <div className="nome-section">
                  <p className="nome-estudante">{certificado.nomeEstudante}</p>
                </div>

                <div className="certificado-text">
                  <p className="achievement-text">
                    {certificado.conquista.toUpperCase()} <strong>"{certificado.jogoLivro}"</strong>. 
                  </p>
                </div>

                <div className="certificado-footer">
                  <div className="signature-section">
                    <div className="signature-line"></div>
                    <p className="signature-name">Paulo César</p>
                    <p className="signature-title">Cirurgião Dentista</p>
                  </div>

                 
                </div>
              </div>
            </div>
            
            <div className="certificado-label">
              <span>CERTIFICADO "{certificado.titulo}"</span>
            </div>
          </div>
        ))}
      </main>

      {/* Modal para visualizar certificado em tamanho completo */}
      {certificadoSelecionado && (
        <div className="certificado-modal" onClick={() => setCertificadoSelecionado(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setCertificadoSelecionado(null)}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="certificado-preview">
              {/* Formas decorativas do fundo */}
              <div className="background-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
                <div className="shape shape-5"></div>
                <div className="shape shape-6"></div>
              </div>

              {/* Elementos decorativos esquerda */}
              <div className="decorative-left">
                <div className="pencil"></div>
             
              </div>

              {/* Elementos decorativos direita */}
              <div className="decorative-right">
                <div className="graduation-hat">
                  <div className="hat-base"></div>
                  <div className="hat-top"></div>
                  <div className="tassel"></div>
                </div>
              </div>

              {/* Conteúdo principal */}
              <div className="certificado-content">
                
                <h3 className="certificado-subtitle">CERTIFICADO</h3>
                
                <div className="nome-section">
                  <p className="nome-estudante">{certificadoSelecionado.nomeEstudante}</p>
                </div>

                <div className="certificado-text">
                  <p className="achievement-text">
                    {certificadoSelecionado.conquista.toUpperCase()} <strong>"{certificadoSelecionado.jogoLivro}"</strong>. VOCÊ BRILHOU!
                  </p>
                </div>

                <div className="certificado-footer">
                  <div className="signature-section">
                    <div className="signature-line"></div>
                    <p className="signature-name">Paulo César</p>
                    <p className="signature-title">Cirurgião Dentista</p>
                  </div>

              
                </div>
              </div>
            </div>
            <button className="download-btn" onClick={() => handleDownload(certificadoSelecionado)}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 12L12 16L8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              BAIXAR CERTIFICADO
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificadosGaleria;