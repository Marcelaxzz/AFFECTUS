import { useState } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import logoRock from '../../assets/logo-rock.png';
import flashbackImg from '../../assets/flashback.jpg';
import rockImg from '../../assets/rock.jpg';
import popImg from '../../assets/pop.jpg';
import eletronicaImg from '../../assets/eletronica.jpg';
import relaxImg from '../../assets/relax.jpg';
import classicaImg from '../../assets/classica.jpg';
import kidsImg from '../../assets/kids.jpg';
import naturezaImg from '../../assets/natureza.jpg';
import jazzImg from '../../assets/jazz.jpg';
import indieImg from '../../assets/indie.jpg';

import acousticImg from '../../assets/acustico.jpg';
import lofiImg from '../../assets/lofi.jpg';
import metalImg from '../../assets/metal.jpg';
import countryImg from '../../assets/country.jpg';
import '../styles/PlaylistRelax.css';

// Background images for each genre
const genreBackgrounds = {
  flashback: flashbackImg,
  rock: rockImg,
  pop: popImg,
  eletronica: eletronicaImg,
  calmas: relaxImg,
  classica: classicaImg,
  kids: kidsImg,
  natureza: naturezaImg,
  jazz: jazzImg,
  indie: indieImg,
  acoustic: acousticImg,
  lofi: lofiImg,
  metal: metalImg,
  country: countryImg,
};

interface Playlist {
  id: string;
  name: string;
  description: string;
  category: string;
  cover: string;
  spotifyEmbedUrl: string;
  backgroundImage?: string;
}

