import { ArrowLeft, Gamepad2, Play, Book, User, Brain, Volume2 } from 'lucide-react';
import '../pages/styles/homeKids.css';
import dentinho1 from '../assets/dentinho_1.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logo.png'

export function HomeKids() {
  const navigate = useNavigate();
  const [active, setActive] = useState(false); 
  const [enabled, setEnabled] = useState(false); 

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;
      utterance.pitch = 1.3;
      utterance.volume = 1.0;
      
      const voices = window.speechSynthesis.getVoices();
      const portugueseVoice = voices.find(voice => 
        voice.lang.startsWith('pt') && voice.name.includes('Female')
      ) || voices.find(voice => voice.lang.startsWith('pt'));
      
      if (portugueseVoice) {
        utterance.voice = portugueseVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleClick = () => {
    navigate('/telaEscolha');
  };
 
  const goToVideos = () => {
    navigate('/VideosScreen');
  };

  const goBack = () => {
    navigate('/');
  };

  const goToGames = () => {
    navigate('/GamesScreen');
  };
  const goToHistorico = () => {
    navigate('/Historico');
  };

  const handleActivate = () => {
    setEnabled(true);
    setActive(false);
  };

  return (
    <div className="kids-home-container">
      <div className="header">
        <button className="back-button" onClick={goBack}>
          <ArrowLeft size={24} color="#1f2937" />
        </button>
        
        <div className="logo-icon">
          <img src={logo} alt="Logo Affectus" className="logo-videos" />
        </div>
      </div>

      <div className="main-content">
        <div className="mascot-container">
          <div className="mascot-inner">
            <img src={dentinho1} alt="Mascote Dentinho" className="mascot-image" />
          </div>

          <div className="speech-bubble">
            <div className="speech-content">
              <h2 className="speech-title">
                OLÁ AMIGUINHO(A)!
                <Volume2 
                  size={20} 
                  className="sound-icon" 
                  onClick={() => speak('OLÁ AMIGUINHO(A)!')}
                />
              </h2>
              <p className="speech-text">
                EU SOU O MOLAR,
                <Volume2 
                  size={18} 
                  className="sound-icon" 
                  onClick={() => speak('EU SOU O MOLAR,')}
                />
              </p>
              <p className="speech-text">
                E VAMOS JUNTOS NESSA AVENTURA!
                <Volume2 
                  size={18} 
                  className="sound-icon" 
                  onClick={() => speak('E VAMOS JUNTOS NESSA AVENTURA!')}
                />
              </p>
            </div>
          </div>
        </div>

        <h3 className="question-title">
          POR ONDE COMEÇAMOS?
          <Volume2 
            size={20} 
            className="sound-icon" 
            onClick={() => speak('POR ONDE COMEÇAMOS?')}
          />
        </h3>

        <div className="cards-grid">
          
          <div className="activity-card games-card">
            <div className="card-content">
              <div className="card-icon games-icon">
                <Gamepad2 className="icon" />
              </div>
              <div className="card-text">
                <h4 className="card-title">
                  ÁREA DE JOGOS
                  <Volume2 
                    size={16} 
                    className="sound-icon" 
                    onClick={() => speak('ÁREA DE JOGOS')}
                  />
                </h4>
                <p className="card-description">
                  Aqui, vamos aprender jogando!
                  <Volume2 
                    size={14} 
                    className="sound-icon" 
                    onClick={() => speak('Aqui, vamos aprender jogando!')}
                  />
                </p>
              </div>

              <button className="card-button" onClick={goToGames}>
                VAMOS LÁ!
              </button>
            </div>
          </div>

          <div className="activity-card videos-card">
            <div className="card-content">
              <div className="card-icon videos-icon">
                <Play className="icon" fill="white" />
                <div className="video-decorations">
                  <div className="decoration-dot orange-dot"></div>
                  <div className="decoration-dot yellow-dot"></div>
                </div>
              </div>
              <div className="card-text">
                <h4 className="card-title">
                  ÁREA DE VÍDEOS
                  <Volume2 
                    size={16} 
                    className="sound-icon" 
                    onClick={() => speak('ÁREA DE VÍDEOS')}
                  />
                </h4>
                <p className="card-description">
                  Aqui, a diversão é através da retina!
                  <Volume2 
                    size={14} 
                    className="sound-icon" 
                    onClick={() => speak('Aqui, a diversão é através da retina!')}
                  />
                </p>
              </div>
              <button className="card-button" onClick={goToVideos}>VAMOS LÁ!</button>
            </div>
          </div>

          <div className="activity-card books-card">
            <div className="card-content">
              <div className="card-icon books-icon">
                <Book className="icon" />
              </div>
              <div className="card-text">
                <h4 className="card-title">
                  ÁREA DE LIVROS
                  <Volume2 
                    size={16} 
                    className="sound-icon" 
                    onClick={() => speak('ÁREA DE LIVROS')}
                  />
                </h4>
                <p className="card-description">
                  Aqui, você entrará em mundo mágico!
                  <Volume2 
                    size={14} 
                    className="sound-icon" 
                    onClick={() => speak('Aqui, você entrará em mundo mágico!')}
                  />
                </p>
              </div>
              <button className="card-button" onClick={handleClick}>
                VAMOS LÁ!
              </button>
            </div>
          </div>
        </div>

        <div className="footer">
          <button className="history-button" onClick={goToHistorico}>
            <User size={16} />
            ACESSAR MEU HISTÓRICO
          </button>

          <div className="footer-controls">
            <button className="settings-button" onClick={() => setActive(true)}>
              <Brain size={24} color="#2563eb" />
            </button>
          </div>
        </div>
      </div>

      {active && (
        <div className="safe-space-modal">
          <div className="modal-content">
            <h2>DESEJA ATIVAR O MODO SAFE SPACE?</h2>
            <p>
              Ao ativar o Modo Safe Space, todas as configurações da plataforma
              serão ajustadas para uma experiência mais tranquila e confortável,
              incluindo:
            </p>
            <ul>
              <li>Cores suaves para reduzir estímulos visuais intensos.</li>
              <li>Sons relaxantes e menos intrusivos.</li>
              <li>Animações desaceleradas para evitar distrações rápidas.</li>
              <li>Texto e layout ajustados para facilitar a leitura e navegação.</li>
            </ul>
            <div className="modal-buttons">
              <button className="cancel-button" onClick={() => setActive(false)}>Voltar</button>
              <button className="activate-button" onClick={handleActivate}>Ativar</button>
            </div>
          </div>
        </div>
      )}

      {enabled && (
        <div className="safe-space-activated">
          <div className="modal-content">
            <h2>Modo Safe Space Ativado!</h2>
            <p>
              As configurações da plataforma foram ajustadas para oferecer uma
              experiência mais tranquila e segura. Isso inclui:
            </p>
            <ul>
              <li>Cores suaves e relaxantes</li>
              <li>Sons e efeitos auditivos mais suaves</li>
              <li>Animações desaceleradas</li>
              <li>Layout otimizado para melhor leitura e navegação</li>
            </ul>
            <button className="cancel-button" onClick={() => setEnabled(false)}>Voltar</button>
          </div>
        </div>
      )}
    </div>
  );
}