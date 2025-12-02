import React, { useState } from 'react';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import './styles/Colorir.css';
import dentinhoImage from '../assets/dentinho_1.png';
import soniccolorir from '../assets/soniccolorir.png';

const Colorir: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState('#FF6B6B');
  const [currentDrawing, setCurrentDrawing] = useState('coelho');
  const [fills, setFills] = useState<Record<string, string>>({});
  const [isSpeaking, setIsSpeaking] = useState(false);

  const colors = [
    '#FF0000', '#FF6B6B', '#FF1493', '#FF69B4', '#FFC0CB',
    '#FF8C00', '#FFA500', '#FFD700', '#FFFF00', '#FFFACD',
    '#00FF00', '#90EE90', '#00FA9A', '#32CD32', '#ADFF2F',
    '#00CED1', '#00BFFF', '#1E90FF', '#4169E1', '#87CEEB',
    '#9370DB', '#8A2BE2', '#BA55D3', '#DA70D6', '#FF00FF',
    '#F5DEB3', '#DEB887', '#D2691E', '#CD853F', '#A0522D',
    '#8B4513', '#654321', '#FFFFFF', '#D3D3D3', '#808080',
    '#696969', '#000000', '#2F4F4F', '#4A5568', '#2D3748',
    '#FFB6C1', '#E6E6FA', '#F0E68C', '#8B0000', '#4B0082',
    '#5F9EA0', '#D2B48C', '#9ACD32', '#F0F8FF', '#800080',
    '#FF6347', '#98FB98', '#FFF0F5', '#FFE4E1', '#FF4500',
    '#C71585', '#191970', '#A52A2A', '#B22222', '#7FFF00'
  ];

  const speakText = () => {
    // Cancel any ongoing speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = "Olá! Essa é Área de Colorir Affectus! Escolha a imagem, selecione a cor e preencha as áreas para criar sua obra de arte! Vamos colorir juntos?";
    
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    // Configure voice to sound more childlike
    utterance.pitch = 1.5; // Higher pitch for child-like voice
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.volume = 1;
    utterance.lang = 'pt-BR'; // Portuguese Brazil

    // Try to find a female/child voice if available
    const voices = window.speechSynthesis.getVoices();
    const childVoice = voices.find(voice => 
      voice.lang.startsWith('pt') && (voice.name.includes('female') || voice.name.includes('Female'))
    ) || voices.find(voice => voice.lang.startsWith('pt'));
    
    if (childVoice) {
      utterance.voice = childVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const paint = (id: string) => {
    setFills(prev => ({ ...prev, [id]: selectedColor }));
  };

  const clearCanvas = () => {
    setFills({});
  };

  const goBack = () => {
    window.history.back();
  };

  const renderDrawing = () => {
    const commonProps = (id: string, defaultFill = 'white') => ({
      id,
      fill: fills[id] || defaultFill,
      onClick: () => paint(id),
      style: { cursor: 'pointer' },
      stroke: 'black',
      strokeWidth: 2
    });

    switch (currentDrawing) {
      // NUMBERS 0-9
      case 'number0':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('bg-n0', '#E3F2FD')} x="0" y="0" width="800" height="600" stroke="none" />
            <ellipse {...commonProps('num0-outer', '#BBDEFB')} cx="400" cy="300" rx="140" ry="180" strokeWidth={8} />
            <ellipse {...commonProps('num0-inner', 'white')} cx="400" cy="300" rx="90" ry="120" strokeWidth={6} />
            <circle {...commonProps('balloon1', '#FF69B4')} cx="200" cy="150" r="35" />
            <path d="M 200 185 Q 195 220 190 250" stroke="black" strokeWidth="2" fill="none" />
            <circle {...commonProps('balloon2', '#FFD700')} cx="600" cy="180" r="40" />
            <path d="M 600 220 Q 595 260 590 290" stroke="black" strokeWidth="2" fill="none" />
            <circle {...commonProps('star1', '#FFA500')} cx="150" cy="450" r="25" />
            <circle {...commonProps('star2', '#9370DB')} cx="650" cy="480" r="30" />
          </svg>
        );

      case 'number1':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('bg-n1', '#E3F2FD')} x="0" y="0" width="800" height="600" stroke="none" />
            <path {...commonProps('num1-main', '#90CAF9')} d="M 350 150 L 420 150 L 420 500 L 500 500 L 500 550 L 300 550 L 300 500 L 380 500 L 380 200 L 350 220 Z" strokeWidth={8} />
            <circle {...commonProps('star-n1-1', '#FFD700')} cx="600" cy="150" r="30" />
            <circle {...commonProps('star-n1-2', '#FF69B4')} cx="200" cy="200" r="25" />
            <path {...commonProps('ribbon', '#FF1493')} d="M 100 400 Q 120 380 140 400 Q 160 420 180 400" />
          </svg>
        );

      case 'number2':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('bg-n2', '#E3F2FD')} x="0" y="0" width="800" height="600" stroke="none" />
            <path {...commonProps('num2-main', '#90CAF9')} d="M 280 200 Q 280 150 350 150 L 450 150 Q 520 150 520 220 Q 520 270 480 310 L 320 450 L 520 450 L 520 500 L 280 500 L 280 450 L 440 310 Q 480 270 480 220 Q 480 190 450 190 L 350 190 Q 320 190 320 220 L 280 220 Z" strokeWidth={8} />
            <circle {...commonProps('dot-n2-1', '#FFA500')} cx="650" cy="200" r="20" />
            <circle {...commonProps('dot-n2-2', '#32CD32')} cx="150" cy="300" r="20" />
            <rect {...commonProps('square1', '#9370DB')} x="600" y="400" width="40" height="40" />
          </svg>
        );

      case 'number3':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('bg-n3', '#E3F2FD')} x="0" y="0" width="800" height="600" stroke="none" />
            <path {...commonProps('num3-main', '#90CAF9')} d="M 280 180 Q 280 150 330 150 L 470 150 Q 520 150 520 200 Q 520 240 490 250 Q 520 260 520 300 Q 520 350 470 350 L 330 350 Q 280 350 280 320 L 320 320 Q 320 310 330 310 L 470 310 Q 480 310 480 300 Q 480 280 470 280 L 380 280 L 380 240 L 470 240 Q 480 240 480 220 Q 480 190 470 190 L 330 190 Q 320 190 320 200 L 280 200 Z" strokeWidth={8} />
            <polygon {...commonProps('triangle1', '#FFD700')} points="150,200 180,250 120,250" />
            <polygon {...commonProps('triangle2', '#FF69B4')} points="650,350 680,400 620,400" />
            <circle {...commonProps('bubble1', '#00BFFF')} cx="100" cy="450" r="18" />
          </svg>
        );

      case 'number4':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('bg-n4', '#E3F2FD')} x="0" y="0" width="800" height="600" stroke="none" />
            <path {...commonProps('num4-vertical', '#90CAF9')} d="M 380 150 L 430 150 L 430 550 L 380 550 Z" strokeWidth={8} />
            <path {...commonProps('num4-diagonal', '#64B5F6')} d="M 280 150 L 330 150 L 480 380 L 430 380 Z" strokeWidth={8} />
            <rect {...commonProps('num4-horizontal', '#4A90E2')} x="280" y="360" width="250" height="50" strokeWidth={8} />
            <circle {...commonProps('heart1', '#FF1493')} cx="600" cy="200" r="25" />
            <circle {...commonProps('heart2', '#FF69B4')} cx="200" cy="450" r="30" />
          </svg>
        );

      case 'number5':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('bg-n5', '#E3F2FD')} x="0" y="0" width="800" height="600" stroke="none" />
            <path {...commonProps('num5-main', '#90CAF9')} d="M 320 150 L 480 150 L 480 190 L 360 190 L 360 280 L 450 280 Q 500 280 500 330 L 500 410 Q 500 460 450 460 L 350 460 Q 300 460 300 430 L 340 430 Q 340 420 350 420 L 450 420 Q 460 420 460 410 L 460 330 Q 460 320 450 320 L 320 320 Z" strokeWidth={8} />
            <polygon {...commonProps('kite1', '#FFA500')} points="650,150 680,180 650,210 620,180" />
            <path d="M 650 210 L 650 280" stroke="black" strokeWidth="2" fill="none" />
            <circle {...commonProps('cloud1', 'white')} cx="150" cy="150" r="30" />
          </svg>
        );

      // LETTERS
      case 'letterA':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('bg-la', '#E3F2FD')} x="0" y="0" width="800" height="600" stroke="none" />
            <path {...commonProps('letter-a-left', '#90CAF9')} d="M 320 500 L 280 500 L 380 150 L 420 150 Z" strokeWidth={8} />
            <path {...commonProps('letter-a-right', '#64B5F6')} d="M 420 150 L 460 150 L 520 500 L 480 500 Z" strokeWidth={8} />
            <rect {...commonProps('letter-a-bar', '#4A90E2')} x="340" y="350" width="120" height="40" strokeWidth={8} />
            <circle {...commonProps('apple-la', '#FF0000')} cx="650" cy="200" r="40" />
            <rect {...commonProps('stem-la', '#8B4513')} x="645" y="165" width="10" height="30" />
            <ellipse {...commonProps('leaf-la', '#228B22')} cx="670" cy="175" rx="15" ry="10" transform="rotate(30 670 175)" />
            <text x="150" y="450" fontSize="48" fontWeight="bold" fill="#4A90E2">APPLE</text>
          </svg>
        );

      case 'letterB':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('bg-lb', '#E3F2FD')} x="0" y="0" width="800" height="600" stroke="none" />
            <rect {...commonProps('letter-b-stem', '#90CAF9')} x="300" y="150" width="60" height="350" strokeWidth={8} />
            <path {...commonProps('letter-b-top', '#64B5F6')} d="M 360 150 L 460 150 Q 520 150 520 220 Q 520 280 460 280 L 360 280 Z" strokeWidth={8} />
            <path {...commonProps('letter-b-bottom', '#4A90E2')} d="M 360 280 L 470 280 Q 530 280 530 380 Q 530 500 470 500 L 360 500 Z" strokeWidth={8} />
            <circle {...commonProps('ball-lb', '#FFA500')} cx="200" cy="300" r="35" />
            <path {...commonProps('ball-line1', 'black')} d="M 200 265 L 200 335" stroke="black" strokeWidth="2" fill="none" />
            <path {...commonProps('ball-line2', 'black')} d="M 165 300 L 235 300" stroke="black" strokeWidth="2" fill="none" />
            <text x="580" y="350" fontSize="42" fontWeight="bold" fill="#4A90E2">BALL</text>
          </svg>
        );

      case 'letterC':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('bg-lc', '#E3F2FD')} x="0" y="0" width="800" height="600" stroke="none" />
            <path {...commonProps('letter-c-main', '#90CAF9')} d="M 500 200 Q 480 150 400 150 L 350 150 Q 280 150 280 250 L 280 400 Q 280 500 350 500 L 400 500 Q 480 500 500 450 L 500 480 Q 470 540 400 540 L 350 540 Q 240 540 240 400 L 240 250 Q 240 110 350 110 L 400 110 Q 470 110 500 170 Z" strokeWidth={8} />
            <circle {...commonProps('cat-head', '#FFA500')} cx="600" cy="250" r="60" />
            <polygon {...commonProps('cat-ear1', '#FF8C00')} points="560,200 575,170 590,200" />
            <polygon {...commonProps('cat-ear2', '#FF8C00')} points="610,200 625,170 640,200" />
            <circle {...commonProps('cat-eye1', 'black')} cx="585" cy="245" r="8" stroke="none" />
            <circle {...commonProps('cat-eye2', 'black')} cx="615" cy="245" r="8" stroke="none" />
            <text x="120" y="480" fontSize="42" fontWeight="bold" fill="#4A90E2">CAT</text>
          </svg>
        );

     
      case 'lion':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('bg-lion', '#FFE4B5')} x="0" y="0" width="800" height="600" stroke="none" />
            <circle {...commonProps('lion-mane', '#FFA500')} cx="400" cy="300" r="120" />
            <circle {...commonProps('lion-mane2', '#FF8C00')} cx="340" cy="250" r="50" />
            <circle {...commonProps('lion-mane3', '#FF8C00')} cx="460" cy="250" r="50" />
            <circle {...commonProps('lion-mane4', '#FF8C00')} cx="340" cy="350" r="50" />
            <circle {...commonProps('lion-mane5', '#FF8C00')} cx="460" cy="350" r="50" />
            <circle {...commonProps('lion-face', '#FFD700')} cx="400" cy="300" r="80" />
            <circle {...commonProps('lion-eye1', 'black')} cx="375" cy="285" r="10" stroke="none" />
            <circle {...commonProps('lion-eye2', 'black')} cx="425" cy="285" r="10" stroke="none" />
            <polygon {...commonProps('lion-nose', '#FF6347')} points="400,310 390,320 410,320" />
            <path d="M 400 320 L 400 330" stroke="black" strokeWidth="2" fill="none" />
            <path d="M 400 330 Q 380 340 370 335" stroke="black" strokeWidth="2" fill="none" />
            <path d="M 400 330 Q 420 340 430 335" stroke="black" strokeWidth="2" fill="none" />
            <ellipse {...commonProps('lion-ear1', '#FFD700')} cx="340" cy="240" rx="25" ry="30" />
            <ellipse {...commonProps('lion-ear2', '#FFD700')} cx="460" cy="240" rx="25" ry="30" />
            <rect {...commonProps('lion-body', '#FFD700')} x="340" y="370" width="120" height="100" rx="20" />
            <rect {...commonProps('lion-leg1', '#FFA500')} x="350" y="460" width="25" height="80" rx="10" />
            <rect {...commonProps('lion-leg2', '#FFA500')} x="425" y="460" width="25" height="80" rx="10" />
          </svg>
        );

      // MUSICAL INSTRUMENTS
      case 'guitar':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('bg-guitar', '#FFF8DC')} x="0" y="0" width="800" height="600" stroke="none" />
            <ellipse {...commonProps('guitar-body-top', '#D2691E')} cx="400" cy="350" rx="120" ry="100" />
            <ellipse {...commonProps('guitar-body-bottom', '#CD853F')} cx="400" cy="430" rx="100" ry="80" />
            <circle {...commonProps('sound-hole', '#8B4513')} cx="400" cy="370" r="40" />
            <circle id="sound-hole-ring" cx="400" cy="370" r="50" fill="none" stroke="black" strokeWidth="3" />
            <rect {...commonProps('guitar-neck', '#A0522D')} x="380" y="50" width="40" height="280" />
            <rect {...commonProps('guitar-head', '#8B4513')} x="365" y="30" width="70" height="60" rx="10" />
            <rect {...commonProps('fret1', '#D3D3D3')} x="370" y="100" width="60" height="3" stroke="none" />
            <rect {...commonProps('fret2', '#D3D3D3')} x="370" y="140" width="60" height="3" stroke="none" />
            <rect {...commonProps('fret3', '#D3D3D3')} x="370" y="180" width="60" height="3" stroke="none" />
            <rect {...commonProps('fret4', '#D3D3D3')} x="370" y="220" width="60" height="3" stroke="none" />
            <rect {...commonProps('fret5', '#D3D3D3')} x="370" y="260" width="60" height="3" stroke="none" />
            <line x1="390" y1="50" x2="390" y2="450" stroke="black" strokeWidth="2" />
            <line x1="400" y1="50" x2="400" y2="450" stroke="black" strokeWidth="2" />
            <line x1="410" y1="50" x2="410" y2="450" stroke="black" strokeWidth="2" />
            <circle {...commonProps('peg1', '#FFD700')} cx="375" cy="50" r="8" />
            <circle {...commonProps('peg2', '#FFD700')} cx="400" cy="45" r="8" />
            <circle {...commonProps('peg3', '#FFD700')} cx="425" cy="50" r="8" />
            <circle {...commonProps('note1', 'black')} cx="600" cy="200" r="20" stroke="none" />
            <rect id="note1-stem" x="618" y="150" width="4" height="50" fill="black" stroke="none" />
            <circle {...commonProps('note2', 'black')} cx="650" cy="250" r="18" stroke="none" />
            <rect id="note2-stem" x="666" y="200" width="4" height="50" fill="black" stroke="none" />
          </svg>
        );

      case 'piano':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('bg-piano', '#F0F8FF')} x="0" y="0" width="800" height="600" stroke="none" />
            <rect {...commonProps('piano-body', '#8B4513')} x="150" y="250" width="500" height="200" rx="10" />
            <rect {...commonProps('piano-top', '#654321')} x="140" y="230" width="520" height="30" rx="5" />
            <rect {...commonProps('key-w1', 'white')} x="170" y="270" width="60" height="160" rx="3" />
            <rect {...commonProps('key-w2', 'white')} x="235" y="270" width="60" height="160" rx="3" />
            <rect {...commonProps('key-w3', 'white')} x="300" y="270" width="60" height="160" rx="3" />
            <rect {...commonProps('key-w4', 'white')} x="365" y="270" width="60" height="160" rx="3" />
            <rect {...commonProps('key-w5', 'white')} x="430" y="270" width="60" height="160" rx="3" />
            <rect {...commonProps('key-w6', 'white')} x="495" y="270" width="60" height="160" rx="3" />
            <rect {...commonProps('key-w7', 'white')} x="560" y="270" width="60" height="160" rx="3" />
            <rect {...commonProps('key-b1', 'black')} x="215" y="270" width="35" height="100" rx="3" stroke="none" />
            <rect {...commonProps('key-b2', 'black')} x="280" y="270" width="35" height="100" rx="3" stroke="none" />
            <rect {...commonProps('key-b3', 'black')} x="410" y="270" width="35" height="100" rx="3" stroke="none" />
            <rect {...commonProps('key-b4', 'black')} x="475" y="270" width="35" height="100" rx="3" stroke="none" />
            <rect {...commonProps('key-b5', 'black')} x="540" y="270" width="35" height="100" rx="3" stroke="none" />
            <rect {...commonProps('piano-leg1', '#654321')} x="180" y="450" width="20" height="100" />
            <rect {...commonProps('piano-leg2', '#654321')} x="390" y="450" width="20" height="100" />
            <rect {...commonProps('piano-leg3', '#654321')} x="600" y="450" width="20" height="100" />
            <circle {...commonProps('note-p1', '#FF1493')} cx="100" cy="150" r="15" />
            <circle {...commonProps('note-p2', '#9370DB')} cx="700" cy="180" r="18" />
          </svg>
        );

      case 'drum':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('bg-drum', '#F5F5DC')} x="0" y="0" width="800" height="600" stroke="none" />
            <ellipse {...commonProps('drum-top', '#FF0000')} cx="400" cy="250" rx="120" ry="40" />
            <rect {...commonProps('drum-body', '#DC143C')} x="280" y="250" width="240" height="180" />
            <ellipse {...commonProps('drum-bottom', '#B22222')} cx="400" cy="430" rx="120" ry="40" />
            <path {...commonProps('drum-stripe1', '#FFD700')} d="M 290 300 L 510 300 L 500 320 L 300 320 Z" />
            <path {...commonProps('drum-stripe2', '#FFD700')} d="M 295 370 L 505 370 L 495 390 L 305 390 Z" />
            <ellipse {...commonProps('drumstick1', '#DEB887')} cx="550" cy="200" rx="15" ry="60" transform="rotate(45 550 200)" />
            <circle {...commonProps('stick1-tip', '#F5DEB3')} cx="570" cy="180" r="12" />
            <ellipse {...commonProps('drumstick2', '#DEB887')} cx="600" cy="240" rx="15" ry="60" transform="rotate(60 600 240)" />
            <circle {...commonProps('stick2-tip', '#F5DEB3')} cx="625" cy="225" r="12" />
            <circle {...commonProps('note-d1', 'black')} cx="150" cy="200" r="20" stroke="none" />
            <circle {...commonProps('note-d2', 'black')} cx="200" cy="250" r="18" stroke="none" />
          </svg>
        );

      

      // VEHICLES
      case 'car':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('bg-car', '#87CEEB')} x="0" y="0" width="800" height="600" stroke="none" />
            <rect {...commonProps('road', '#696969')} x="0" y="450" width="800" height="150" stroke="none" />
            <rect {...commonProps('car-body', '#FF0000')} x="250" y="350" width="300" height="80" rx="10" />
            <path {...commonProps('car-cabin', '#DC143C')} d="M 300 350 L 320 280 L 480 280 L 500 350 Z" />
            <path {...commonProps('window-left', '#ADD8E6')} d="M 330 295 L 345 295 L 355 340 L 325 340 Z" />
            <path {...commonProps('window-right', '#ADD8E6')} d="M 445 295 L 470 295 L 475 340 L 465 340 Z" />
            <circle {...commonProps('wheel-left', 'black')} cx="310" cy="430" r="40" stroke="none" />
            <circle {...commonProps('wheel-left-inner', '#C0C0C0')} cx="310" cy="430" r="20" />
            <circle {...commonProps('wheel-right', 'black')} cx="490" cy="430" r="40" stroke="none" />
            <circle {...commonProps('wheel-right-inner', '#C0C0C0')} cx="490" cy="430" r="20" />
            <circle {...commonProps('headlight', '#FFFF00')} cx="540" cy="380" r="15" />
            <circle {...commonProps('sun-car', '#FFD700')} cx="700" cy="80" r="45" />
            <ellipse {...commonProps('cloud-car1', 'white')} cx="150" cy="100" rx="50" ry="30" />
            <ellipse {...commonProps('cloud-car2', 'white')} cx="650" cy="120" rx="45" ry="28" />
          </svg>
        );

      case 'rocket':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('space', '#000033')} x="0" y="0" width="800" height="600" stroke="none" />
            <circle {...commonProps('star-r1', 'white')} cx="100" cy="100" r="3" stroke="none" />
            <circle {...commonProps('star-r2', 'white')} cx="200" cy="150" r="4" stroke="none" />
            <circle {...commonProps('star-r3', 'white')} cx="650" cy="120" r="3" stroke="none" />
            <circle {...commonProps('star-r4', 'white')} cx="700" cy="200" r="5" stroke="none" />
            <circle {...commonProps('star-r5', 'white')} cx="150" cy="400" r="4" stroke="none" />
            <circle {...commonProps('star-r6', 'white')} cx="680" cy="450" r="3" stroke="none" />
            <rect {...commonProps('rocket-body', '#C0C0C0')} x="350" y="200" width="100" height="250" rx="10" />
            <polygon {...commonProps('rocket-nose', '#FF0000')} points="400,80 350,200 450,200" />
            <circle {...commonProps('rocket-window', '#ADD8E6')} cx="400" cy="260" r="30" />
            <circle {...commonProps('window-inner', '#87CEEB')} cx="400" cy="260" r="20" />
            <polygon {...commonProps('fin-left', '#FF4500')} points="350,380 300,450 350,450" />
            <polygon {...commonProps('fin-right', '#FF4500')} points="450,380 500,450 450,450" />
            <rect {...commonProps('stripe1', '#0000FF')} x="360" y="320" width="80" height="15" stroke="none" />
            <rect {...commonProps('stripe2', '#0000FF')} x="360" y="350" width="80" height="15" stroke="none" />
            <ellipse {...commonProps('fire1', '#FF4500')} cx="400" cy="470" rx="35" ry="25" />
            <ellipse {...commonProps('fire2', '#FFA500')} cx="400" cy="490" rx="30" ry="20" />
            <ellipse {...commonProps('fire3', '#FFD700')} cx="400" cy="505" rx="25" ry="18" />
            <circle {...commonProps('planet', '#9370DB')} cx="650" cy="350" r="60" />
            <ellipse {...commonProps('planet-ring', '#BA55D3')} cx="650" cy="350" rx="90" ry="20" fill="none" strokeWidth="4" />
          </svg>
        );

      // NATURE
      case 'flower':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('sky-f', '#87CEEB')} x="0" y="0" width="800" height="450" stroke="none" />
            <circle {...commonProps('sun-f', '#FFD700')} cx="700" cy="100" r="50" />
            <rect {...commonProps('ground-f', '#90EE90')} x="0" y="450" width="800" height="150" stroke="none" />
            <rect {...commonProps('main-stem', '#228B22')} x="390" y="250" width="20" height="250" />
            <ellipse {...commonProps('leaf1', '#32CD32')} cx="320" cy="350" rx="50" ry="30" transform="rotate(-45 320 350)" />
            <ellipse {...commonProps('leaf2', '#32CD32')} cx="480" cy="380" rx="50" ry="30" transform="rotate(45 480 380)" />
            <circle {...commonProps('flower-center', '#FFD700')} cx="400" cy="200" r="40" />
            <ellipse {...commonProps('petal1', '#FF69B4')} cx="400" cy="120" rx="35" ry="55" />
            <ellipse {...commonProps('petal2', '#FF1493')} cx="470" cy="150" rx="35" ry="55" transform="rotate(45 470 150)" />
            <ellipse {...commonProps('petal3', '#FF69B4')} cx="485" cy="220" rx="35" ry="55" transform="rotate(90 485 220)" />
            <ellipse {...commonProps('petal4', '#FF1493')} cx="470" cy="290" rx="35" ry="55" transform="rotate(135 470 290)" />
            <ellipse {...commonProps('petal5', '#FF69B4')} cx="400" cy="315" rx="35" ry="55" transform="rotate(180 400 315)" />
            <ellipse {...commonProps('petal6', '#FF1493')} cx="330" cy="290" rx="35" ry="55" transform="rotate(225 330 290)" />
            <ellipse {...commonProps('petal7', '#FF69B4')} cx="315" cy="220" rx="35" ry="55" transform="rotate(270 315 220)" />
            <ellipse {...commonProps('petal8', '#FF1493')} cx="330" cy="150" rx="35" ry="55" transform="rotate(315 330 150)" />
            <ellipse {...commonProps('bfly-body', 'black')} cx="600" cy="280" rx="6" ry="25" stroke="none" />
            <circle {...commonProps('bfly-head', 'black')} cx="600" cy="260" r="8" stroke="none" />
            <ellipse {...commonProps('bfly-wing1', '#9370DB')} cx="580" cy="275" rx="25" ry="20" />
            <ellipse {...commonProps('bfly-wing2', '#9370DB')} cx="620" cy="275" rx="25" ry="20" />
          </svg>
        );

      case 'tree':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('sky-tree', '#87CEEB')} x="0" y="0" width="800" height="450" stroke="none" />
            <rect {...commonProps('ground-tree', '#90EE90')} x="0" y="450" width="800" height="150" stroke="none" />
            <rect {...commonProps('tree-trunk', '#8B4513')} x="360" y="300" width="80" height="200" />
            <circle {...commonProps('tree-leaves1', '#228B22')} cx="400" cy="280" r="100" />
            <circle {...commonProps('tree-leaves2', '#32CD32')} cx="350" cy="220" r="80" />
            <circle {...commonProps('tree-leaves3', '#228B22')} cx="450" cy="220" r="80" />
            <circle {...commonProps('tree-leaves4', '#2E8B57')} cx="400" cy="180" r="70" />
            <circle {...commonProps('apple1', '#FF0000')} cx="370" cy="250" r="15" />
            <circle {...commonProps('apple2', '#FF0000')} cx="430" cy="270" r="15" />
            <circle {...commonProps('apple3', '#FF0000')} cx="400" cy="220" r="15" />
            <circle {...commonProps('sun-tree', '#FFD700')} cx="700" cy="100" r="50" />
            <path {...commonProps('bird', '#FF6347')} d="M 150 180 Q 160 170 170 180 Q 180 170 190 180" fill="none" strokeWidth="3" />
            <circle id="bird-body" cx="170" cy="185" r="8" fill="#FF6347" stroke="black" strokeWidth="2" />
          </svg>
        );

      // MORE ANIMALS
      case 'sheep':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <path {...commonProps('mountain1', '#A9A9A9')} d="M 50 350 Q 150 200 250 350 Z" />
            <path {...commonProps('mountain2', '#808080')} d="M 200 350 Q 350 180 500 350 Z" />
            <path {...commonProps('mountain3', '#A9A9A9')} d="M 450 350 Q 600 220 750 350 Z" />
            <ellipse {...commonProps('cloud1', 'white')} cx="150" cy="100" rx="40" ry="25" />
            <ellipse {...commonProps('cloud1b', 'white')} cx="180" cy="100" rx="35" ry="25" />
            <circle {...commonProps('sun', '#FFD700')} cx="700" cy="80" r="40" />
            <rect {...commonProps('ground', '#90EE90')} x="0" y="350" width="800" height="250" stroke="none" />
            <ellipse {...commonProps('wool-body', 'white')} cx="400" cy="380" rx="100" ry="80" />
            <circle {...commonProps('wool-top', 'white')} cx="370" cy="330" r="45" />
            <circle {...commonProps('wool-back', 'white')} cx="450" cy="360" r="40" />
            <circle {...commonProps('wool-front', 'white')} cx="350" cy="380" r="38" />
            <ellipse {...commonProps('head', '#FFB6C1')} cx="310" cy="350" rx="35" ry="40" />
            <ellipse id="nose" cx="295" cy="360" rx="8" ry="6" fill="black" stroke="none" />
            <ellipse {...commonProps('ear', '#FFB6C1')} cx="320" cy="325" rx="12" ry="20" />
            <rect id="leg1" x="360" y="440" width="15" height="60" rx="7" fill="black" stroke="none" />
            <rect id="leg2" x="390" y="440" width="15" height="60" rx="7" fill="black" stroke="none" />
            <rect id="leg3" x="420" y="440" width="15" height="60" rx="7" fill="black" stroke="none" />
            <rect id="leg4" x="450" y="440" width="15" height="60" rx="7" fill="black" stroke="none" />
          </svg>
        );

      case 'fish':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('water', '#00BFFF')} x="0" y="0" width="800" height="600" stroke="none" />
            <circle {...commonProps('bubble1', '#B0E0E6')} cx="150" cy="100" r="20" />
            <circle {...commonProps('bubble2', '#B0E0E6')} cx="180" cy="150" r="15" />
            <circle {...commonProps('bubble3', '#B0E0E6')} cx="600" cy="120" r="22" />
            <ellipse {...commonProps('fish-body', '#FFA500')} cx="400" cy="300" rx="120" ry="80" />
            <polygon {...commonProps('tail', '#FF8C00')} points="520,300 600,250 600,350" />
            <polygon {...commonProps('top-fin', '#FF8C00')} points="380,220 400,170 420,220" />
            <polygon {...commonProps('bottom-fin', '#FF8C00')} points="380,380 400,430 420,380" />
            <ellipse {...commonProps('side-fin', '#FF8C00')} cx="350" cy="320" rx="40" ry="25" transform="rotate(-30 350 320)" />
            <circle {...commonProps('fish-eye-white', 'white')} cx="330" cy="280" r="20" stroke="none" />
            <circle id="fish-pupil" cx="330" cy="280" r="8" fill="black" stroke="none" />
            <ellipse {...commonProps('mouth', '#FF6347')} cx="290" cy="300" rx="15" ry="10" />
            <circle {...commonProps('scale1', '#FFD700')} cx="380" cy="280" r="12" />
            <circle {...commonProps('scale2', '#FFD700')} cx="400" cy="300" r="12" />
            <circle {...commonProps('scale3', '#FFD700')} cx="420" cy="280" r="12" />
            <ellipse {...commonProps('seaweed1', '#228B22')} cx="100" cy="450" rx="20" ry="150" />
            <ellipse {...commonProps('seaweed2', '#2E8B57')} cx="700" cy="480" rx="18" ry="120" />
          </svg>
        );

      case 'butterfly':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('sky', '#87CEEB')} x="0" y="0" width="800" height="400" stroke="none" />
            <circle {...commonProps('sun-b', '#FFD700')} cx="650" cy="100" r="50" />
            <rect {...commonProps('ground-b', '#90EE90')} x="0" y="400" width="800" height="200" stroke="none" />
            <circle {...commonProps('flower1', '#FF69B4')} cx="150" cy="450" r="20" />
            <circle {...commonProps('flower1-center', '#FFD700')} cx="150" cy="450" r="8" />
            <circle {...commonProps('flower2', '#FF1493')} cx="650" cy="480" r="25" />
            <circle {...commonProps('flower2-center', '#FFD700')} cx="650" cy="480" r="10" />
            <ellipse id="butterfly-body" cx="400" cy="300" rx="12" ry="60" fill="black" stroke="none" />
            <circle id="butterfly-head" cx="400" cy="250" r="18" fill="black" stroke="none" />
            <ellipse {...commonProps('wing-lu', '#FF69B4')} cx="320" cy="270" rx="80" ry="70" />
            <circle {...commonProps('wing-lu-spot1', '#FFD700')} cx="310" cy="260" r="15" />
            <ellipse {...commonProps('wing-ll', '#9932CC')} cx="330" cy="350" rx="60" ry="55" />
            <ellipse {...commonProps('wing-ru', '#FF69B4')} cx="480" cy="270" rx="80" ry="70" />
            <circle {...commonProps('wing-ru-spot1', '#FFD700')} cx="490" cy="260" r="15" />
            <ellipse {...commonProps('wing-rl', '#9932CC')} cx="470" cy="350" rx="60" ry="55" />
          </svg>
        );

      case 'house':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('sky-h', '#87CEEB')} x="0" y="0" width="800" height="420" stroke="none" />
            <circle {...commonProps('sun-h', '#FFD700')} cx="150" cy="100" r="45" />
            <rect {...commonProps('ground-h', '#90EE90')} x="0" y="420" width="800" height="180" stroke="none" />
            <rect {...commonProps('house-base', '#D2691E')} x="250" y="280" width="300" height="220" />
            <polygon {...commonProps('roof', '#8B0000')} points="240,280 400,150 560,280" />
            <rect {...commonProps('chimney', '#A0522D')} x="450" y="180" width="40" height="100" />
            <circle {...commonProps('smoke1', '#C0C0C0')} cx="470" cy="150" r="12" />
            <circle {...commonProps('smoke2', '#C0C0C0')} cx="475" cy="130" r="15" />
            <rect {...commonProps('door', '#8B4513')} x="360" y="380" width="80" height="120" rx="40" />
            <circle id="doorknob" cx="420" cy="440" r="6" fill="#FFD700" stroke="black" strokeWidth="2" />
            <rect {...commonProps('window1', '#ADD8E6')} x="280" y="320" width="60" height="60" />
            <rect {...commonProps('window2', '#ADD8E6')} x="460" y="320" width="60" height="60" />
            <rect {...commonProps('trunk', '#8B4513')} x="650" y="360" width="30" height="80" />
            <circle {...commonProps('leaves1', '#228B22')} cx="665" cy="340" r="40" />
          </svg>
        );

      // NEW BEAUTIFUL DRAWINGS
      case 'unicorn':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('bg-unicorn', '#FFE4F8')} x="0" y="0" width="800" height="600" stroke="none" />
            <ellipse {...commonProps('uni-body', 'white')} cx="400" cy="380" rx="130" ry="90" />
            <circle {...commonProps('uni-head', '#F8F8FF')} cx="270" cy="300" r="70" />
            <ellipse {...commonProps('uni-snout', 'white')} cx="220" cy="320" rx="30" ry="25" />
            <circle {...commonProps('uni-eye', 'black')} cx="260" cy="290" r="10" stroke="none" />
            <circle {...commonProps('uni-eye-shine', 'white')} cx="263" cy="287" r="4" stroke="none" />
            <ellipse {...commonProps('uni-ear', '#FFB6C1')} cx="250" cy="250" rx="15" ry="30" />
            <ellipse {...commonProps('uni-ear2', '#FFB6C1')} cx="290" cy="250" rx="15" ry="30" />
            <polygon {...commonProps('uni-horn', '#FFD700')} points="270,200 260,250 280,250" />
            <path {...commonProps('uni-mane1', '#FF69B4')} d="M 240 240 Q 220 220 210 260" strokeWidth={8} />
            <path {...commonProps('uni-mane2', '#9370DB')} d="M 250 230 Q 230 210 215 250" strokeWidth={8} />
            <path {...commonProps('uni-mane3', '#87CEEB')} d="M 260 225 Q 240 205 220 245" strokeWidth={8} />
            <rect {...commonProps('uni-leg1', 'white')} x="340" y="440" width="30" height="100" rx="15" />
            <rect {...commonProps('uni-leg2', 'white')} x="390" y="440" width="30" height="100" rx="15" />
            <rect {...commonProps('uni-leg3', 'white')} x="440" y="440" width="30" height="100" rx="15" />
            <circle {...commonProps('star-uni1', '#FFD700')} cx="600" cy="150" r="20" />
            <circle {...commonProps('star-uni2', '#FF69B4')} cx="150" cy="180" r="18" />
            <circle {...commonProps('star-uni3', '#9370DB')} cx="700" cy="250" r="22" />
            <path {...commonProps('uni-tail', '#FF1493')} d="M 520 370 Q 580 350 600 400 Q 620 350 580 320" strokeWidth={10} />
          </svg>
        );

      case 'icecream':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('bg-ice', '#FFF8DC')} x="0" y="0" width="800" height="600" stroke="none" />
            <polygon {...commonProps('cone', '#D2691E')} points="400,450 320,250 480,250" />
            <path d="M 340 280 L 460 280" stroke="black" strokeWidth="2" fill="none" />
            <path d="M 350 320 L 450 320" stroke="black" strokeWidth="2" fill="none" />
            <path d="M 360 360 L 440 360" stroke="black" strokeWidth="2" fill="none" />
            <path d="M 370 400 L 430 400" stroke="black" strokeWidth="2" fill="none" />
            <circle {...commonProps('scoop1', '#FFB6C1')} cx="400" cy="230" r="60" />
            <circle {...commonProps('scoop2', '#87CEEB')} cx="360" cy="180" r="55" />
            <circle {...commonProps('scoop3', '#FFD700')} cx="440" cy="180" r="55" />
            <circle {...commonProps('cherry', '#FF0000')} cx="400" cy="130" r="20" />
            <rect {...commonProps('cherry-stem', '#8B4513')} x="398" y="110" width="4" height="20" />
            <circle {...commonProps('sprinkle1', '#FF1493')} cx="370" cy="200" r="4" stroke="none" />
            <circle {...commonProps('sprinkle2', '#00FF00')} cx="390" cy="210" r="4" stroke="none" />
            <circle {...commonProps('sprinkle3', '#0000FF')} cx="410" cy="195" r="4" stroke="none" />
            <circle {...commonProps('sprinkle4', '#FFD700')} cx="430" cy="215" r="4" stroke="none" />
            <circle {...commonProps('sprinkle5', '#FF6347')} cx="380" cy="230" r="4" stroke="none" />
            <circle {...commonProps('sun-ice', '#FFD700')} cx="650" cy="120" r="50" />
          </svg>
        );

      case 'cupcake':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('bg-cup', '#FFF5EE')} x="0" y="0" width="800" height="600" stroke="none" />
            <path {...commonProps('cup-wrapper', '#FF69B4')} d="M 280 350 L 300 450 L 500 450 L 520 350 Z" />
            <path d="M 300 380 L 500 380" stroke="black" strokeWidth="2" fill="none" />
            <path d="M 305 410 L 495 410" stroke="black" strokeWidth="2" fill="none" />
            <ellipse {...commonProps('frosting-base', '#FFB6C1')} cx="400" cy="350" rx="120" ry="50" />
            <path {...commonProps('frosting-swirl', '#FF1493')} d="M 350 350 Q 360 300 380 320 Q 400 280 420 320 Q 440 300 450 350" strokeWidth={15} />
            <circle {...commonProps('cherry-cup', '#FF0000')} cx="400" cy="270" r="18" />
            <rect {...commonProps('cherry-stem-cup', '#8B4513')} x="398" y="250" width="4" height="20" />
            <circle {...commonProps('sprink-c1', '#FFD700')} cx="370" cy="330" r="5" stroke="none" />
            <circle {...commonProps('sprink-c2', '#00BFFF')} cx="390" cy="340" r="5" stroke="none" />
            <circle {...commonProps('sprink-c3', '#FF6347')} cx="410" cy="335" r="5" stroke="none" />
            <circle {...commonProps('sprink-c4', '#9370DB')} cx="430" cy="345" r="5" stroke="none" />
            <polygon {...commonProps('star-cup1', '#FFD700')} points="600,200 610,220 632,223 614,240 618,262 600,250 582,262 586,240 568,223 590,220" />
            <polygon {...commonProps('star-cup2', '#FF69B4')} points="200,250 208,268 228,270 214,284 217,304 200,294 183,304 186,284 172,270 192,268" />
          </svg>
        );

     

      case 'cat':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('bg-cat', '#FFF8DC')} x="0" y="0" width="800" height="600" stroke="none" />
            <ellipse {...commonProps('cat-body', '#FF8C00')} cx="400" cy="380" rx="110" ry="85" />
            <circle {...commonProps('cat-head', '#FFA500')} cx="400" cy="280" r="65" />
            <polygon {...commonProps('cat-ear-left', '#FF8C00')} points="350,230 360,200 375,235" />
            <polygon {...commonProps('cat-ear-right', '#FF8C00')} points="425,235 440,200 450,230" />
            <polygon {...commonProps('cat-ear-inner1', '#FFB6C1')} points="358,225 365,210 370,228" />
            <polygon {...commonProps('cat-ear-inner2', '#FFB6C1')} points="430,228 435,210 442,225" />
            <ellipse {...commonProps('cat-eye1', '#32CD32')} cx="380" cy="275" rx="12" ry="18" />
            <ellipse {...commonProps('cat-eye2', '#32CD32')} cx="420" cy="275" rx="12" ry="18" />
            <circle id="cat-pupil1" cx="380" cy="275" r="6" fill="black" stroke="none" />
            <circle id="cat-pupil2" cx="420" cy="275" r="6" fill="black" stroke="none" />
            <polygon {...commonProps('cat-nose', '#FF69B4')} points="400,290 395,300 405,300" />
            <path d="M 400 300 L 400 310" stroke="black" strokeWidth="2" fill="none" />
            <path d="M 400 310 Q 380 320 370 315" stroke="black" strokeWidth="2" fill="none" />
            <path d="M 400 310 Q 420 320 430 315" stroke="black" strokeWidth="2" fill="none" />
            <path d="M 340 280 L 320 275" stroke="black" strokeWidth="2" fill="none" />
            <path d="M 340 285 L 320 285" stroke="black" strokeWidth="2" fill="none" />
            <path d="M 340 290 L 320 295" stroke="black" strokeWidth="2" fill="none" />
            <path d="M 460 280 L 480 275" stroke="black" strokeWidth="2" fill="none" />
            <path d="M 460 285 L 480 285" stroke="black" strokeWidth="2" fill="none" />
            <path d="M 460 290 L 480 295" stroke="black" strokeWidth="2" fill="none" />
            <rect {...commonProps('cat-leg1', '#FF8C00')} x="350" y="440" width="25" height="80" rx="12" />
            <rect {...commonProps('cat-leg2', '#FF8C00')} x="425" y="440" width="25" height="80" rx="12" />
            <path {...commonProps('cat-tail', '#FFA500')} d="M 500 370 Q 580 340 600 280" strokeWidth={18} />
            <circle {...commonProps('yarn-ball', '#FF1493')} cx="600" cy="450" r="40" />
            <path d="M 570 440 Q 600 450 630 445" stroke="black" strokeWidth="2" fill="none" />
            <path d="M 580 430 Q 600 440 620 435" stroke="black" strokeWidth="2" fill="none" />
          </svg>
        );

      case 'rabbit':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('bg-rabbit', '#E8F5E9')} x="0" y="0" width="800" height="600" stroke="none" />
            <rect {...commonProps('ground-rab', '#90EE90')} x="0" y="450" width="800" height="150" stroke="none" />
            <ellipse {...commonProps('rabbit-body', 'white')} cx="400" cy="380" rx="100" ry="90" />
            <circle {...commonProps('rabbit-head', '#F5F5F5')} cx="400" cy="270" r="70" />
            <ellipse {...commonProps('ear-left', 'white')} cx="370" cy="190" rx="20" ry="70" />
            <ellipse {...commonProps('ear-left-in', '#FFB6C1')} cx="370" cy="195" rx="12" ry="50" />
            <ellipse {...commonProps('ear-right', 'white')} cx="430" cy="190" rx="20" ry="70" />
            <ellipse {...commonProps('ear-right-in', '#FFB6C1')} cx="430" cy="195" rx="12" ry="50" />
            <circle {...commonProps('rabbit-eye1', 'black')} cx="380" cy="265" r="8" stroke="none" />
            <circle {...commonProps('rabbit-eye2', 'black')} cx="420" cy="265" r="8" stroke="none" />
            <circle {...commonProps('rabbit-nose', '#FF69B4')} cx="400" cy="285" r="8" />
            <path d="M 400 293 L 400 303" stroke="black" strokeWidth="2" fill="none" />
            <path d="M 400 303 Q 385 310 375 308" stroke="black" strokeWidth="2" fill="none" />
            <path d="M 400 303 Q 415 310 425 308" stroke="black" strokeWidth="2" fill="none" />
            <path d="M 365 275 L 345 270" stroke="black" strokeWidth="2" fill="none" />
            <path d="M 365 280 L 345 280" stroke="black" strokeWidth="2" fill="none" />
            <path d="M 435 275 L 455 270" stroke="black" strokeWidth="2" fill="none" />
            <path d="M 435 280 L 455 280" stroke="black" strokeWidth="2" fill="none" />
            <rect {...commonProps('rabbit-leg1', '#F5F5F5')} x="360" y="440" width="30" height="70" rx="15" />
            <rect {...commonProps('rabbit-leg2', '#F5F5F5')} x="410" y="440" width="30" height="70" rx="15" />
            <circle {...commonProps('rabbit-tail', 'white')} cx="480" cy="390" r="30" />
            <circle {...commonProps('carrot', '#FF8C00')} cx="600" cy="480" r="15" />
            <path {...commonProps('carrot-body', '#FFA500')} d="M 600 465 L 590 490 L 610 490 Z" />
            <path {...commonProps('carrot-top1', '#228B22')} d="M 595 465 L 590 450" strokeWidth={3} />
            <path {...commonProps('carrot-top2', '#228B22')} d="M 600 465 L 600 445" strokeWidth={3} />
            <path {...commonProps('carrot-top3', '#228B22')} d="M 605 465 L 610 450" strokeWidth={3} />
          </svg>
        );

      case 'bear':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('bg-bear', '#8B4513')} x="0" y="0" width="800" height="600" stroke="none" />
            <ellipse {...commonProps('bear-body', '#CD853F')} cx="400" cy="400" rx="140" ry="110" />
            <circle {...commonProps('bear-head', '#D2691E')} cx="400" cy="270" r="85" />
            <circle {...commonProps('bear-ear1', '#A0522D')} cx="340" cy="210" r="35" />
            <circle {...commonProps('bear-ear1-in', '#DEB887')} cx="340" cy="215" r="20" />
            <circle {...commonProps('bear-ear2', '#A0522D')} cx="460" cy="210" r="35" />
            <circle {...commonProps('bear-ear2-in', '#DEB887')} cx="460" cy="215" r="20" />
            <ellipse {...commonProps('bear-snout', '#DEB887')} cx="400" cy="300" rx="45" ry="38" />
            <ellipse {...commonProps('bear-nose', 'black')} cx="400" cy="295" rx="18" ry="12" stroke="none" />
            <path d="M 400 307 L 400 320" stroke="black" strokeWidth="3" fill="none" />
            <path d="M 400 320 Q 385 330 375 325" stroke="black" strokeWidth="2" fill="none" />
            <path d="M 400 320 Q 415 330 425 325" stroke="black" strokeWidth="2" fill="none" />
            <circle {...commonProps('bear-eye1', 'black')} cx="370" cy="260" r="10" stroke="none" />
            <circle {...commonProps('bear-eye2', 'black')} cx="430" cy="260" r="10" stroke="none" />
            <rect {...commonProps('bear-leg1', '#A0522D')} x="330" y="480" width="40" height="90" rx="20" />
            <rect {...commonProps('bear-leg2', '#A0522D')} x="430" y="480" width="40" height="90" rx="20" />
            <ellipse {...commonProps('bear-paw1', '#DEB887')} cx="350" cy="565" rx="25" ry="15" />
            <ellipse {...commonProps('bear-paw2', '#DEB887')} cx="450" cy="565" rx="25" ry="15" />
            <circle {...commonProps('honey-jar', '#FFD700')} cx="600" cy="450" r="45" />
            <rect {...commonProps('honey-label', 'white')} x="575" y="440" width="50" height="20" />
            <circle {...commonProps('bee', '#FFD700')} cx="200" cy="200" r="15" />
            <ellipse {...commonProps('bee-wing', 'white')} cx="195" cy="195" rx="10" ry="15" opacity="0.7" />
          </svg>
        );

      case 'sun':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('bg-sun', '#87CEEB')} x="0" y="0" width="800" height="600" stroke="none" />
            <circle {...commonProps('sun-center', '#FFD700')} cx="400" cy="300" r="100" />
            <circle {...commonProps('sun-inner', '#FFA500')} cx="400" cy="300" r="75" />
            <circle {...commonProps('sun-face', '#FFD700')} cx="400" cy="300" r="60" />
            <circle {...commonProps('sun-eye1', 'black')} cx="380" cy="285" r="8" stroke="none" />
            <circle {...commonProps('sun-eye2', 'black')} cx="420" cy="285" r="8" stroke="none" />
            <path d="M 375 320 Q 400 335 425 320" stroke="black" strokeWidth="4" fill="none" />
            <circle {...commonProps('sun-cheek1', '#FF69B4')} cx="360" cy="310" r="12" />
            <circle {...commonProps('sun-cheek2', '#FF69B4')} cx="440" cy="310" r="12" />
            <polygon {...commonProps('ray1', '#FFA500')} points="400,150 380,180 420,180" />
            <polygon {...commonProps('ray2', '#FFA500')} points="510,210 490,230 510,250" />
            <polygon {...commonProps('ray3', '#FFA500')} points="550,300 520,290 520,310" />
            <polygon {...commonProps('ray4', '#FFA500')} points="510,390 490,370 510,350" />
            <polygon {...commonProps('ray5', '#FFA500')} points="400,450 380,420 420,420" />
            <polygon {...commonProps('ray6', '#FFA500')} points="290,390 310,370 290,350" />
            <polygon {...commonProps('ray7', '#FFA500')} points="250,300 280,290 280,310" />
            <polygon {...commonProps('ray8', '#FFA500')} points="290,210 310,230 290,250" />
          </svg>
        );

      case 'moon':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('bg-moon', '#000033')} x="0" y="0" width="800" height="600" stroke="none" />
            <circle {...commonProps('star-m1', 'white')} cx="150" cy="120" r="4" stroke="none" />
            <circle {...commonProps('star-m2', 'white')} cx="250" cy="80" r="3" stroke="none" />
            <circle {...commonProps('star-m3', 'white')} cx="600" cy="150" r="5" stroke="none" />
            <circle {...commonProps('star-m4', 'white')} cx="700" cy="100" r="4" stroke="none" />
            <circle {...commonProps('star-m5', 'white')} cx="200" cy="450" r="3" stroke="none" />
            <circle {...commonProps('star-m6', 'white')} cx="650" cy="480" r="4" stroke="none" />
            <circle {...commonProps('moon-full', '#FFD700')} cx="400" cy="300" r="120" />
            <circle {...commonProps('moon-shadow', '#000033')} cx="450" cy="280" r="100" />
            <circle {...commonProps('crater1', '#C0C0C0')} cx="380" cy="280" r="20" />
            <circle {...commonProps('crater2', '#A9A9A9')} cx="420" cy="320" r="15" />
            <circle {...commonProps('crater3', '#C0C0C0')} cx="390" cy="340" r="18" />
            <circle {...commonProps('crater4', '#A9A9A9')} cx="360" cy="310" r="12" />
          </svg>
        );

      case 'rainbow':
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect {...commonProps('bg-rainbow', '#87CEEB')} x="0" y="0" width="800" height="600" stroke="none" />
            <rect {...commonProps('ground-rain', '#90EE90')} x="0" y="450" width="800" height="150" stroke="none" />
            <path {...commonProps('rainbow-red', '#FF0000')} d="M 100 450 Q 400 100 700 450" fill="none" strokeWidth="40" />
            <path {...commonProps('rainbow-orange', '#FFA500')} d="M 100 450 Q 400 130 700 450" fill="none" strokeWidth="40" />
            <path {...commonProps('rainbow-yellow', '#FFD700')} d="M 100 450 Q 400 160 700 450" fill="none" strokeWidth="40" />
            <path {...commonProps('rainbow-green', '#00FF00')} d="M 100 450 Q 400 190 700 450" fill="none" strokeWidth="40" />
            <path {...commonProps('rainbow-blue', '#0000FF')} d="M 100 450 Q 400 220 700 450" fill="none" strokeWidth="40" />
            <path {...commonProps('rainbow-purple', '#9370DB')} d="M 100 450 Q 400 250 700 450" fill="none" strokeWidth="40" />
            <circle {...commonProps('cloud-rain1', 'white')} cx="150" cy="200" r="40" />
            <circle {...commonProps('cloud-rain2', 'white')} cx="185" cy="200" r="35" />
            <circle {...commonProps('cloud-rain3', 'white')} cx="167" cy="175" r="32" />
            <circle {...commonProps('cloud-rain4', 'white')} cx="650" cy="220" r="45" />
            <circle {...commonProps('cloud-rain5', 'white')} cx="690" cy="220" r="40" />
            <circle {...commonProps('cloud-rain6', 'white')} cx="670" cy="195" r="35" />
            <circle {...commonProps('sun-rain', '#FFD700')} cx="100" cy="100" r="50" />
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 800 600" className="colorir-svg">
            <rect fill="#E3F2FD" x="0" y="0" width="800" height="600" stroke="none" />
            <text x="400" y="300" fontSize="32" fontWeight="bold" fill="#4A90E2" textAnchor="middle">
              Selecione um desenho!
            </text>
          </svg>
        );
    }
  };

  return (
    <div className="colorir-container">
      <div className="colorir-main">
        <header className="colorir-header">
          <button className="colorir-back-button" onClick={goBack} aria-label="Voltar">
            <ArrowLeft size={24} />
          </button>
          <button 
            className="colorir-sound-button" 
            onClick={speakText}
            aria-label={isSpeaking ? "Parar leitura" : "Ouvir instruções"}
            title={isSpeaking ? "Parar leitura" : "Ouvir instruções"}
          >
            {isSpeaking ? <VolumeX size={28} /> : <Volume2 size={28} />}
          </button>
          <div className="colorir-header-content">
            <img src={dentinhoImage} alt="Mascote Dentinho" className="colorir-mascot" />
            <div className="colorir-header-text">
              <h1 className="colorir-title">ÁREA DE COLORIR AFFECTUS</h1>
              <p className="colorir-subtitle">ESCOLHA A IMAGEM, SELECIONE A COR E PREENCHA AS ÁREAS PARA CRIAR SUA OBRA DE ARTE! 🎨</p>
            </div>
            <img src={soniccolorir} alt="Mascote Sonic" className="colorir-mascot" />
          </div>
        </header>

        <div className="colorir-drawings-section">
          <h2 className="colorir-section-title">Desenhos</h2>
          <div className="colorir-drawings-grid">
           
           
            <div className={`colorir-drawing-card ${currentDrawing === 'letterA' ? 'active' : ''}`} onClick={() => { setCurrentDrawing('letterA'); clearCanvas(); }}>
              <div className="colorir-drawing-emoji">🔤</div>
              <span className="colorir-drawing-name">Letra A</span>
            </div>
            <div className={`colorir-drawing-card ${currentDrawing === 'letterB' ? 'active' : ''}`} onClick={() => { setCurrentDrawing('letterB'); clearCanvas(); }}>
              <div className="colorir-drawing-emoji">🔤</div>
              <span className="colorir-drawing-name">Letra B</span>
            </div>
            <div className={`colorir-drawing-card ${currentDrawing === 'letterC' ? 'active' : ''}`} onClick={() => { setCurrentDrawing('letterC'); clearCanvas(); }}>
              <div className="colorir-drawing-emoji">🔤</div>
              <span className="colorir-drawing-name">Letra C</span>
            </div>
            
          
            <div className={`colorir-drawing-card ${currentDrawing === 'lion' ? 'active' : ''}`} onClick={() => { setCurrentDrawing('lion'); clearCanvas(); }}>
              <div className="colorir-drawing-emoji">🦁</div>
              <span className="colorir-drawing-name">Leão</span>
            </div>
           
            <div className={`colorir-drawing-card ${currentDrawing === 'fish' ? 'active' : ''}`} onClick={() => { setCurrentDrawing('fish'); clearCanvas(); }}>
              <div className="colorir-drawing-emoji">🐠</div>
              <span className="colorir-drawing-name">Peixe</span>
            </div>
            <div className={`colorir-drawing-card ${currentDrawing === 'butterfly' ? 'active' : ''}`} onClick={() => { setCurrentDrawing('butterfly'); clearCanvas(); }}>
              <div className="colorir-drawing-emoji">🦋</div>
              <span className="colorir-drawing-name">Borboleta</span>
            </div>
            <div className={`colorir-drawing-card ${currentDrawing === 'guitar' ? 'active' : ''}`} onClick={() => { setCurrentDrawing('guitar'); clearCanvas(); }}>
              <div className="colorir-drawing-emoji">🎸</div>
              <span className="colorir-drawing-name">Violão</span>
            </div>
            <div className={`colorir-drawing-card ${currentDrawing === 'piano' ? 'active' : ''}`} onClick={() => { setCurrentDrawing('piano'); clearCanvas(); }}>
              <div className="colorir-drawing-emoji">🎹</div>
              <span className="colorir-drawing-name">Piano</span>
            </div>
            <div className={`colorir-drawing-card ${currentDrawing === 'car' ? 'active' : ''}`} onClick={() => { setCurrentDrawing('car'); clearCanvas(); }}>
              <div className="colorir-drawing-emoji">🚗</div>
              <span className="colorir-drawing-name">Carro</span>
            </div>
            <div className={`colorir-drawing-card ${currentDrawing === 'rocket' ? 'active' : ''}`} onClick={() => { setCurrentDrawing('rocket'); clearCanvas(); }}>
              <div className="colorir-drawing-emoji">🚀</div>
              <span className="colorir-drawing-name">Foguete</span>
            </div>
           
            <div className={`colorir-drawing-card ${currentDrawing === 'tree' ? 'active' : ''}`} onClick={() => { setCurrentDrawing('tree'); clearCanvas(); }}>
              <div className="colorir-drawing-emoji">🌳</div>
              <span className="colorir-drawing-name">Árvore</span>
            </div>
            <div className={`colorir-drawing-card ${currentDrawing === 'house' ? 'active' : ''}`} onClick={() => { setCurrentDrawing('house'); clearCanvas(); }}>
              <div className="colorir-drawing-emoji">🏠</div>
              <span className="colorir-drawing-name">Casa</span>
            </div>
          

            
            <div className={`colorir-drawing-card ${currentDrawing === 'cat' ? 'active' : ''}`} onClick={() => { setCurrentDrawing('cat'); clearCanvas(); }}>
              <div className="colorir-drawing-emoji">🐱</div>
              <span className="colorir-drawing-name">Gato</span>
            </div>
            <div className={`colorir-drawing-card ${currentDrawing === 'rabbit' ? 'active' : ''}`} onClick={() => { setCurrentDrawing('rabbit'); clearCanvas(); }}>
              <div className="colorir-drawing-emoji">🐰</div>
              <span className="colorir-drawing-name">Coelho</span>
            </div>
            <div className={`colorir-drawing-card ${currentDrawing === 'bear' ? 'active' : ''}`} onClick={() => { setCurrentDrawing('bear'); clearCanvas(); }}>
              <div className="colorir-drawing-emoji">🐻</div>
              <span className="colorir-drawing-name">Urso</span>
            </div>
            <div className={`colorir-drawing-card ${currentDrawing === 'sun' ? 'active' : ''}`} onClick={() => { setCurrentDrawing('sun'); clearCanvas(); }}>
              <div className="colorir-drawing-emoji">☀️</div>
              <span className="colorir-drawing-name">Sol</span>
            </div>
            <div className={`colorir-drawing-card ${currentDrawing === 'moon' ? 'active' : ''}`} onClick={() => { setCurrentDrawing('moon'); clearCanvas(); }}>
              <div className="colorir-drawing-emoji">🌙</div>
              <span className="colorir-drawing-name">Lua</span>
            </div>
          </div>
        </div>

        <div className="colorir-canvas-wrapper">
          <div className="colorir-canvas">
            {renderDrawing()}
          </div>
        </div>

        <div className="colorir-tools">
          <button className="colorir-tool-btn" onClick={clearCanvas}>
            🗑️ Limpar
          </button>
          <button className="colorir-tool-btn" onClick={() => window.print()}>
            🖨️ Imprimir
          </button>
          <button className="colorir-tool-btn" onClick={clearCanvas}>
            ↺ Recomeçar
          </button>
        </div>
      </div>

      <aside className="colorir-sidebar">
        <div>
          <h2 className="colorir-section-title">Cores</h2>
          <div className="colorir-current-color">
            <span className="colorir-current-color-label">Cor Atual:</span>
            <div 
              className="colorir-current-color-display"
              style={{ backgroundColor: selectedColor }}
            />
          </div>
          <div className="colorir-palette">
            {colors.map((color, index) => (
              <div
                key={index}
                className={`colorir-color ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                title={color}
              />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Colorir;