export default function PlaylistRelax() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activePlaylist, setActivePlaylist] = useState<Playlist | null>(null);

  const playlists: Playlist[] = [
    {
      id: 'flashback',
      name: 'Flashback 80s',
      description: 'Clássicos dos anos 70, 80 e 90. Um mergulho no tempo! 🕺',
      category: 'flashback',
      cover: 'https://i.scdn.co/image/ab67706f00000003ebffb9320eb0b9b44448ad74',
      spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXaKIA8E7WcJj?utm_source=generator',
      backgroundImage: genreBackgrounds.flashback,
    },
    {
      id: 'rock',
      name: 'Rock Clássico',
      description: 'Guitarras marcantes e hinos do rock que nunca morrem 🎸',
      category: 'rock',
      cover: 'https://i.scdn.co/image/ab67706f000000034268a7c0b7d49f4d8e2b6824',
      spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWXRqgorJj26U?utm_source=generator',
      backgroundImage: genreBackgrounds.rock,
    },
    {
      id: 'pop',
      name: 'Pop Hits',
      description: 'Os maiores sucessos do momento e os hits que não saem da cabeça 🎤',
      category: 'pop',
      cover: 'https://i.scdn.co/image/ab67706f00000003436e9a8a38f91dbeb6ecb4f3',
      spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator',
      backgroundImage: genreBackgrounds.pop,
    },
    {
      id: 'eletronica',
      name: 'Eletrônica Vibes',
      description: 'Batidas eletrizantes para manter o ritmo ⚡',
      category: 'eletronica',
      cover: 'https://i.scdn.co/image/ab67706f00000003230fa4e61b8889df9d9da166',
      spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX4dyzvuaRJ0n?utm_source=generator',
      backgroundImage: genreBackgrounds.eletronica,
    },
    {
      id: 'relax',
      name: 'Relax & Chill',
      description: 'Músicas suaves para desacelerar e relaxar 🧘‍♀️',
      category: 'calmas',
      cover: 'https://i.scdn.co/image/ab67706f00000003a59a9b25071d79cd6e3323b8',
      spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX3Ogo9pFvBkY?utm_source=generator',
      backgroundImage: genreBackgrounds.calmas,
    },
    {
      id: 'classica',
      name: 'Música Clássica Essencial',
      description: 'Os maiores compositores da história, reunidos. 🎹',
      category: 'classica',
      cover: 'https://i.scdn.co/image/ab67706f00000003f6f22e4a1c9e76cf51a0fd70',
      spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWWEJlAGA9gs0?utm_source=generator',
      backgroundImage: genreBackgrounds.classica,
    },
    {
      id: 'kids',
      name: 'Músicas Infantis',
      description: 'Canções divertidas e educativas para os pequenos 👶',
      category: 'kids',
      cover: 'https://i.scdn.co/image/ab67706f00000003f59e6a9e9c4a9bcd93723b07',
      spotifyEmbedUrl: 'https://open.spotify.com/playlist/1uyQgk6NwQJyrQnliabtKd?si=83be0Z8qS-C2ftBNEp5bDQ',
      backgroundImage: genreBackgrounds.kids,
    },
    {
      id: 'natureza',
      name: 'Nature Sounds',
      description: 'Sons da floresta, da chuva e do mar para relaxar 🌿',
      category: 'natureza',
      cover: 'https://i.scdn.co/image/ab67706f00000003c4dc405a3b60a75f0b60cc16',
      spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWU0ScTcjJBdj?utm_source=generator',
      backgroundImage: genreBackgrounds.natureza,
    },
    {
      id: 'jazz',
      name: 'Jazz Essentials',
      description: 'Os clássicos do jazz para momentos sofisticados 🎷',
      category: 'jazz',
      cover: 'https://i.scdn.co/image/ab67706f00000003c10e93cf5bf3492fd924d8e1',
      spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXbITWG1ZJKYt?utm_source=generator',
      backgroundImage: genreBackgrounds.jazz,
    },
    {
      id: 'indie',
      name: 'Indie Vibes',
      description: 'Sons alternativos e independentes 🎨',
      category: 'indie',
      cover: 'https://i.scdn.co/image/ab67706f00000003ba66e64db05c5f4abd6e7c0e',
      spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX2Nc3B70tvx0?utm_source=generator',
      backgroundImage: genreBackgrounds.indie,
    },
    {
      id: 'acoustic',
      name: 'Acoustic Sessions',
      description: 'Versões acústicas e intimistas das suas favoritas 🎸',
      category: 'calmas',
      cover: 'https://i.scdn.co/image/ab67706f000000033b4fdb77ec7bf48f4c230bb5',
      spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX4E3UdUs7fUx?utm_source=generator',
      backgroundImage: genreBackgrounds.acoustic,
    },
    {
      id: 'lofi',
      name: 'Lo-Fi Beats',
      description: 'Batidas tranquilas para estudar e relaxar 📚',
      category: 'calmas',
      cover: 'https://i.scdn.co/image/ab67706f00000003ca5a7517156021292e5e364a',
      spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn?utm_source=generator',
      backgroundImage: genreBackgrounds.lofi,
    },
    {
      id: 'metal',
      name: 'Heavy Metal',
      description: 'Peso, potência e muita distorção 🤘',
      category: 'rock',
      cover: 'https://i.scdn.co/image/ab67706f00000003fb1a6ca70c04e6fd5c43b3c5',
      spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWWOaP4H0w5b0?utm_source=generator',
      backgroundImage: genreBackgrounds.metal,
    },
    {
      id: 'country',
      name: 'Country Classics',
      description: 'As melhores histórias do country 🤠',
      category: 'country',
      cover: 'https://i.scdn.co/image/ab67706f00000003f86aa21b15cf8d3e23c86b79',
      spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWZBCPUIUs2iR?utm_source=generator',
      backgroundImage: genreBackgrounds.country,
    },
  ];

  const categories = [
    { id: 'all', label: 'Todas', icon: '🎶' },
    { id: 'flashback', label: 'Flashback', icon: '🕺' },
    { id: 'rock', label: 'Rock', icon: '🎸' },
    { id: 'pop', label: 'Pop', icon: '🎤' },
    { id: 'eletronica', label: 'Eletrônica', icon: '⚡' },
    { id: 'calmas', label: 'Relax', icon: '🧘' },
    { id: 'classica', label: 'Clássica', icon: '🎹' },
    { id: 'kids', label: 'Infantil', icon: '👶' },
    { id: 'natureza', label: 'Natureza', icon: '🌿' },
    { id: 'jazz', label: 'Jazz', icon: '🎷' },
    { id: 'indie', label: 'Indie', icon: '🎨' },
    { id: 'metal', label: 'Metal', icon: '🤘' },
    { id: 'country', label: 'Country', icon: '🤠' },
  ];

  const filteredPlaylists = playlists.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBackToDashboard = () => {
    // Navegação para DashboardAdmin
    window.location.href = '/DashboardAdmin';
  };

  return (
    <div className="playlist-container">
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

      <header className="header">
        <div className="header-content">
        
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Buscar playlists..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="logo-rock-badge">
          <img src={logoRock} alt="Badge" />
        </div>

        <div className="playlist-details">
          
          <h1 className="playlist-title">PLAYLIST RELAX-AFFECTUS</h1>
          <p className="playlist-description">
            Escolha uma categoria e ouça direto aqui no app, sem sair da página. 💙
          </p>
        </div>

        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-label">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Layout com Grid: Cards à esquerda, Player à direita */}
        <div className="content-grid">
          {/* Cards */}
          <div className="playlist-grid">
            {filteredPlaylists.map((playlist) => (
              <div
                key={playlist.id}
                className="playlist-card"
                onClick={() => setActivePlaylist(playlist)}
                style={{
                  backgroundImage: playlist.backgroundImage 
                    ? `url(${playlist.backgroundImage})`
                    : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="playlist-info-overlay">
                  <h3>{playlist.name}</h3>
                  <p>{playlist.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Player incorporado - agora MAIOR ao lado */}
          <div className="spotify-player-sidebar">
            {activePlaylist ? (
              <div className="spotify-player-content">
                <div className="player-header">
                  <div className="playing-badge">🎧 Tocando Agora</div>
                  <h2 className="playing-title">{activePlaylist.name}</h2>
                  <p className="playing-description">{activePlaylist.description}</p>
                </div>
                <iframe
                  className="spotify-iframe"
                  src={activePlaylist.spotifyEmbedUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title={`Spotify Player - ${activePlaylist.name}`}
                ></iframe>
              </div>
            ) : (
              <div className="player-empty-state">
                <div className="empty-state-icon">🎵</div>
                <h3>Nenhuma playlist selecionada</h3>
                <p>Clique em uma playlist para começar a ouvir</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
