import React, { useState, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import '../styles/GerarCertificado.css';
import SignatureImage from "../../assets/assinatura-Photoroom.png"
import logo from "../../assets/logo.png"

interface CertificadoProps {
  nomeEstudante?: string;
  conquista?: string;
  jogoLivro?: string;
}

const Certificado: React.FC<CertificadoProps> = ({
  nomeEstudante = "Gabriel Gonçalves Marques",
  conquista = "4h de muito aprendizado no jogo",
  jogoLivro = "Anagrama de Palavras"
}) => {
  const [nome, setNome] = useState(nomeEstudante);
  const [conquistaTexto, setConquistaTexto] = useState(conquista);
  const [jogo, setJogo] = useState(jogoLivro);
  const certificadoRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (certificadoRef.current) {
      try {
        const html2canvas = (await import('html2canvas')).default;
        
        // Captura o elemento com configurações otimizadas para fundo branco puro
        const canvas = await html2canvas(certificadoRef.current, {
          scale: 3, // Alta qualidade
          backgroundColor: '#ffffff', // 🔹 Força fundo branco em vez de null
          useCORS: true,
          logging: false,
          allowTaint: true,
          removeContainer: true,
        });
        
        const link = document.createElement('a');
        link.download = `certificado-${nome.replace(/\s+/g, '-').toLowerCase()}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
      } catch (error) {
        console.error('Erro ao gerar certificado:', error);
        alert('Erro ao gerar certificado. Tente novamente.');
      }
    }
  };

  const handleClearAll = () => {
    setNome('');
    setConquistaTexto('');
    setJogo('');
  };

  const handleBackToDashboard = () => {
    // Navegação para DashboardAdmin
    // Ajuste conforme seu sistema de roteamento (React Router, Next.js, etc.)
    window.location.href = '/DashboardAdmin';
  };

  return (
    <div className="certificado-container">
      {/* Botão de voltar no canto superior esquerdo */}
      <button 
        onClick={handleBackToDashboard}
        className="back-to-dashboard-btn"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'transparent',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          zIndex: 1000,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        }}
        title="Voltar para Dashboard"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="certificado-form">
        <h2>PERSONALIZAR CERTIFICADO:</h2>
        <div className="form-group">
          <label>Nome do Paciente:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome do estudante"
          />
        </div>
        <div className="form-group">
          <label>Conquista:</label>
          <input
            type="text"
            value={conquistaTexto}
            onChange={(e) => setConquistaTexto(e.target.value)}
            placeholder="Ex: 4h de muito aprendizado no jogo"
          />
        </div>
        <div className="form-group">
          <label>Jogo/Livro:</label>
          <input
            type="text"
            value={jogo}
            onChange={(e) => setJogo(e.target.value)}
            placeholder="Ex: Anagrama de Palavras"
          />
        </div>
        
        <button onClick={handleDownload} className="download-btn">
          Baixar Certificado
        </button>
        <button onClick={handleClearAll} className="clear-btn">
          🗑️ Limpar Tudo
        </button>
      </div>

      <div ref={certificadoRef} className="certificado">
        {/* 🔹 REMOVIDO: background-shapes que causavam camada clara no download */}

        {/* Elementos decorativos esquerda */}
        <div className="decorative-left">
          <div className="notebook">
            <div className="notebook-cover"></div>
            <div className="notebook-pages"></div>
          </div>
          <div className="pencil"></div>
          <div className="ruler"></div>
        </div>

        {/* Elementos decorativos direita */}
        <div className="decorative-right">
          <div className="graduation-hat">
            <div className="hat-base"></div>
            <div className="hat-top"></div>
            <div className="tassel"></div>
          </div>
          <div className="diploma">
            <div className="diploma-paper"></div>
            <div className="diploma-ribbon"></div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="certificado-content">
          <h1 className="certificado-title">CERTIFICADO</h1>
          <h2 className="certificado-subtitle">CERTiFiCO QUE:</h2>
          
          <div className="certificado-text">
            <div className="name-section">
              <p className="student-name">{nome}</p>
              <div className="dotted-line"></div>

              <div className="achievement-section">
                <p className="achievement-text">
                  Atingiu {conquistaTexto} "{jogo}".
                </p>
                <p className="congratulations-text">
                  Parabéns pela conquista, você foi incrível! Continue brilhando!
                </p>
              </div>
            </div>
          </div>

          <div className="certificado-footer">
            <div className="footer-content">
              <div className="signature-section">
                <img 
                  src={SignatureImage} 
                  alt="Assinatura Paulo César Araújo Marques"
                  className="signature-image"
                />
                <div className="signature-line"></div>
                <p className="signature-name">Paulo César Araújo Marques</p>
                <p className="signature-title">Cirurgião Dentista</p>
              </div>

              <div className="logo-section">
                <img 
                  src={logo} 
                  alt="Logo do consultório"
                  className="logo-affectus-certificado"
                />
              </div>
            </div>
          </div>

          <div className="medal">
            <div className="medal-outer">
              <div className="medal-inner">
                <div className="medal-center"></div>
              </div>
              <div className="medal-ribbons">
                <div className="ribbon ribbon-left"></div>
                <div className="ribbon ribbon-right"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificado;
