import React, { useState } from 'react';
import logo from '../assets/logo.png';
import arrowImage from '../assets/Voltar.png';
import mascote from '../assets/MascoteIteiro.png';
import conteudo1 from '../assets/NovosMenbros.png';
import conteudo2 from '../assets/conteudo2.png';
import conteudo3 from '../assets/conteudo3.png';
import conteudo4 from '../assets/PeixonautaHistorico.png';
import jogo1 from '../assets/escovação.jpg';
import jogo2 from '../assets/anagrama.jpg';
import jogo3 from '../assets/matematico.jpg';
import livro1 from '../assets/livro1.png';
import livro2 from '../assets/livroAlfabeto.png';
import livroColorir from '../assets/ColoriBorboleta.png';
import { useNavigate } from 'react-router-dom';

const Historico: React.FC = () => {
  const navigate = useNavigate();
  
  // Estados para o Modo Safe Space
  const [isSafeSpaceActive, setIsSafeSpaceActive] = useState(false);
  const [showSafeSpaceModal, setShowSafeSpaceModal] = useState(false);
  const [validationAnswer, setValidationAnswer] = useState('');
  const [validationError, setValidationError] = useState('');
  const [currentPhrase, setCurrentPhrase] = useState('');
  
  // Frases de validação para desativar Safe Space
  const VALIDATION_PHRASES = [
    "Desativar agora",
    "Confirmo saída",
    "Remover proteção",
    "Sair do modo",
    "Encerrar seguro",
    "Desbloquear tudo",
    "Cancelar proteção",
    "Adulto presente",
    "Autorizo mudança",
    "Permito desbloquear",
    "Supervisor confirma",
    "Alterar agora",
    "Autorizo acesso",
    "Modo normal",
    "Confirmar identidade",
    "Desejo sair",
    "Aceito desativar",
    "Concordo mudar",
    "Validar acesso",
    "Liberar funções"
  ];

  // Selecionar frase aleatória
  const selectRandomPhrase = () => {
    const randomIndex = Math.floor(Math.random() * VALIDATION_PHRASES.length);
    setCurrentPhrase(VALIDATION_PHRASES[randomIndex]);
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#b8d4f0',
      minHeight: '100vh',
      width: '100vw',
      padding: '0',
      margin: '0',
      overflowY: 'auto' as const,   
      overflowX: 'hidden' as const, 
    },
    header: {
      backgroundColor: '#4a90b8',
      padding: '15px 25px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      flexWrap: 'wrap' as const,
      gap: '15px',
    },
    leftSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    },
    backButton: {
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '5px',
      transition: 'transform 0.2s ease',
    },
    logoImage: {
      height: '100px',
      width: 'auto',
      objectFit: 'contain' as const,
    },
    centerSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      flex: '1',
      justifyContent: 'center',
    },
    mascoteImage: {
      height: '140px',
      width: 'auto',
      objectFit: 'contain' as const,
    },
    greeting: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'white',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    },
    headerButtons: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap' as const,
    },
    headerButton: {
      backgroundColor: '#2c5f7c',
      color: 'white',
      border: '2px solid #1a4a5c',
      padding: '14px 28px',
      borderRadius: '10px',
      fontSize: '14px',
      fontWeight: 'bold',
      cursor: 'pointer',
      textTransform: 'uppercase' as const,
      minWidth: '180px',
      textAlign: 'center' as const,  
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      transition: 'all 0.3s ease',
    },
    activeButton: {
      backgroundColor: '#4CAF50',
      border: '2px solid #45a049',
      boxShadow: '0 4px 12px rgba(76, 175, 80, 0.4)',
    },
    main: {
      padding: '30px 25px',
      width: '100%',
      maxWidth: '1600px',
      margin: '0 auto',
      boxSizing: 'border-box' as const,
    },
    section: {
      backgroundColor: '#ffffff',
      margin: '30px 0',
      padding: '0',
      borderRadius: '16px',
      border: '3px solid #c0c0c0',
      boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
      overflow: 'hidden',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    sectionTitle: {
      backgroundColor: '#a8c8a8',
      color: '#2d5016',
      padding: '16px 24px',
      fontSize: '16px',
      fontWeight: 'bold',
      textAlign: 'center' as const,
      borderBottom: '3px solid #7a9a7a',
      margin: '0',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
    },
    sectionContent: {
      padding: '30px',
    },
    contentGrid: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '30px',
      justifyContent: 'center',
    },
    videoContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      width: '260px',
      flexShrink: 0,
    },
    videoThumbnail: {
      position: 'relative' as const,
      borderRadius: '12px',
      overflow: 'hidden',
      border: '3px solid #666',
      aspectRatio: '16/9',
      boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
      width: '100%',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
    },
    thumbnailImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      transition: 'transform 0.3s ease',
    },
    progressBarContainer: {
      position: 'absolute' as const,
      bottom: '0',
      left: '0',
      width: '100%',
      height: '6px',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    progressBar: {
      height: '100%',
      backgroundColor: '#e74c3c',
      boxShadow: '0 0 8px rgba(231, 76, 60, 0.8)',
      transition: 'width 0.3s ease',
    },
    playButton: {
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(0,0,0,0.75)',
      color: 'white',
      border: '4px solid white',
      borderRadius: '50%',
      width: '70px',
      height: '70px',
      fontSize: '28px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      paddingLeft: '35px',
    },
    itemName: {
      marginTop: '12px',
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center' as const,
      lineHeight: '1.4',
    },
    gameGrid: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '30px',
      justifyContent: 'center',
    },
    gameItem: {
      textAlign: 'center' as const,
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      transition: 'transform 0.3s ease',
      width: '200px',
      flexShrink: 0,
    },
    gameIcon: {
      width: '140px',
      height: '140px',
      borderRadius: '20px',
      marginBottom: '12px',
      objectFit: 'cover' as const,
      border: '4px solid #666',
      boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
      transition: 'all 0.3s ease',
    },
    gameButton: {
      backgroundColor: '#2c5f7c',
      color: 'white',
      border: '2px solid #1a4a5c',
      padding: '10px 24px',
      borderRadius: '8px',
      fontSize: '13px',
      fontWeight: 'bold',
      cursor: 'pointer',
      textTransform: 'uppercase' as const,
      marginTop: '10px',
      transition: 'all 0.3s ease',
      boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
    },
    bookGrid: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '35px',
      justifyContent: 'center',
    },
    bookItem: {
      textAlign: 'center' as const,
      position: 'relative' as const,
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      transition: 'transform 0.3s ease',
      width: '200px',
      flexShrink: 0,
    },
    bookCoverContainer: {
      position: 'relative' as const,
      marginBottom: '12px',
    },
    bookCover: {
      width: '160px',
      height: '220px',
      borderRadius: '12px',
      objectFit: 'cover' as const,
      border: '4px solid #666',
      boxShadow: '0 8px 16px rgba(0,0,0,0.25)',
      transition: 'all 0.3s ease',
    },
    bookmark: {
      position: 'absolute' as const,
      top: '-5px',
      right: '15px',
      width: '35px',
      height: '80px',
      backgroundColor: '#e74c3c',
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)',
      boxShadow: '2px 2px 8px rgba(0,0,0,0.3)',
      zIndex: 10,
    },
    bookmarkText: {
      position: 'absolute' as const,
      top: '12px',
      left: '50%',
      transform: 'translateX(-50%)',
      color: 'white',
      fontSize: '10px',
      fontWeight: 'bold',
      textAlign: 'center' as const,
      width: '100%',
    },
    progressBadge: {
      position: 'absolute' as const,
      top: '-12px',
      left: '-12px',
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '8px 14px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: 'bold',
      textTransform: 'uppercase' as const,
      boxShadow: '0 3px 8px rgba(0,0,0,0.3)',
      zIndex: 5,
    },
    bookButton: {
      backgroundColor: '#2c5f7c',
      color: 'white',
      border: '2px solid #1a4a5c',
      padding: '10px 24px',
      borderRadius: '8px',
      fontSize: '13px',
      fontWeight: 'bold',
      cursor: 'pointer',
      textTransform: 'uppercase' as const,
      marginTop: '10px',
      transition: 'all 0.3s ease',
      boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
    },
    coloringSection: {
      textAlign: 'center' as const,
      padding: '30px',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
    },
    modalOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '20px',
      maxWidth: '500px',
      width: '100%',
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
      textAlign: 'center' as const,
      position: 'relative' as const,
    },
    closeButton: {
      position: 'absolute' as const,
      top: '15px',
      right: '15px',
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '28px',
      cursor: 'pointer',
      color: '#666',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      transition: 'all 0.3s ease',
    },
    modalTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#4CAF50',
      marginBottom: '20px',
      textTransform: 'uppercase' as const,
    },
    modalMessage: {
      fontSize: '18px',
      color: '#333',
      marginBottom: '30px',
      lineHeight: '1.5',
    },
    modalButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      padding: '14px 40px',
      borderRadius: '10px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      textTransform: 'uppercase' as const,
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      transition: 'all 0.3s ease',
    },
    modalButtonGroup: {
      display: 'flex',
      gap: '15px',
      justifyContent: 'center',
      marginTop: '20px',
    },
    validationForm: {
      marginBottom: '20px',
    },
    validationLabel: {
      display: 'block',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '15px',
      textAlign: 'left' as const,
    },
    validationInput: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      border: '2px solid #ccc',
      borderRadius: '8px',
      boxSizing: 'border-box' as const,
      marginBottom: '10px',
      textAlign: 'left' as const,
    },
    validationError: {
      color: '#e74c3c',
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '10px',
      marginTop: '10px',
    },
  };

  const goBackHomeKids = () => {
    navigate('/HomeKids');
  };

  const goToMeusCertificados = () => {
    navigate('/Certificados');
  };

  const handleActivateSafeSpace = () => {
    setIsSafeSpaceActive(true);
    setShowSafeSpaceModal(true);
    selectRandomPhrase();
  };

  const handleDeactivateRequest = () => {
    setShowSafeSpaceModal(true);
    setValidationAnswer('');
    setValidationError('');
    selectRandomPhrase();
  };

  const handleDeactivateSafeSpace = () => {
    setIsSafeSpaceActive(false);
    setShowSafeSpaceModal(false);
  };

  const handleCloseModal = () => {
    setShowSafeSpaceModal(false);
  };

  const conteudos = [
    { img: conteudo1, nome: 'Conheça os NOVOS Menbros da Equipe', progress: 65 },
    { img: conteudo2, nome: 'Aa Melhores Férias', progress: 30 },
    { img: conteudo3, nome: 'Charlie e Lola', progress: 85 },
    { img: conteudo4, nome: 'Sempre Alerta!', progress: 20 },
  ];

