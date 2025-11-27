import { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, ChevronDown, Heart, MessageCircle, Users, Activity, ArrowLeft, 
  X, Share2, Printer, Grid, List, Star, ArrowUp, 
  Filter, Bookmark, Clock, TrendingUp, SortAsc
} from 'lucide-react';
import logoImage from '../../assets/logo.png';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  icon: string;
  tags: string[];
  views?: number;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "COMO POSSO PREPARAR O CONSULTÓRIO PARA UM ATENDIMENTO MAIS CONFORTÁVEL?",
    answer: "Reduza estímulos sensoriais como luzes e sons fortes. Ofereça objetos de conforto, como brinquedos ou cobertores, e permita que a criança explore o ambiente antes do atendimento, se necessário. Utilize iluminação suave e evite sons abruptos. Prepare um espaço tranquilo onde a criança possa se acalmar se necessário.",
    category: "preparation",
    icon: "heart",
    tags: ["ambiente", "sensorial", "conforto"],
    views: 245
  },
  {
    id: 2,
    question: "DEVO AVISAR A CRIANÇA SOBRE O QUE VAI ACONTECER ANTES DA CONSULTA?",
    answer: "Sim, informe a criança de forma simples e clara sobre o que será feito. Use recursos visuais ou histórias sociais para ajudar a entender o processo. Mostre os instrumentos que serão usados e explique cada etapa de forma calma e objetiva. Evite surpresas durante o atendimento.",
    category: "communication",
    icon: "message",
    tags: ["comunicação", "preparação", "visual"],
    views: 189
  },
  {
    id: 3,
    question: "O QUE DEVO PERGUNTAR AOS PAIS ANTES DE UM ATENDIMENTO?",
    answer: "Pergunte sobre condições médicas, sensibilidades sensoriais, preferências de comunicação e estratégias que os pais usam para ajudar a criança a lidar com o atendimento. Questione sobre experiências anteriores em consultórios, medicamentos em uso, alergias e quais técnicas de acalmar funcionam melhor.",
    category: "assessment",
    icon: "users",
    tags: ["anamnese", "família", "histórico"],
    views: 312
  },
  {
    id: 4,
    question: "COMO LIDAR COM UMA CRIANÇA QUE NÃO CONSEGUE FICAR MUITO TEMPO NA CADEIRA DO DENTISTA?",
    answer: "Permita pausas frequentes, ajuste a cadeira para mais conforto e ofereça distrações como brinquedos ou vídeos. Seja paciente e flexível. Considere dividir o tratamento em sessões mais curtas. Use técnicas de dessensibilização gradual e reforce positivamente cada pequeno progresso.",
    category: "behavior",
    icon: "activity",
    tags: ["paciência", "flexibilidade", "adaptação"],
    views: 278
  },
  {
    id: 5,
    question: "E SE A CRIANÇA DEMONSTRAR SINAIS DE FRUSTRAÇÃO, COMO GRITAR OU SE AGITAR?",
    answer: "Mantenha a calma, ofereça uma pausa e tente identificar a causa da frustração. Técnicas de respiração ou um ambiente mais calmo podem ajudar. Evite contenção física desnecessária. Fale com voz suave e ofereça escolhas simples quando possível. Respeite os limites da criança.",
    category: "behavior",
    icon: "activity",
    tags: ["crise", "acalmar", "respiração"],
    views: 425
  },
  {
    id: 6,
    question: "COMO LIDAR COM UMA CRIANÇA QUE TEM DIFICULDADE EM ENTENDER A COMUNICAÇÃO VERBAL?",
    answer: "Use recursos visuais, como imagens ou gestos, e fale de forma simples e clara. Adapte-se ao método de comunicação da criança, como sinais ou dispositivos. Utilize pictogramas, demonstrações práticas e comunicação aumentativa alternativa (CAA) quando apropriado. Seja paciente e dê tempo para a criança processar as informações.",
    category: "communication",
    icon: "message",
    tags: ["visual", "CAA", "pictogramas"],
    views: 198
  },
  {
    id: 7,
    question: "QUAL A IMPORTÂNCIA DA DESSENSIBILIZAÇÃO ANTES DO ATENDIMENTO?",
    answer: "A dessensibilização ajuda a criança a se familiarizar gradualmente com o ambiente, instrumentos e procedimentos odontológicos, reduzindo ansiedade e medo. Permite que a criança ganhe confiança progressivamente. Realize visitas prévias sem procedimentos, mostre equipamentos e deixe a criança tocar e explorar em seu próprio ritmo.",
    category: "preparation",
    icon: "heart",
    tags: ["dessensibilização", "gradual", "confiança"],
    views: 156
  },
  {
    id: 8,
    question: "COMO IDENTIFICAR SE A CRIANÇA ESTÁ EXPERIMENTANDO SOBRECARGA SENSORIAL?",
    answer: "Sinais incluem agitação, cobrir os ouvidos ou olhos, gritos, comportamento de fuga ou isolamento. A criança pode ficar rígida, começar a se balançar ou mostrar irritabilidade aumentada. Observe mudanças no comportamento e respeite quando a criança demonstrar desconforto. Reduza estímulos imediatamente.",
    category: "assessment",
    icon: "users",
    tags: ["sobrecarga", "sinais", "observação"],
    views: 367
  },
  {
    id: 9,
    question: "POSSO USAR REFORÇOS POSITIVOS DURANTE O ATENDIMENTO?",
    answer: "Sim! Elogios, adesivos, brinquedos pequenos ou pausas para atividades favoritas podem motivar a criança. Descubra o que funciona melhor com cada criança. Use reforço imediato após comportamentos cooperativos. Crie um sistema de recompensas visual e previsível. Celebre cada conquista, por menor que seja.",
    category: "behavior",
    icon: "activity",
    tags: ["reforço", "motivação", "recompensas"],
    views: 221
  },
  {
    id: 10,
    question: "COMO ADAPTAR A LINGUAGEM PARA FACILITAR A COMPREENSÃO?",
    answer: "Use frases curtas, diretas e concretas. Evite metáforas ou linguagem abstrata. Demonstre visualmente o que vai acontecer. Fale devagar e repita se necessário. Use vocabulário simples e consistente. Permita tempo para processamento. Confirme a compreensão através de perguntas simples.",
    category: "communication",
    icon: "message",
    tags: ["linguagem", "clareza", "simplicidade"],
    views: 203
  },
  {
    id: 11,
    question: "QUAL O PAPEL DA FAMÍLIA NO PROCESSO DE ATENDIMENTO?",
    answer: "A família conhece melhor a criança e pode fornecer informações valiosas sobre preferências, gatilhos e estratégias eficazes. A presença dos pais pode trazer conforto e segurança. Trabalhe em parceria com a família, ouvindo suas sugestões e experiências. Permita que participem ativamente do atendimento quando apropriado.",
    category: "assessment",
    icon: "users",
    tags: ["família", "parceria", "colaboração"],
    views: 290
  },
  {
    id: 12,
    question: "COMO CRIAR UM AMBIENTE SENSORIALMENTE AMIGÁVEL?",
    answer: "Reduza ruídos, use iluminação suave, ofereça fones de ouvido com cancelamento de ruído, disponibilize objetos táteis reconfortantes. Evite aromas fortes. Considere música calma. Minimize estímulos visuais excessivos. Mantenha temperatura confortável. Crie um espaço previsível e organizado.",
    category: "preparation",
    icon: "heart",
    tags: ["ambiente", "sensorial", "organização"],
    views: 334
  },
  {
    id: 13,
    question: "COMO ABORDAR UMA CRIANÇA QUE TEM MEDO DE INSTRUMENTOS ODONTOLÓGICOS?",
    answer: "Mostre os instrumentos de forma lúdica, deixe a criança tocar e explorar. Use nomenclatura amigável como 'vento mágico' para o sugador ou 'escovinha giratória' para a turbina. Demonstre primeiro em um boneco ou no responsável. Permita que a criança familiarize-se gradualmente com sons e texturas antes do uso real.",
    category: "preparation",
    icon: "heart",
    tags: ["medo", "instrumentos", "lúdico"],
    views: 412
  },
  {
    id: 14,
    question: "QUAL A MELHOR FORMA DE LIDAR COM HIPERSENSIBILIDADE TÁTIL NA BOCA?",
    answer: "Comece com toques externos (rosto, lábios) antes de tocar a boca. Use massagens gengivais suaves antes do procedimento. Permita que a criança escolha a textura das luvas (com ou sem pó). Utilize técnicas de dessensibilização progressiva em consultas anteriores. Respeite o tempo de adaptação individual.",
    category: "behavior",
    icon: "activity",
    tags: ["hipersensibilidade", "toque", "gradual"],
    views: 298
  },
  {
    id: 15,
    question: "COMO TRABALHAR COM CRIANÇAS QUE TÊM DIFICULDADE COM MUDANÇAS DE ROTINA?",
    answer: "Mantenha horários consistentes para as consultas. Crie uma rotina visual do atendimento que possa ser revisada antes de cada visita. Minimize mudanças na sala de atendimento. Se possível, mantenha o mesmo profissional em todas as consultas. Avise com antecedência qualquer alteração necessária.",
    category: "preparation",
    icon: "heart",
    tags: ["rotina", "previsibilidade", "consistência"],
    views: 265
  },
  {
    id: 16,
    question: "O QUE FAZER SE A CRIANÇA NÃO ACEITA ABRIR A BOCA?",
    answer: "Não force. Use estratégias lúdicas como cantar músicas que naturalmente abrem a boca, imitar animais, ou brincar de 'ver os dinossauros' (dentes). Permita que a criança pratique abrir e fechar a boca no seu próprio ritmo. Comece com segundos curtos e aumente gradualmente. Reforce positivamente cada tentativa.",
    category: "behavior",
    icon: "activity",
    tags: ["recusa", "cooperação", "estratégias"],
    views: 387
  },
  {
    id: 17,
    question: "COMO LIDAR COM ECOLALIA DURANTE O ATENDIMENTO?",
    answer: "Reconheça a ecolalia como forma de comunicação e processamento. Use frases curtas e diretas que possam ser repetidas de forma funcional. Não exija silêncio absoluto se a repetição ajuda a criança a se acalmar. Incorpore a ecolalia na rotina, como repetir instruções que você dá.",
    category: "communication",
    icon: "message",
    tags: ["ecolalia", "autismo", "comunicação"],
    views: 176
  },
  {
    id: 18,
    question: "QUAL O TEMPO IDEAL DE CONSULTA PARA CRIANÇAS NEURODIVERGENTES?",
    answer: "Varia individualmente, mas geralmente consultas mais curtas (15-20 minutos) são mais eficazes. Priorize qualidade sobre quantidade. É melhor fazer múltiplas consultas curtas do que uma longa e estressante. Observe os sinais de fadiga da criança e ajuste conforme necessário. Com o tempo, alguns podem tolerar consultas mais longas.",
    category: "assessment",
    icon: "users",
    tags: ["tempo", "duração", "planejamento"],
    views: 342
  },
  {
    id: 19,
    question: "COMO USAR HISTÓRIAS SOCIAIS NO CONTEXTO ODONTOLÓGICO?",
    answer: "Crie narrativas personalizadas sobre a visita ao dentista com fotos reais do consultório. Inclua o passo a passo do atendimento com linguagem simples. Envie para os pais lerem com antecedência. Use primeira pessoa ('Eu vou ao dentista'). Adicione elementos visuais e destaque aspectos positivos do atendimento.",
    category: "communication",
    icon: "message",
    tags: ["histórias sociais", "preparação", "visual"],
    views: 234
  },
  {
    id: 20,
    question: "DEVO PERMITIR QUE A CRIANÇA TRAGA OBJETOS DE CONFORTO?",
    answer: "Sim! Objetos de transição (bichos de pelúcia, cobertores, brinquedos preferidos) podem ser essenciais para a regulação emocional. Permita que a criança segure o objeto durante o atendimento quando possível. Isso aumenta a sensação de segurança e controle. Inclua o objeto nas fotos e histórias sociais sobre a visita.",
    category: "behavior",
    icon: "activity",
    tags: ["conforto", "segurança", "objetos"],
    views: 289
  },
  {
    id: 21,
    question: "COMO ADAPTAR O ATENDIMENTO PARA CRIANÇAS NÃO-VERBAIS?",
    answer: "Use comunicação alternativa (PECS, pranchas, dispositivos eletrônicos). Observe linguagem corporal e expressões faciais atentamente. Trabalhe com sistemas de sim/não através de gestos ou cartões. Pergunte aos pais sobre os métodos de comunicação usados em casa. Respeite todas as formas de comunicação da criança.",
    category: "communication",
    icon: "message",
    tags: ["não-verbal", "CAA", "comunicação"],
    views: 301
  },
  {
    id: 22,
    question: "QUAIS ESTRATÉGIAS USAR PARA CRIANÇAS COM TDAH?",
    answer: "Mantenha o ambiente organizado e livre de distrações visuais excessivas. Permita pequenos movimentos durante o atendimento. Use timer visual para mostrar quanto tempo falta. Divida procedimentos em etapas menores com pausas. Ofereça escolhas quando possível. Use reforço imediato e frequente.",
    category: "behavior",
    icon: "activity",
    tags: ["TDAH", "atenção", "movimento"],
    views: 356
  },
  {
    id: 23,
    question: "COMO LIDAR COM SELETIVIDADE ALIMENTAR QUE AFETA A SAÚDE BUCAL?",
    answer: "Não julgue a família. Entenda que a seletividade pode ter base sensorial. Oriente sobre higiene oral adaptada à dieta. Sugira modificações graduais quando possível. Trabalhe em parceria com terapeutas ocupacionais e nutricionistas. Foque em estratégias de prevenção realistas para a situação individual.",
    category: "assessment",
    icon: "users",
    tags: ["alimentação", "seletividade", "saúde bucal"],
    views: 198
  },
  {
    id: 24,
    question: "É NECESSÁRIO SEDAÇÃO PARA TODOS OS PROCEDIMENTOS?",
    answer: "Não! Muitas crianças neurodivergentes podem ser atendidas sem sedação com as adaptações adequadas. Tente primeiro técnicas comportamentais e dessensibilização. Reserve sedação para casos específicos onde outras estratégias não funcionaram. Considere óxido nitroso como opção intermediária. Sempre avalie individualmente.",
    category: "assessment",
    icon: "users",
    tags: ["sedação", "alternativas", "avaliação"],
    views: 423
  },
  {
    id: 25,
    question: "COMO TRABALHAR A ESCOVAÇÃO DENTAL EM CASA COM OS PAIS?",
    answer: "Ensine técnicas adaptadas às necessidades sensoriais da criança. Sugira diferentes texturas de escovas. Demonstre posições confortáveis para escovação. Crie rotinas visuais para o momento da higiene. Ofereça estratégias para tornar o momento mais lúdico. Seja realista sobre o que é possível inicialmente.",
    category: "preparation",
    icon: "heart",
    tags: ["higiene", "casa", "orientação"],
    views: 267
  },
  {
    id: 26,
    question: "COMO IDENTIFICAR SINAIS DE DOR EM CRIANÇAS NÃO-VERBAIS?",
    answer: "Observe mudanças comportamentais: agressividade aumentada, recusa alimentar, levar mão à face, irritabilidade, alterações no sono. Pergunte aos pais sobre comportamentos atípicos recentes. Use escalas de dor visuais. Observe se há preferência por mastigar de um lado. Esteja atento a sinais sutis que os pais podem reconhecer melhor.",
    category: "assessment",
    icon: "users",
    tags: ["dor", "não-verbal", "observação"],
    views: 384
  },
  {
    id: 27,
    question: "QUAIS RECURSOS TECNOLÓGICOS PODEM AUXILIAR NO ATENDIMENTO?",
    answer: "Tablets com vídeos ou jogos preferidos podem servir como distração positiva. Apps de timer visual ajudam a mostrar duração. Aplicativos de histórias sociais personalizadas. Fones com cancelamento de ruído. Óculos escuros para reduzir estímulo luminoso. Avalie com os pais o que a criança já usa e se adapta bem.",
    category: "preparation",
    icon: "heart",
    tags: ["tecnologia", "recursos", "adaptação"],
    views: 245
  },
  {
    id: 28,
    question: "COMO FAZER A TRANSIÇÃO DE ATENDIMENTO PEDIÁTRICO PARA ADULTO?",
    answer: "Comece a preparação anos antes (adolescência). Apresente gradualmente o novo dentista. Permita visitas ao novo consultório antes do atendimento. Compartilhe informações detalhadas sobre necessidades e estratégias eficazes. Considere período de sobreposição com ambos os profissionais. Mantenha rotinas e estratégias que funcionam.",
    category: "assessment",
    icon: "users",
    tags: ["transição", "adolescência", "continuidade"],
    views: 167
  },
  {
    id: 29,
    question: "O QUE FAZER QUANDO OS PAIS ESTÃO MAIS ANSIOSOS QUE A CRIANÇA?",
    answer: "Acolha as preocupações dos pais com empatia. Explique seu protocolo de atendimento adaptado. Mostre que você tem experiência e preparo. Às vezes, separar a criança dos pais ansiosos pode ajudar. Ofereça informações baseadas em evidências. Construa confiança gradualmente demonstrando competência e cuidado.",
    category: "communication",
    icon: "message",
    tags: ["pais", "ansiedade", "família"],
    views: 312
  },
  {
    id: 30,
    question: "COMO DOCUMENTAR AS ADAPTAÇÕES NECESSÁRIAS PARA CADA CRIANÇA?",
    answer: "Crie um prontuário detalhado com preferências sensoriais, estratégias eficazes, gatilhos a evitar, formas de comunicação, objetos de conforto preferidos, tempo ideal de consulta. Atualize após cada visita. Compartilhe com toda equipe. Isso garante consistência e mostra respeito pela individualidade da criança.",
    category: "assessment",
    icon: "users",
    tags: ["documentação", "prontuário", "individualização"],
    views: 201
  }
];