const jogos = [
  { img: jogo1, nome: "Jogo de Escovação", route: "/game/5" },
  { img: jogo2, nome: "Anagrama de Palavras", route: "/game/3" },
  { img: jogo3, nome: "Jogo Matemático", route: "/game/4" },
];



const livros = [
  {
    nome: "O Pequeno Príncipe",
    img: livro1,
    pdf: "https://affectus-livros-2h1wd3yow-affectus.vercel.app/livros/principe.pdf",

    status: "Lendo",
    bookmarkPage: 12,
    progress: 34,
  },
  {
    nome: "Alfabeto Móvel",
    img: livro2,
    pdf: "https://affectus-livros-2h1wd3yow-affectus.vercel.app/livros/afm.pdf",

    status: "Não iniciado",
    bookmarkPage: 0,
    progress: 0,
  }
];


  const handleMouseEnterVideo = (e: React.MouseEvent<HTMLDivElement>) => {
    const thumbnail = e.currentTarget;
    const img = thumbnail.querySelector('img') as HTMLElement;
    const playBtn = thumbnail.querySelector('button') as HTMLElement;
    
    if (img) img.style.transform = 'scale(1.05)';
    if (playBtn) {
      playBtn.style.transform = 'translate(-50%, -50%) scale(1.15)';
      playBtn.style.backgroundColor = 'rgba(231, 76, 60, 0.9)';
    }
    thumbnail.style.transform = 'translateY(-5px)';
    thumbnail.style.boxShadow = '0 8px 20px rgba(0,0,0,0.35)';
  };

  const handleMouseLeaveVideo = (e: React.MouseEvent<HTMLDivElement>) => {
    const thumbnail = e.currentTarget;
    const img = thumbnail.querySelector('img') as HTMLElement;
    const playBtn = thumbnail.querySelector('button') as HTMLElement;
    
    if (img) img.style.transform = 'scale(1)';
    if (playBtn) {
      playBtn.style.transform = 'translate(-50%, -50%) scale(1)';
      playBtn.style.backgroundColor = 'rgba(0,0,0,0.75)';
    }
    thumbnail.style.transform = 'translateY(0)';
    thumbnail.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)';
  };

  const handleMouseEnterGame = (e: React.MouseEvent<HTMLDivElement>) => {
    const gameItem = e.currentTarget;
    const icon = gameItem.querySelector('img') as HTMLElement;
    const button = gameItem.querySelector('button') as HTMLElement;
    
    gameItem.style.transform = 'translateY(-8px)';
    if (icon) {
      icon.style.transform = 'scale(1.08)';
      icon.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
    }
    if (button) {
      button.style.backgroundColor = '#3a7a9c';
      button.style.transform = 'scale(1.05)';
    }
  };

  const handleMouseLeaveGame = (e: React.MouseEvent<HTMLDivElement>) => {
    const gameItem = e.currentTarget;
    const icon = gameItem.querySelector('img') as HTMLElement;
    const button = gameItem.querySelector('button') as HTMLElement;
    
    gameItem.style.transform = 'translateY(0)';
    if (icon) {
      icon.style.transform = 'scale(1)';
      icon.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
    }
    if (button) {
      button.style.backgroundColor = '#2c5f7c';
      button.style.transform = 'scale(1)';
    }
  };

  const handleMouseEnterBook = (e: React.MouseEvent<HTMLDivElement>) => {
    const bookItem = e.currentTarget;
    const cover = bookItem.querySelector('img') as HTMLElement;
    const button = bookItem.querySelector('button') as HTMLElement;
    
    bookItem.style.transform = 'translateY(-8px)';
    if (cover) {
      cover.style.transform = 'scale(1.05)';
      cover.style.boxShadow = '0 12px 24px rgba(0,0,0,0.35)';
    }
    if (button) {
      button.style.backgroundColor = '#3a7a9c';
      button.style.transform = 'scale(1.05)';
    }
  };

  const handleMouseLeaveBook = (e: React.MouseEvent<HTMLDivElement>) => {
    const bookItem = e.currentTarget;
    const cover = bookItem.querySelector('img') as HTMLElement;
    const button = bookItem.querySelector('button') as HTMLElement;
    
    bookItem.style.transform = 'translateY(0)';
    if (cover) {
      cover.style.transform = 'scale(1)';
      cover.style.boxShadow = '0 8px 16px rgba(0,0,0,0.25)';
    }
    if (button) {
      button.style.backgroundColor = '#2c5f7c';
      button.style.transform = 'scale(1)';
    }
  };

  const handleHeaderButtonHover = (e: React.MouseEvent<HTMLButtonElement>, isEnter: boolean) => {
    const btn = e.currentTarget;
    if (isEnter) {
      btn.style.backgroundColor = '#3a7a9c';
      btn.style.transform = 'translateY(-2px)';
      btn.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
    } else {
      btn.style.backgroundColor = '#2c5f7c';
      btn.style.transform = 'translateY(0)';
      btn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    }
  };

  const handleBackButtonHover = (e: React.MouseEvent<HTMLButtonElement>, isEnter: boolean) => {
    const btn = e.currentTarget;
    if (isEnter) {
      btn.style.transform = 'scale(1.1)';
    } else {
      btn.style.transform = 'scale(1)';
    }
  };

  const handleValidationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationAnswer(e.target.value);
    setValidationError('');
  };

  const handleValidationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validationAnswer.trim() === currentPhrase) {
      handleDeactivateSafeSpace();
    } else {
      setValidationError('Frase incorreta. Digite exatamente como mostrado.');
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.leftSection}>
          <button 
            style={styles.backButton}
            onClick={goBackHomeKids}
            onMouseEnter={(e) => handleBackButtonHover(e, true)}
            onMouseLeave={(e) => handleBackButtonHover(e, false)}
          >
            <img src={arrowImage} alt="Voltar" style={{ width: '32px', height: '32px', display: 'block' }} />
          </button>
          <img src={logo} alt="Logo" style={styles.logoImage} />
        </div>

        <div style={styles.centerSection}>
          <img src={mascote} alt="Mascote" style={styles.mascoteImage} />
          <div style={styles.greeting}>OLÁ, GABRIEL!</div>
        </div>

        <div style={styles.headerButtons}>
          <button 
            style={styles.headerButton}
            onClick={goToMeusCertificados}
            onMouseEnter={(e) => handleHeaderButtonHover(e, true)}
            onMouseLeave={(e) => handleHeaderButtonHover(e, false)}
          >
            Meus Certificados
          </button>

          <button 
            style={{
              ...styles.headerButton,
              ...(isSafeSpaceActive ? styles.activeButton : {})
            }}
            onClick={isSafeSpaceActive ? handleDeactivateRequest : handleActivateSafeSpace}
            onMouseEnter={(e) => !isSafeSpaceActive && handleHeaderButtonHover(e, true)}
            onMouseLeave={(e) => !isSafeSpaceActive && handleHeaderButtonHover(e, false)}
          >
            {isSafeSpaceActive ? '✓ Safe Space Ativo' : 'Modo Safe Space'}
          </button>
        </div>
      </header>

      <main style={styles.main}>
        {/* Conteúdos com barra de progresso vermelha */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Continue de onde parou:</h2>
          <div style={styles.sectionContent}>
            <div style={styles.contentGrid}>
              {conteudos.map((c, i) => (
                <div key={i} style={styles.videoContainer}>
                  <div 
                    style={styles.videoThumbnail}
                    onMouseEnter={handleMouseEnterVideo}
                    onMouseLeave={handleMouseLeaveVideo}
                  >
                    <img src={c.img} alt={c.nome} style={styles.thumbnailImage} />
                    <button style={styles.playButton}>▶</button>
                    
                    {/* Barra de progresso vermelha */}
                    <div style={styles.progressBarContainer}>
                      <div style={{...styles.progressBar, width: `${c.progress}%`}}></div>
                    </div>
                  </div>
                  <div style={styles.itemName}>{c.nome}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Jogos */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Jogados recentemente:</h2>
          <div style={styles.sectionContent}>
          <div style={styles.gameGrid}>
  {jogos.map((j, i) => (
    <div 
      key={i}
      style={styles.gameItem}
      onMouseEnter={handleMouseEnterGame}
      onMouseLeave={handleMouseLeaveGame}
    >
      <img src={j.img} alt={j.nome} style={styles.gameIcon} />
      <div style={styles.itemName}>{j.nome}</div>

      <button 
  style={styles.gameButton}
  onClick={() => navigate(j.route)}
>
  Jogar
</button>

    </div>
  ))}
</div>



            </div>          
        </section>

        {/* Livros com marcador de página */}
      <section style={styles.section}>
  <h2 style={styles.sectionTitle}>Meus livros para leitura</h2>
  <div style={styles.sectionContent}>
    <div style={styles.bookGrid}>
      {livros.map((l, i) => (
        <div 
          key={i} 
          style={styles.bookItem}
          onMouseEnter={handleMouseEnterBook}
          onMouseLeave={handleMouseLeaveBook}
        >
          <div style={styles.progressBadge}>
            {l.status}
          </div>

          <div style={styles.bookCoverContainer}>
            <div style={styles.bookmark}>
              <div style={styles.bookmarkText}>{l.bookmarkPage}</div>
            </div>
            <img src={l.img} alt={l.nome} style={styles.bookCover} />
          </div>

          <div style={styles.itemName}>{l.nome}</div>

          <button 
            style={styles.bookButton}
            onClick={() => window.open(l.pdf, "_blank")}
          >
            {l.progress === 100 ? 'Ler Novamente' : 'Continuar'}
          </button>
        </div>
      ))}
    </div>
  </div>
</section>

        {/* Livro de Colorir */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Desenho para colorir</h2>
          <div style={styles.coloringSection}>
            <div 
              style={styles.bookItem}
              onMouseEnter={handleMouseEnterBook}
              onMouseLeave={handleMouseLeaveBook}
            >
              <div style={styles.bookCoverContainer}>
                <div style={styles.bookmark}>
                  <div style={styles.bookmarkText}>75%</div>
                </div>
                <img src={livroColorir} alt="Livro para colorir" style={styles.bookCover} />
              </div>
              <div style={styles.itemName}>Desenho Borboleta</div>
      <button
        style={styles.bookButton}
        onClick={() => navigate("/ColorirLivros")}
      >
        Continuar
      </button>
            </div>
          </div>
        </section>
      </main>

      {/* Modal de Ativação/Desativação */}
      {showSafeSpaceModal && (
        <div style={styles.modalOverlay} onClick={handleCloseModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              style={styles.closeButton}
              onClick={handleCloseModal}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#333';
                e.currentTarget.style.backgroundColor = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#666';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              ×
            </button>
            
            <div style={styles.modalTitle}>
              {isSafeSpaceActive ? '🛡️ MODO SAFE SPACE ESTÁ ATIVADO!' : 'MODO SAFE SPACE'}
            </div>
            
            <div style={styles.modalMessage}>
              O Modo Safe Space está ativo. <strong>Ele ajusta as cores da interface</strong> e <strong>eduz os sons</strong> para criar um ambiente mais leve, calmo e confortável para você.
            </div>
            
            {isSafeSpaceActive && (
              <>
                {/* Formulário de validação com frase */}
                <form onSubmit={handleValidationSubmit} style={styles.validationForm}>
                  <label style={styles.validationLabel}>
                    Para desativar o Safe Space, digite a frase abaixo exatamente como está escrita:
                    <br />
                    <strong style={{ fontSize: '18px', color: '#4CAF50', marginTop: '15px', display: 'block', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '8px', border: '2px dashed #4CAF50' }}>
                      "{currentPhrase}"
                    </strong>
                  </label>
                  <input
                    type="text"
                    value={validationAnswer}
                    onChange={handleValidationChange}
                    style={styles.validationInput}
                    placeholder="Digite a frase aqui"
                    autoFocus
                  />
                  {validationError && (
                    <div style={styles.validationError}>{validationError}</div>
                  )}
                  <div style={styles.modalButtonGroup}>
                    <button 
                      type="submit"
                      style={{...styles.modalButton, backgroundColor: '#e74c3c'}}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#c0392b';
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#e74c3c';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      Confirmar Desativação
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1200px) {
          header {
            padding: 12px 20px !important;
          
        }

        @media (max-width: 992px) {
          header {
            justify-content: center !important;
          }
          header > div:first-child img:first-child {
            height: 80px !important;
          }
          header > div:nth-child(2) img {
            height: 110px !important;
          }
          header > div:nth-child(2) div {
            font-size: 20px !important;
          }
        }

        @media (max-width: 768px) {
          main {
            padding: 20px 15px !important;
          }
          section {
            margin: 20px 0 !important;
          }
          header {
            flex-direction: column !important;
            align-items: center !important;
          }
          header > div {
            justify-content: center !important;
          }
          header button {
            min-width: 150px !important;
            padding: 12px 20px !important;
            font-size: 12px !important;
          }
        }

        @media (max-width: 576px) {
          header > div:first-child img:first-child {
            height: 70px !important;
          }
          header > div:nth-child(2) {
            flex-direction: column !important;
            gap: 10px !important;
          }
          header > div:nth-child(2) img {
            height: 90px !important;
          }
          header > div:nth-child(2) div {
            font-size: 18px !important;
          }
          header button {
            min-width: 140px !important;
            font-size: 11px !important;
          }
          section h2 {
            font-size: 14px !important;
            padding: 12px 16px !important;
          }
          section > div {
            padding: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};
 
export default Historico;