const categories = [
  { id: 'all', name: 'Todas', icon: Activity },
  { id: 'preparation', name: 'Preparação', icon: Heart },
  { id: 'communication', name: 'Comunicação', icon: MessageCircle },
  { id: 'assessment', name: 'Avaliação', icon: Users },
  { id: 'behavior', name: 'Comportamento', icon: Activity }
];

type SortOption = 'popular' | 'recent' | 'alphabetical';
type ViewMode = 'list' | 'grid';

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [darkMode] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    faqData.forEach(faq => faq.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, []);

  // Scroll to top handler
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredFAQs = useMemo(() => {
    let filtered = faqData;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(faq => 
        selectedTags.some(tag => faq.tags.includes(tag))
      );
    }

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.views || 0) - (a.views || 0);
      } else if (sortBy === 'alphabetical') {
        return a.question.localeCompare(b.question);
      } else {
        return b.id - a.id;
      }
    });

    return sorted;
  }, [searchTerm, selectedCategory, sortBy, selectedTags]);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedTags([]);
  };

  const shareFAQ = (faq: FAQItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: faq.question,
        text: faq.answer,
      });
    } else {
      alert('Compartilhamento não suportado neste navegador');
    }
  };

  const printFAQ = () => {
    window.print();
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return text;
    }

    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={index} style={{ 
          backgroundColor: darkMode ? '#3B82F6' : '#DBEAFE', 
          color: darkMode ? '#EFF6FF' : '#1E3A8A',
          padding: '2px 6px', 
          borderRadius: '4px',
          fontWeight: 600
        }}>
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const stats = useMemo(() => ({
    total: faqData.length,
    filtered: filteredFAQs.length,
    favorites: favorites.length,
    totalViews: faqData.reduce((sum, faq) => sum + (faq.views || 0), 0)
  }), [filteredFAQs, favorites]);

  return (
    <div style={{
      ...styles.container,
      backgroundColor: darkMode ? '#0F172A' : '#F0F9FF',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800;900&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideDown {
          from { max-height: 0; opacity: 0; }
          to { max-height: 800px; opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .faq-item {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faq-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(59, 130, 246, 0.15);
        }

        .search-input:focus {
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
        }

        .category-btn {
          transition: all 0.3s ease;
          position: relative;
        }

        .category-btn:hover {
          transform: translateY(-3px) scale(1.05);
        }

        .category-btn.active {
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          color: white;
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
        }

        .category-btn.active::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 32px;
          padding: 2px;
          background: linear-gradient(135deg, #60A5FA, #3B82F6);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.6;
        }

        .answer-content {
          animation: slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .back-button:hover {
          background: linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%);
          transform: translateX(-5px);
        }

        .icon-wrapper {
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .faq-item:hover .icon-wrapper {
          transform: rotate(360deg) scale(1.1);
        }

        .chevron-icon {
          transition: transform 0.3s ease;
        }

        .chevron-icon.expanded {
          transform: rotate(180deg);
        }

        .scroll-top-btn {
          animation: slideUp 0.3s ease-out;
        }


        .scroll-top-btn:hover {
          animation: bounce 0.6s ease-in-out infinite;
        }

        .tag-badge {
          transition: all 0.3s ease;
        }

        .tag-badge:hover {
          transform: scale(1.1);
        }

        .tag-badge.active {
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          color: white;
        }

        .stat-card {
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.15);
        }

        .grid-item {
          animation: fadeIn 0.5s ease-out backwards;
        }

        @media print {
          .no-print {
            display: none !important;
          }
          .faq-item {
            page-break-inside: avoid;
          }
        }

        @media (max-width: 768px) {
          .mobile-hide {
            display: none;
          }
          .faq-item:hover {
            transform: translateY(-2px);
          }
        }
      `}</style>

      {/* Header */}
      <header style={{
        ...styles.header,
        backgroundColor: darkMode ? '#1E293B' : '#FFFFFF',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
      }} className="no-print">
        <div style={styles.headerLeft}>
          <button 
            onClick={() => window.history.back()}
            style={{
              ...styles.backButton,
              backgroundColor: darkMode ? '#334155' : '#DBEAFE',
              color: darkMode ? '#E0F2FE' : '#1E40AF'
            }} 
            className="back-button"
          >
            <button className="flex items-center">
  <ArrowLeft size={24} />
</button>
          </button>

    </div>

        <img src={logoImage} alt="Affectus Logo" style={styles.logo} />

        <div style={styles.headerRight}>
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              ...styles.iconButton,
              backgroundColor: showFilters ? (darkMode ? '#3B82F6' : '#3B82F6') : (darkMode ? '#334155' : '#F0F9FF'),
              color: showFilters ? '#FFFFFF' : (darkMode ? '#60A5FA' : '#3B82F6')
            }}
            title="Filtros Avançados"
            className="mobile-hide"
          >
            <Filter size={20} />
          </button>
          <button
            onClick={printFAQ}
            style={{
              ...styles.iconButton,
              backgroundColor: darkMode ? '#334155' : '#F0F9FF',
              color: darkMode ? '#60A5FA' : '#3B82F6',
              marginLeft: '12px'
            }}
            title="Imprimir"
            className="mobile-hide"
          >
            <Printer size={20} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div style={{
        ...styles.heroSection,
        background: darkMode 
          ? 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 50%, #3B82F6 100%)'
          : 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 50%, #93C5FD 100%)',
      }}>
        {/* Stats Card - Only Favorites (Discreto no topo) */}
        {favorites.length > 0 && (
          <div style={styles.statsContainerTop} className="no-print">
            <div style={{
              ...styles.statCardTop,
              backgroundColor: darkMode ? 'rgba(30, 58, 138, 0.3)' : 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)'
            }}>
              <Star size={18} style={{ color: '#F59E0B' }} fill="#F59E0B" />
              <span style={{
                fontSize: '13px',
                fontWeight: 700,
                color: darkMode ? '#E0F2FE' : '#1E40AF'
              }}>
                {stats.favorites} {stats.favorites === 1 ? 'Favorita' : 'Favoritas'}
              </span>
            </div>
          </div>
        )}

        <p style={{
          ...styles.subtitle,
          color: darkMode ? '#BFDBFE' : '#1E40AF'
        }}>AFFECTUS FAQ - CRIANÇAS NEURODIVERGENTES EM CONSULTÓRIOS ODONTOLÓGICOS</p>
        <h1 style={{
          ...styles.title,
          color: darkMode ? '#EFF6FF' : '#1E3A8A'
        }}>ESTAMOS AQUI PARA AJUDAR.</h1>

        <p style={{
          ...styles.searchLabel,
          color: darkMode ? '#93C5FD' : '#1E40AF'
        }}>DIGITE AQUI A SUA DÚVIDA</p>

        {/* Search Bar */}
        <div style={styles.searchContainer}>
          <Search size={22} style={{
            ...styles.searchIcon,
            color: darkMode ? '#60A5FA' : '#3B82F6'
          }} />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Buscar perguntas, respostas ou tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              ...styles.searchInput,
              backgroundColor: darkMode ? '#1E293B' : 'white',
              color: darkMode ? '#F0F9FF' : '#1E3A8A',
              border: `2px solid ${darkMode ? '#334155' : 'transparent'}`
            }}
            className="search-input"
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('');
                searchInputRef.current?.focus();
              }}
              style={styles.clearButton}
              title="Limpar busca"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Search Results Counter */}
        {(searchTerm || selectedCategory !== 'all' || selectedTags.length > 0) && (
          <div style={{
            ...styles.resultsCounter,
            color: darkMode ? '#E0F2FE' : '#1E40AF'
          }}>
            {filteredFAQs.length} {filteredFAQs.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
            {(searchTerm || selectedCategory !== 'all' || selectedTags.length > 0) && (
              <button
                onClick={clearFilters}
                style={{
                  marginLeft: '15px',
                  padding: '6px 16px',
                  backgroundColor: darkMode ? '#1E40AF' : '#3B82F6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 700,
                  fontFamily: "'Nunito', sans-serif"
                }}
              >
                LIMPAR FILTROS
              </button>
            )}
          </div>
        )}
      </div>

      {/* Category Filters */}
      <div style={{
        ...styles.categoriesContainer,
        backgroundColor: darkMode ? '#1E293B' : '#FFFFFF',
        borderBottom: `1px solid ${darkMode ? '#334155' : '#E0F2FE'}`
      }} className="no-print">
        <div style={styles.categoriesWrapper}>
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  ...styles.categoryButton,
                  border: `2px solid ${selectedCategory === category.id ? 'transparent' : (darkMode ? '#334155' : '#BFDBFE')}`,
                  backgroundColor: selectedCategory === category.id 
                    ? 'transparent' 
                    : (darkMode ? '#0F172A' : 'white'),
                  color: selectedCategory === category.id 
                    ? 'white' 
                    : (darkMode ? '#93C5FD' : '#1E40AF')
                }}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              >
                <IconComponent size={20} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        <div style={styles.viewControls} className="mobile-hide">
          <button
            onClick={() => setSortBy('popular')}
            style={{
              ...styles.sortButton,
              backgroundColor: sortBy === 'popular' ? (darkMode ? '#3B82F6' : '#3B82F6') : (darkMode ? '#334155' : '#F0F9FF'),
              color: sortBy === 'popular' ? 'white' : (darkMode ? '#93C5FD' : '#3B82F6')
            }}
            title="Mais Populares"
          >
            <TrendingUp size={18} />
          </button>
          <button
            onClick={() => setSortBy('alphabetical')}
            style={{
              ...styles.sortButton,
              backgroundColor: sortBy === 'alphabetical' ? (darkMode ? '#3B82F6' : '#3B82F6') : (darkMode ? '#334155' : '#F0F9FF'),
              color: sortBy === 'alphabetical' ? 'white' : (darkMode ? '#93C5FD' : '#3B82F6')
            }}
            title="Ordem Alfabética"
          >
            <SortAsc size={18} />
          </button>
          <button
            onClick={() => setSortBy('recent')}
            style={{
              ...styles.sortButton,
              backgroundColor: sortBy === 'recent' ? (darkMode ? '#3B82F6' : '#3B82F6') : (darkMode ? '#334155' : '#F0F9FF'),
              color: sortBy === 'recent' ? 'white' : (darkMode ? '#93C5FD' : '#3B82F6')
            }}
            title="Mais Recentes"
          >
            <Clock size={18} />
          </button>

          <div style={styles.viewModeDivider} />

          <button
            onClick={() => setViewMode('list')}
            style={{
              ...styles.sortButton,
              backgroundColor: viewMode === 'list' ? (darkMode ? '#3B82F6' : '#3B82F6') : (darkMode ? '#334155' : '#F0F9FF'),
              color: viewMode === 'list' ? 'white' : (darkMode ? '#93C5FD' : '#3B82F6')
            }}
            title="Visualização em Lista"
          >
            <List size={18} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            style={{
              ...styles.sortButton,
              backgroundColor: viewMode === 'grid' ? (darkMode ? '#3B82F6' : '#3B82F6') : (darkMode ? '#334155' : '#F0F9FF'),
              color: viewMode === 'grid' ? 'white' : (darkMode ? '#93C5FD' : '#3B82F6')
            }}
            title="Visualização em Grade"
          >
            <Grid size={18} />
          </button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div style={{
          ...styles.filtersPanel,
          backgroundColor: darkMode ? '#1E293B' : '#F0F9FF',
          borderBottom: `1px solid ${darkMode ? '#334155' : '#BFDBFE'}`
        }} className="no-print">
          <h3 style={{
            fontSize: '14px',
            fontWeight: 800,
            color: darkMode ? '#E0F2FE' : '#1E40AF',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Bookmark size={18} />
            FILTRAR POR TAGS
          </h3>
          <div style={styles.tagsContainer}>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                  ...styles.tagBadge,
                  backgroundColor: selectedTags.includes(tag) 
                    ? (darkMode ? '#3B82F6' : '#3B82F6')
                    : (darkMode ? '#334155' : 'white'),
                  color: selectedTags.includes(tag) 
                    ? 'white' 
                    : (darkMode ? '#93C5FD' : '#3B82F6'),
                  border: `2px solid ${selectedTags.includes(tag) ? 'transparent' : (darkMode ? '#475569' : '#BFDBFE')}`
                }}
                className={`tag-badge ${selectedTags.includes(tag) ? 'active' : ''}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* FAQ Items */}
      <div style={styles.faqContainer}>
        {filteredFAQs.length === 0 ? (
          <div style={{
            ...styles.noResults,
            color: darkMode ? '#93C5FD' : '#3B82F6'
          }}>
            <MessageCircle size={64} style={{
              ...styles.noResultsIcon,
              color: darkMode ? '#60A5FA' : '#3B82F6'
            }} />
            <p style={{
              ...styles.noResultsText,
              color: darkMode ? '#E0F2FE' : '#1E40AF'
            }}>Nenhuma pergunta encontrada.</p>
            <p style={{
              ...styles.noResultsSubtext,
              color: darkMode ? '#93C5FD' : '#60A5FA'
            }}>Tente ajustar sua busca ou filtros.</p>
          </div>
        ) : (
          <div style={viewMode === 'grid' ? styles.gridContainer : styles.listContainer}>
            {filteredFAQs.map((faq, index) => (
              <div
                key={faq.id}
                style={{
                  ...styles.faqItem,
                  backgroundColor: darkMode ? '#1E293B' : 'white',
                  animationDelay: `${index * 0.05}s`,
                  gridColumn: viewMode === 'grid' ? 'span 1' : undefined
                }}
                className={viewMode === 'grid' ? 'faq-item grid-item' : 'faq-item'}
              >
                <button
                  onClick={() => toggleExpand(faq.id)}
                  style={styles.questionButton}
                >
                  <div style={styles.questionContent}>
                    <div style={{
                      ...styles.iconCircle,
                      background: darkMode 
                        ? 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)'
                        : 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)'
                    }} className="icon-wrapper">
                      {faq.icon === 'heart' && <Heart size={24} style={styles.icon} />}
                      {faq.icon === 'message' && <MessageCircle size={24} style={styles.icon} />}
                      {faq.icon === 'users' && <Users size={24} style={styles.icon} />}
                      {faq.icon === 'activity' && <Activity size={24} style={styles.icon} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        ...styles.question,
                        color: darkMode ? '#E0F2FE' : '#1E3A8A'
                      }}>
                        {highlightText(faq.question, searchTerm)}
                      </h3>
                      <div style={styles.metaInfo}>
                        {faq.views && (
                          <span style={{
                            fontSize: '12px',
                            color: darkMode ? '#94A3B8' : '#64748B',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            
                           
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div style={styles.actionButtons}>
                    <button
                      onClick={(e) => toggleFavorite(faq.id, e)}
                      style={{
                        ...styles.actionButton,
                        color: favorites.includes(faq.id) ? '#F59E0B' : (darkMode ? '#64748B' : '#94A3B8')
                      }}
                      title={favorites.includes(faq.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    >
                      <Star 
                        size={20} 
                        fill={favorites.includes(faq.id) ? '#F59E0B' : 'none'}
                      />
                    </button>
                    <button
                      onClick={(e) => shareFAQ(faq, e)}
                      style={{
                        ...styles.actionButton,
                        color: darkMode ? '#64748B' : '#94A3B8'
                      }}
                      title="Compartilhar"
                      className="mobile-hide"
                    >
                      <Share2 size={20} />
                    </button>
                    <ChevronDown
                      size={24}
                      style={{
                        ...styles.chevron,
                        color: darkMode ? '#60A5FA' : '#3B82F6'
                      }}
                      className={`chevron-icon ${expandedId === faq.id ? 'expanded' : ''}`}
                    />
                  </div>
                </button>

                {expandedId === faq.id && (
                  <div style={styles.answer} className="answer-content">
                    <p style={{
                      ...styles.answerText,
                      color: darkMode ? '#CBD5E1' : '#475569'
                    }}>
                      {highlightText(faq.answer, searchTerm)}
                    </p>
                    <div style={styles.tagsInAnswer}>
                      {faq.tags.map(tag => (
                        <span
                          key={tag}
                          style={{
                            ...styles.tagInAnswer,
                            backgroundColor: darkMode ? '#334155' : '#EFF6FF',
                            color: darkMode ? '#93C5FD' : '#3B82F6'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View All / Show Favorites */}
      {filteredFAQs.length > 0 && (
        <div style={styles.viewAllContainer} className="no-print">
          {favorites.length > 0 && (
            <button
              onClick={() => {
                const favFAQs = faqData.filter(faq => favorites.includes(faq.id));
                console.log('Favoritos:', favFAQs);
                alert(`Você tem ${favorites.length} pergunta(s) favorita(s)!`);
              }}
              style={{
                ...styles.viewAllButton,
                backgroundColor: darkMode ? '#1E40AF' : '#3B82F6',
                marginRight: '15px'
              }}
            >
              <Star size={18} fill="white" />
              VER FAVORITOS ({favorites.length})
            </button>
          )}
          {(searchTerm || selectedCategory !== 'all' || selectedTags.length > 0) && filteredFAQs.length < faqData.length && (
            <button
              onClick={clearFilters}
              style={{
                ...styles.viewAllButton,
                backgroundColor: darkMode ? '#334155' : '#1E40AF',
              }}
            >
              <Activity size={18} />
              VER TODAS AS PERGUNTAS
            </button>
          )}
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          style={{
            ...styles.scrollTopButton,
            background: darkMode 
              ? 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)'
              : 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)'
          }}
          className="scroll-top-btn no-print"
          title="Voltar ao topo"
        >
          <ArrowUp size={24} />
        </button>
      )}

      {/* Footer */}
      <footer style={{
        ...styles.footer,
        backgroundColor: darkMode ? '#1E293B' : '#EFF6FF',
        borderTop: `1px solid ${darkMode ? '#334155' : '#BFDBFE'}`
      }}>
        <p style={{
          ...styles.footerText,
          color: darkMode ? '#94A3B8' : '#64748B'
        }}>
          INFORMAÇÕES LEVANTADAS POR PROFISSIONAIS DE PSIQUIATRIA E PSICOLOGIA PARA UM ATENDIMENTO MAIS INCLUSIVO A CRIANÇAS NEURODIVERGENTES.
        </p>
        <p style={{
          fontSize: '11px',
          color: darkMode ? '#64748B' : '#94A3B8',
          marginTop: '10px',
          fontWeight: 600
        }}>
          © 2025 Affectus • Desenvolvido com ❤️ para inclusão
        </p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    minHeight: '100vh',
    fontFamily: "'Nunito', sans-serif",
    position: 'relative' as const,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    position: 'sticky' as const,
    top: 0,
    zIndex: 100,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 700,
    fontSize: '12px',
    transition: 'all 0.3s ease',
  },
  iconButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  logo: {
    height: '50px',
    objectFit: 'contain' as const,
  },
  heroSection: {
    padding: '60px 40px 80px',
    textAlign: 'center' as const,
  },
  subtitle: {
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '1.5px',
    marginBottom: '15px',
  },
  title: {
    fontSize: '56px',
    fontWeight: 900,
    marginBottom: '40px',
    letterSpacing: '-2px',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '40px',
    flexWrap: 'wrap' as const,
  },
  statsContainerTop: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '20px',
    padding: '0 20px',
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '20px 30px',
    borderRadius: '16px',
    minWidth: '180px',
  },
  statCardTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 20px',
    borderRadius: '30px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  searchLabel: {
    fontSize: '13px',
    fontWeight: 700,
    marginBottom: '20px',
    letterSpacing: '1px',
  },
  searchContainer: {
    position: 'relative' as const,
    maxWidth: '700px',
    margin: '0 auto',
  },
  searchIcon: {
    position: 'absolute' as const,
    left: '24px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
  },
  searchInput: {
    width: '100%',
    padding: '18px 60px 18px 60px',
    fontSize: '16px',
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 600,
    borderRadius: '60px',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  clearButton: {
    position: 'absolute' as const,
    right: '24px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#94A3B8',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'all 0.2s ease',
  },
  resultsCounter: {
    marginTop: '25px',
    fontSize: '15px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
  },
  categoriesContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '25px 40px',
    gap: '20px',
    position: 'sticky' as const,
    top: '84px',
    zIndex: 90,
    flexWrap: 'wrap' as const,
  },
  categoriesWrapper: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap' as const,
    flex: 1,
  },
  categoryButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 28px',
    borderRadius: '32px',
    cursor: 'pointer',
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 800,
    fontSize: '13px',
  },
  viewControls: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  sortButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '40px',
    height: '40px',
  },
  viewModeDivider: {
    width: '1px',
    height: '24px',
    backgroundColor: '#CBD5E1',
    margin: '0 4px',
  },
  filtersPanel: {
    padding: '25px 40px',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '10px',
  },
  tagBadge: {
    padding: '8px 18px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 700,
    fontFamily: "'Nunito', sans-serif",
    cursor: 'pointer',
  },
  faqContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '30px 40px 80px',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))',
    gap: '24px',
  },
  faqItem: {
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    animation: 'fadeIn 0.5s ease-out',
  },
  questionButton: {
    width: '100%',
    padding: '28px 32px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
  },
  questionContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    flex: 1,
    textAlign: 'left' as const,
  },
  iconCircle: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
  },
  icon: {
    color: 'white',
  },
  question: {
    fontSize: '15px',
    fontWeight: 800,
    lineHeight: '1.6',
    margin: 0,
    fontFamily: "'Nunito', sans-serif",
  },
  metaInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginTop: '8px',
    flexWrap: 'wrap' as const,
  },
  actionButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  actionButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
  },
  chevron: {
    flexShrink: 0,
  },
  answer: {
    padding: '0 32px 32px 108px',
  },
  answerText: {
    fontSize: '15px',
    fontWeight: 500,
    lineHeight: '1.9',
    margin: 0,
    fontFamily: "'Nunito', sans-serif",
  },
  tagsInAnswer: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
    marginTop: '20px',
  },
  tagInAnswer: {
    padding: '6px 14px',
    borderRadius: '16px',
    fontSize: '11px',
    fontWeight: 700,
    fontFamily: "'Nunito', sans-serif",
  },
  noResults: {
    textAlign: 'center' as const,
    padding: '100px 20px',
  },
  noResultsIcon: {
    marginBottom: '24px',
  },
  noResultsText: {
    fontSize: '28px',
    fontWeight: 800,
    marginBottom: '12px',
  },
  noResultsSubtext: {
    fontSize: '16px',
    fontWeight: 600,
  },
  viewAllContainer: {
    textAlign: 'center' as const,
    padding: '20px 40px 60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '15px',
  },
  viewAllButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '18px 40px',
    color: 'white',
    border: 'none',
    borderRadius: '60px',
    fontSize: '14px',
    fontWeight: 800,
    fontFamily: "'Nunito', sans-serif",
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 25px rgba(59, 130, 246, 0.4)',
  },
  scrollTopButton: {
    position: 'fixed' as const,
    bottom: '40px',
    right: '40px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 30px rgba(59, 130, 246, 0.5)',
    zIndex: 999,
  },
  footer: {
    padding: '40px 40px',
    textAlign: 'center' as const,
  },
  footerText: {
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.5px',
    lineHeight: '1.7',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: "'Nunito', sans-serif",
  },
};
