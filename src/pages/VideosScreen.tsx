import { ArrowLeft, Search, Play, SkipBack, SkipForward, X, Volume2 } from 'lucide-react';
import { Button } from '../assets/components/button';
import React, { useState, useEffect } from 'react';
import dentinho1 from '../assets/dentinho_1.png';
import barbie from '../assets/barbie.jpg';
import bobEsponja from '../assets/bobesponja.jpg';
import castelo from '../assets/castelo.jpg';
import sophia from '../assets/sophia.jpg';
import charlieLolla from '../assets/charlieelolla.jpg';
import chaves from '../assets/chaves.jpg';
import educativos from '../assets/educativos.png';
import peppa from '../assets/peppa.jpg';
import patrulhacanina from '../assets/patrulhacanina.jpg';
import mundobita from '../assets/mundobita.jpg';
import galinha from '../assets/galinha.jpg';
import peixonauta from '../assets/PeixonautaHistorico.png';
import luna from '../assets/luna.jpg';
import meninas from '../assets/meninas.jpg';
import safe from '../assets/safe.png';
import './styles/VideosScreen.css'
import { useNavigate } from 'react-router-dom';
// Simple fallback image component
type ImageWithFallbackProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

const getPreviewLink = (url: string) => {
  const match = url.match(/\/d\/(.*)\/view/);
  return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
};

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, fallbackSrc = '', ...rest }) => {
  const [imgSrc, setImgSrc] = React.useState(src);
  return (
    <img
      {...rest}
      src={imgSrc}
      onError={() => {
        if (fallbackSrc) setImgSrc(fallbackSrc);
      }}
      alt={rest.alt}
    />
  );
};

// Componente de Áudio para Acessibilidade com voz infantilizada do mascote
const AudioButton: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = () => {
    if ('speechSynthesis' in window) {
      // Cancela qualquer fala em andamento
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      
      // Voz mais rápida e despojada (menos travada)
      utterance.rate = 1.15;
      
      // Tom bem mais agudo para soar infantilizado e animado
      utterance.pitch = 1.4;
      
      // Volume máximo para energia
      utterance.volume = 1.0;
      
      // Tenta selecionar uma voz feminina/infantil se disponível
      const voices = window.speechSynthesis.getVoices();
      const brVoices = voices.filter(voice => voice.lang.startsWith('pt-BR') || voice.lang.startsWith('pt'));
      
      // Prefere vozes femininas (geralmente soam mais infantis)
      const femaleVoice = brVoices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('feminino') ||
        voice.name.toLowerCase().includes('luciana') ||
        voice.name.toLowerCase().includes('francisca')
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      } else if (brVoices.length > 0) {
        utterance.voice = brVoices[0];
      }
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Desculpe, seu navegador não suporta síntese de voz.');
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <button
      onClick={isSpeaking ? stopSpeaking : speakText}
      className={`audio-button ${isSpeaking ? 'speaking' : ''} ${className}`}
      aria-label={isSpeaking ? 'Parar leitura' : 'Ouvir o Dentinho Molar'}
      title={isSpeaking ? 'Parar leitura' : 'Ouvir o Dentinho Molar'}
    >
      <Volume2 size={18} />
    </button>
  );
};

const categories = [
  { id: 'adventure', name: 'AVENTURA', color: 'category-adventure', icon: '🏃' },
  { id: 'princesses', name: 'PRINCESAS', color: 'category-princesses', icon: '👸' },
  { id: 'educational', name: 'EDUCATIVOS', color: 'category-educational', icon: '📖' },
  { id: 'superheroes', name: 'SUPER HERÓIS', color: 'category-superheroes', icon: '🦸' },
  { id: 'clipes', name: 'MUSICAIS', color: 'category-superheroes', icon: '🎶' },
];

const barbieEpisodes = [
  { title: "Carteira de Motorista", url: "https://drive.google.com/file/d/11GABnX7EPmPvF00Io9lNteMZG_9xja1t/view?usp=sharing", thumbnail: barbie, duration: "03min", description: "Barbie está super animada para tirar sua carteira de motorista! Acompanhe essa aventura cheia de diversão enquanto ela aprende sobre responsabilidade no trânsito." },
  { title: "Empório Empírico de Malibu", url: "https://drive.google.com/file/d/14SYrc7YR1Wjixb9Y9rEdPNrelgjSLTug/view?usp=sharing", thumbnail: barbie, duration: "11 min", description: "Barbie e suas irmãs abrem uma loja especial em Malibu! Descubra como o trabalho em equipe e a criatividade tornam tudo possível." },
  { title: "Gincana das Irmãs", url: "https://drive.google.com/file/d/16XufCuO1aZCTMPQhMdNYZW_c8QZL7Ger/view?usp=sharing", thumbnail: barbie, duration: "13 min", description: "Uma competição amistosa entre irmãs! Barbie e suas irmãs participam de desafios divertidos que ensinam sobre esportividade e união familiar." },
  { title: "Música da Barbie Girl", url: "https://drive.google.com/file/d/12q6V84j_hsnbsUyDR9qkZ0ZEEW7hqByq/view?usp=sharing", thumbnail: barbie, duration: "10 min", description: "Barbie mostra seu talento musical! Um episódio cheio de ritmo, dança e mensagens positivas sobre seguir seus sonhos." },
  { title: "Vamos Montar uma Boneca", url: "https://drive.google.com/file/d/1efciYGAOBPnIvGZydBMyZ-vuKM0kzdBE/view?usp=sharing", thumbnail: barbie, duration: "14 min", description: "Barbie ensina sobre criatividade e customização! Aprenda como cada pessoa é única e especial do seu próprio jeito." },
  { title: "Um Dia na Praia", url: "https://drive.google.com/file/d/1htDfnChBZJQwkVIZeGsutpCJItMpcMOC/view?usp=sharing", thumbnail: barbie, duration: "12 min", description: "Diversão garantida na praia de Malibu! Barbie e suas amigas curtem o sol enquanto aprendem sobre cuidados com o meio ambiente marinho." },
  { title: "Presa no Armário", url: "https://drive.google.com/file/d/1g3uzn_B5L788DODmRjntUKcDWWlTQxTv/view?usp=sharing", thumbnail: barbie, duration: "15 min", description: "Uma aventura inesperada! Barbie precisa usar sua inteligência e criatividade para resolver um problema engraçado." },
  { title: "Maratona de Aventuras da Barbie Dreamhouse", url: "https://drive.google.com/file/d/11bR2dkuKIaqlg17H0kEUu60d6qc9M7RY/view?usp=sharing", thumbnail: barbie, duration: "15 min", description: "Vários episódios seguidos cheios de aventuras! Acompanhe Barbie em momentos especiais na Dreamhouse com muita diversão e aprendizado." },
];

const charlieLollaEpisodes = [
  { title: "Charlie e Lola - Eu Adoro Ir Para a Casa do Vovô e da Vovó", url: "https://drive.google.com/file/d/1jGqw5aFL0paGqv9UebLK9p7HjcNsu36P/view?usp=sharing", thumbnail: charlieLolla, duration: "15 min", description: "Lola está animada para visitar os avós! Uma história sobre amor familiar, respeito aos mais velhos e a importância dos laços familiares." },
  { title: "Charlie e Lola - Boo! Te Assustei!", url: "https://drive.google.com/file/d/1WhvJflJp9KCYHjtho_P4K5ZzyFGmcVrb/view?usp=sharing", thumbnail: charlieLolla, duration: "12 min", description: "Lola adora assustar! Charlie ensina sua irmãzinha sobre brincadeiras saudáveis e como saber quando parar." },
  { title: "Charlie e Lola - Eu Quero Tocar Música Também", url: "https://drive.google.com/file/d/1phL8a3SOPP46slxeUh6g5iLdf6_dEUn8/view?usp=sharing", thumbnail: charlieLolla, duration: "10 min", description: "Lola descobre o mundo da música! Uma aventura sobre persistência, prática e descobrir seus próprios talentos." },
  { title: "Charlie e Lola - Eu Sou Um Jacaré", url: "https://drive.google.com/file/d/10mue_Nk2scnC6p8J0xXJImcBOYt8PqCW/view?usp=sharing", thumbnail: charlieLolla, duration: "10 min", description: "A imaginação de Lola não tem limites! Descubra como o faz de conta ajuda as crianças a aprender sobre o mundo." },
  { title: "Charlie e Lola - Quero Ser Grande", url: "https://drive.google.com/file/d/1ultZcyZepolyBcVV1Ohmg6us5rm5F1r5/view?usp=sharing", thumbnail: charlieLolla, duration: "10 min", description: "Lola quer crescer rápido! Charlie a ajuda a entender que cada fase da vida é especial e deve ser aproveitada." },
  { title: "Charlie e Lola - Eu Não Quero Que Meu Dente Mole Caia", url: "https://drive.google.com/file/d/16l3Xr4MSq5W3QdvCguFDr31xN9_T3d0Y/view?usp=sharing", thumbnail: charlieLolla, duration: "14 min", description: "O dente de Lola está mole! Charlie a ajuda a superar o medo de mudanças, ensinando sobre crescimento e coragem." },
  { title: "Charlie e Lola - Posso Fazer Tudo Sozinha (parte 1)", url: "https://drive.google.com/file/d/1Zd_bq5RqK5iNHz-8LEOh2a7OOpTQAGY4/view?usp=sharing", thumbnail: charlieLolla, duration: "10 min", description: "Lola quer independência! Aprenda sobre autonomia infantil e a importância de tentar fazer as coisas sozinho." },
  { title: "Charlie e Lola - Posso Fazer Tudo Sozinha (parte 2)", url: "https://drive.google.com/file/d/12GHLNe04I-jbNUerGVNWJ7lcWBba3uFo/view?usp=sharing", thumbnail: charlieLolla, duration: "15 min", description: "Continuação da jornada de independência de Lola! Descubra que pedir ajuda quando necessário também é importante." },
  { title: "Charlie e Lola - Eu Nunca Vou Comer Tomate", url: "https://drive.google.com/file/d/1qJG3fR9KxJY1tnmSLDvcQddF3pRe_GjU/view?usp=sharing", thumbnail: charlieLolla, duration: "15 min", description: "Lola é difícil para comer! Charlie usa criatividade para incentivar alimentação saudável de forma divertida." }
];

const bobEsponjaEpisodes = [
  { title: "Bob Esponja - Bob Esponja Está de Volta à Autoescola!", url: "https://drive.google.com/file/d/1-18sLSruCMmxbjqFioUhEODkWKZIkTFu/view?usp=sharing", thumbnail: bobEsponja, duration: "20 min", description: "Bob tenta mais uma vez passar no teste de direção! Uma história sobre não desistir dos sonhos e persistir mesmo com dificuldades." },
  { title: "Bob Esponja - Plankton se Aposenta", url: "https://drive.google.com/file/d/1ADO7hXNEz2hNeBMVxWRzA26nrBpjLHod/view?usp=sharing", thumbnail: bobEsponja, duration: "13 min", description: "Plankton decide parar de roubar a fórmula secreta! Descubra o que acontece quando até os vilões precisam de descanso." },
  { title: "Bob Esponja - 1 Hora Sem Parar!", url: "https://drive.google.com/file/d/1j6w69djufq9j4qdypOoXWrv0gIpxBFqE/view?usp=sharing", thumbnail: bobEsponja, duration: "24 min", description: "Episódios seguidos de pura diversão submarina! Bob Esponja e Patrick em várias aventuras hilárias na Fenda do Biquíni." },
  { title: "Bob Esponja - As Experiências Alimentares Mais Estranhas de Sandy!", url: "https://drive.google.com/file/d/1x_RqEDpPrNeAb--6mkEo-8zylx_ZxW1g/view?usp=sharing", thumbnail: bobEsponja, duration: "44 min", description: "Sandy inventa receitas malucas! Uma aventura científica e culinária sobre experimentar coisas novas (mesmo quando parecem esquisitas!)." },
  { title: "Bob Esponja - O Siri Cascudo", url: "https://drive.google.com/file/d/1e08V8OYaiFPZqXe_Zq96EaNeXSx41Fox/view?usp=sharing", thumbnail: bobEsponja, duration: "13 min", description: "Um dia normal no restaurante mais famoso da Fenda do Biquíni! Acompanhe Bob fazendo o que mais ama: hambúrgueres deliciosos!" },
  { title: "Bob Esponja - Churrasco de Verão do Hambúrguer de Siri", url: "https://drive.google.com/file/d/1vcwCCjfM--ux1eDJyvj1LOmbpCjIxkHt/view?usp=sharing", thumbnail: bobEsponja, duration: "14 min", description: "Festa de verão no Siri Cascudo! Bob e seus amigos celebram com comida e diversão, ensinando sobre amizade e trabalho em equipe." }
];

const casteloRatimbumEpisodes = [
  { title: "Castelo Rá-Tim-Bum - Eugênio, o Gênio", url: "https://drive.google.com/file/d/12exh1xrbwTVNnuXG9tNz1k61m6BUJHWe/view?usp=sharing", thumbnail: castelo, duration: "30 min", description: "Conheça Eugênio, o gênio inventor! Um episódio sobre criatividade, ciência e as invenções malucas que surgem no Castelo." },
  { title: "Castelo Rá-Tim-Bum - Hora de Dormir", url: "https://drive.google.com/file/d/1Cvdk_O01THeW0yetS8CkdX5hokQdmsl0/view?usp=sharing", thumbnail: castelo, duration: "28 min", description: "Nino aprende sobre a importância do sono! Uma aventura educativa sobre rotinas saudáveis e porque precisamos dormir bem." },
  { title: "Castelo Rá-Tim-Bum - Ratinho Tomando Banho (Banho É Bom)", url: "https://drive.google.com/file/d/1hN1Iu68mCjrOfmL1Eyq_ajW4rMdCvxAA/view?usp=sharing", thumbnail: castelo, duration: "25 min", description: "A música mais famosa sobre higiene! Aprenda com o Ratinho que tomar banho é divertido e muito importante para a saúde." },
  { title: "Castelo Rá-Tim-Bum - Bruxas Boas", url: "https://drive.google.com/file/d/17kPOafv3KrW8qDQLvIkQlPCUex5z1nSU/view?usp=sharing", thumbnail: castelo, duration: "54 min", description: "Nem todas as bruxas são más! Uma história sobre não julgar pelas aparências e descobrir que todos podem ser amigos." },
  { title: "Castelo Rá-Tim-Bum - Ratinho Escovando os Dentes", url: "https://drive.google.com/file/d/1wwZ5vHzu47lxqaZ9O8x5ZvsDhyCW9Bam/view?usp=sharing", thumbnail: castelo, duration: "27 min", description: "Escove os dentes com o Ratinho! Uma lição musical super divertida sobre cuidados com a saúde bucal e higiene dental." },
  { title: "Castelo Rá-Tim-Bum - Tchau Não, Até Amanhã!", url: "https://drive.google.com/file/d/1MQlO_3l-gPr3UUeqpH8Ru9ygtLttT6py/view?usp=sharing", thumbnail: castelo, duration: "02 min", description: "A despedida mais querida da TV brasileira! Um momento especial que ensina sobre saudades e a alegria de se encontrar novamente." }
];

const patrulhaCaninaEpisodes = [
  { title: "Patrulha Canina - 1 HORA dos Resgates Mais Corajosos!", url: "https://drive.google.com/file/d/1aSBUbJ4AG7vIxj1rRhr8hKCgFHNgoPGw/view?usp=sharing", thumbnail: patrulhacanina, duration: "15 min", description: "Os filhotes mais corajosos em ação! Vários resgates emocionantes que ensinam sobre trabalho em equipe, coragem e ajudar o próximo." },
  { title: "Patrulha Canina - Marshall Ganha uma Corrida de Bombeiro!", url: "https://drive.google.com/file/d/1OweRrRNHx70PRDAKR0MoKxCppsguKXXu/view?usp=sharing", thumbnail: patrulhacanina, duration: "14 min", description: "Marshall mostra suas habilidades! Aprenda sobre superação, treino e que todos podem alcançar seus objetivos com dedicação." },
  { title: "Patrulha Canina - Poderosos Filhotes Contra Animais Gigantes!", url: "https://drive.google.com/file/d/1Ehd6azn9f9qBdfK1-OBrbmzpEFGFnYr_/view?usp=sharing", thumbnail: patrulhacanina, duration: "16 min", description: "Uma aventura épica! Os filhotes enfrentam desafios gigantes e mostram que tamanho não importa quando se tem coragem e inteligência." },
  { title: "Patrulha Canina - O Resgate da Skye na Tempestade de Neve!", url: "https://drive.google.com/file/d/1vkxFuAo3nE98cIq7e2cRw4i6IXqkwB7Y/view?usp=sharing", thumbnail: patrulhacanina, duration: "18 min", description: "Skye enfrenta uma tempestade! Uma missão emocionante sobre enfrentar medos e a importância de confiar em si mesmo." },
  { title: "Patrulha Canina - Hora dos Filhotes! - parte 1", url: "https://drive.google.com/file/d/1rCOJd-quJ1yXzY7I0W0L4sJVn5aGqVF_/view?usp=sharing", thumbnail: patrulhacanina, duration: "1h", description: "Episódios especiais dos filhotes! Muitas aventuras seguidas mostrando como cada membro da equipe é importante e único." },
  { title: "Patrulha Canina - O Melhor Dia de Todos! - parte 1", url: "https://drive.google.com/file/d/17tTd6d4NbxfqETcl3xMZbGOBpvPStcpg/view?usp=sharing", thumbnail: patrulhacanina, duration: "1h", description: "Celebração na Baía da Aventura! Os filhotes aproveitam um dia especial cheio de amizade, diversão e boas ações." }
];

const mundoBitaEpisodes = [
  { title: "Mundo Bita - Farra da Capivara", url: "https://drive.google.com/file/d/1zsRv78_Uc1CbvKg3fgqm_C7tIwcb96Um/view?usp=sharing", thumbnail: mundobita, duration: "25 min", description: "Conheça a capivara mais divertida! Uma música alegre que ensina sobre animais brasileiros e preservação da natureza." },
  { title: "Mundo Bita - Dinossauros", url: "https://drive.google.com/file/d/1SpMkQkpG7kzLEVj-Rd_IOufEC7aPVQ_b/view?usp=sharing", thumbnail: mundobita, duration: "23 min", description: "Viaje no tempo com Bita! Descubra os dinossauros de forma musical e aprenda sobre história natural e paleontologia." },
  { title: "Mundo Bita - Alfabita", url: "https://drive.google.com/file/d/1SVHGDLxY6SZ7y2_A27whn6j9x6oRdagp/view?usp=sharing", thumbnail: mundobita, duration: "22 min", description: "Aprenda o alfabeto cantando! Uma forma divertida e musical de conhecer as letras e começar a alfabetização." },
  { title: "Mundo Bita - Meu Pequeno Coração", url: "https://drive.google.com/file/d/1yZsTHehOGXGxyh34AGvzs-LvAxxcbhae/view?usp=sharing", thumbnail: mundobita, duration: "21 min", description: "Uma canção sobre sentimentos! Bita ensina as crianças a identificar e expressar suas emoções de forma saudável." },
  { title: "Mundo Bita - Insetos", url: "https://drive.google.com/file/d/1hy5-j5Z8vP28AAfnU8P4isC3_N353JcY/view?usp=sharing", thumbnail: mundobita, duration: "28 min", description: "O mundo dos insetos em música! Aprenda sobre a importância dos bichinhos pequenos para o meio ambiente." },
  { title: "Mundo Bita - Lagoa do Sapo Seresta", url: "https://drive.google.com/file/d/1bjZlN1V_c8WKnOEspwvCau6k9gd5syyT/view?usp=sharing", thumbnail: mundobita, duration: "27 min", description: "Um show musical na lagoa! Sapos e outros animais aquáticos ensinam sobre ecossistemas e vida na água." },
  { title: "Mundo Bita - Fazendinha", url: "https://drive.google.com/file/d/1MCPDHvw6DRmvztEfSZCxvIMZ67_p_pzP/view?usp=sharing", thumbnail: mundobita, duration: "27 min", description: "Conheça os animais da fazenda! Uma aventura musical que ensina sobre vida no campo e animais domésticos." }
];

const superpoderosasEpisodes = [
  { title: "As Meninas Superpoderosas - Dimensão Fantasma", url: "https://drive.google.com/file/d/1_xb1poFiQf-Xtc2xe5HqMPqKLZX1N7iu/view?usp=sharing", thumbnail: meninas, duration: "20 min", description: "Lindinha, Florzinha e Docinho enfrentam fantasmas! Uma aventura sobre coragem e enfrentar o desconhecido em equipe." },
  { title: "As Meninas Superpoderosas - As Melhores Heroínas Que Você Vai Ver", url: "https://drive.google.com/file/d/1lBTviucpgPYNPABBU68w6lDiR7TGzA87/view?usp=sharing", thumbnail: meninas, duration: "18 min", description: "As meninas mostram por que são as maiores heroínas! Episódios que ensinam sobre empoderamento feminino e força interior." },
  { title: "As Meninas Superpoderosas - Minisódios", url: "https://drive.google.com/file/d/1x4llA0fbaDTBn74qKSBmTtNxTl2VVs-K/view?usp=sharing", thumbnail: meninas, duration: "19 min", description: "Aventuras curtas e intensas! Várias histórias rápidas cheias de ação, humor e lições sobre fazer o bem." },
  { title: "As Meninas Superpoderosas - Duelo Real", url: "https://drive.google.com/file/d/1TIz-ZZ9mw2IxNjKhz48-_VbAaVgKIr5I/view?usp=sharing", thumbnail: meninas, duration: "21 min", description: "Uma competição épica! As meninas aprendem que rivalidade saudável pode ser divertida quando há respeito." },
  { title: "As Meninas Superpoderosas - Confusão no Minigolfe", url: "https://drive.google.com/file/d/15L77464C0w4_ZMYr3LIh__5m1--7PD3N/view?usp=sharing", thumbnail: meninas, duration: "1h", description: "Diversão e confusão no minigolfe! Aprenda sobre esportividade, paciência e que nem sempre é preciso usar superpoderes." },
  { title: "As Meninas Superpoderosas - Amor em Todas as Cores", url: "https://drive.google.com/file/d/17fhaAZ5hiZMpx5cg4NTk-3Jf8AilrGrS/view?usp=sharing", thumbnail: meninas, duration: "18 min", description: "Uma mensagem sobre diversidade e amor! As meninas ensinam que todos merecem respeito e carinho, independente das diferenças." },
  { title: "As Meninas Superpoderosas - A União Faz a Força", url: "https://drive.google.com/file/d/1X0Hl06XlA9VWJn3cbJRgvuNu8slGIwiH/view?usp=sharing", thumbnail: meninas, duration: "22 min", description: "Juntas elas são mais fortes! Uma lição poderosa sobre trabalho em equipe e como a união supera qualquer desafio." }
];

const galinhaPintadinhaEpisodes = [
  { title: "Galinha Pintadinha - DVDs 1, 2, 3, 4 e 5 Completos", url: "https://drive.google.com/file/d/1MIxrtXJxblTWSPvONz5vyoHe7WtN9O_3/view?usp=sharing", thumbnail: galinha, duration: "02 min", description: "Todos os DVDs da Galinha mais querida! Uma coletânea completa de músicas educativas e divertidas para cantar junto." },
  { title: "Galinha Pintadinha - Música das Vogais", url: "https://drive.google.com/file/d/160ofCxeCy399GvHg-wHZtukRMv61kGC7/view?usp=sharing", thumbnail: galinha, duration: "02 min", description: "A, E, I, O, U! Aprenda as vogais cantando de um jeito super divertido e fácil de memorizar." },
  { title: "Galinha Pintadinha - O Meu Galinho", url: "https://drive.google.com/file/d/10wgmmp47SYywpU8STkL3S0ortaqXbUdx/view?usp=sharing", thumbnail: galinha, duration: "02 min", description: "Uma música tradicional brasileira! Conheça o galinho mais famoso das cantigas infantis." },
  { title: "Galinha Pintadinha - Mestre André", url: "https://drive.google.com/file/d/1FvKKgZXmQBqmfgDe98nW2tdwJEq4-roj/view?usp=sharing", thumbnail: galinha, duration: "22 min", description: "Era uma vez, um Mestre André! Uma cantiga clássica que ensina sobre ritmo, repetição e coordenação motora." },
  { title: "Galinha Pintadinha - Dona Aranha", url: "https://drive.google.com/file/d/1i1gtarHA9r3rlZB_W0F1hf5e_h2ra7h6/view?usp=sharing", thumbnail: galinha, duration: "25 min", description: "A aranha subiu pela parede! Uma música sobre persistência e não desistir, mesmo quando chove." },
  { title: "Galinha Pintadinha - Parabéns da Galinha Pintadinha", url: "https://drive.google.com/file/d/18tKTvwejHC00E8DTAY2nkjVNpqXqWhUI/view?usp=sharing", thumbnail: galinha, duration: "28 min", description: "Celebre seu aniversário! A versão mais fofa e animada da música de Parabéns para você." },
  { title: "Galinha Pintadinha - Upa Cavalinho", url: "https://drive.google.com/file/d/1rFR2XmOrL-UZBj4q0gW0ikeZfcURqWK4/view?usp=sharing", thumbnail: galinha, duration: "23 min", description: "Upa, upa, cavalinho! Uma cantiga tradicional sobre imaginação e brincadeiras de cavalgar." }
];

const chavesDesenhoAnimadoEpisodes = [
  { title: "Chaves em Desenho Animado - O Táxi do Chaves", url: "https://drive.google.com/file/d/1JSIPOK77lDpFJ6lckL3QDXxQf4nh_YSb/view?usp=sharing", thumbnail: chaves, duration: "15 min", description: "Chaves vira motorista de táxi! Uma aventura hilária sobre trabalho, responsabilidade e as confusões que só o Chaves consegue fazer." },
  { title: "Chaves em Desenho Animado - Uma Mosca no Café", url: "https://drive.google.com/file/d/1RE5sec54Vb-FyhdQW04aTwJdbtIQ3wlO/view?usp=sharing", thumbnail: chaves, duration: "16 min", description: "Uma mosca causa confusão na vila! Chaves e os amigos vivem situações engraçadas enquanto tentam resolver o problema." },
  { title: "Chaves em Desenho Animado - Seu Madruga Cabeleireiro", url: "https://drive.google.com/file/d/1YTFimwhH9Hh1dtbmdkF_rkcdcpvj8qGO/view?usp=sharing", thumbnail: chaves, duration: "14 min", description: "Seu Madruga abre um salão! Uma história sobre tentar coisas novas e que nem sempre tudo sai como planejado." },
  { title: "Chaves em Desenho Animado - O Parque de Diversões", url: "https://drive.google.com/file/d/1JYOJ5nnMIRnAA9yndplZZbimVWWCuPmY/view?usp=sharing", thumbnail: chaves, duration: "17 min", description: "Diversão no parque de diversões! Chaves e a turma aproveitam um dia especial cheio de brincadeiras e aventuras." },
  { title: "Chaves em Desenho Animado - Refrescos do Chaves", url: "https://drive.google.com/file/d/1ptMe2_iLYid8_qbOMjwLXQlfj5Vn83RR/view?usp=sharing", thumbnail: chaves, duration: "16 min", description: "Chaves vende refrescos! Uma lição sobre empreendedorismo infantil e as trapalhadas típicas do personagem mais querido." },
  { title: "Chaves em Desenho Animado - Borbulhas e Mais Borbulhas", url: "https://drive.google.com/file/d/1IIj44UJwvDFfwFyKyZOn9RYEvq2rurHb/view?usp=sharing", thumbnail: chaves, duration: "18 min", description: "Borbulhas invade tudo! Uma aventura divertida sobre limpeza, organização e como pequenas coisas podem causar grandes confusões." },
  { title: "Chaves em Desenho Animado - O Vôo do Chaves", url: "https://drive.google.com/file/d/1eB96wN0-SThDLFwHfG_2zVAHqrD_BRyr/view?usp=sharing", thumbnail: chaves, duration: "15 min", description: "Chaves sonha em voar! Uma história sobre imaginação, sonhos e as aventuras que podemos viver em nossa mente." }
];

const educativosEpisodes = [
  { title: "TANGRAM - Lenda e Montagem", url: "https://drive.google.com/file/d/1q4ZPYGJkJuWj63K-MDnOJW4MorhCS2Ro/view?usp=sharing", thumbnail: educativos, duration: "20 min", description: "Descubra o quebra-cabeça chinês! Aprenda a lenda do Tangram e desenvolva raciocínio espacial montando formas geométricas." },
  { title: "Respeito aos Idosos - Anjinhos da Esperança", url: "https://drive.google.com/file/d/1uY1qPy7iAoKwcXOwBBoBzuDY0mCbRqlU/view?usp=sharing", thumbnail: educativos, duration: "25 min", description: "Uma lição sobre respeito e carinho! Aprenda a importância de cuidar e valorizar nossos avós e pessoas mais velhas." },
  { title: "MARATONA DO MEIO AMBIENTE", url: "https://drive.google.com/file/d/15Ehs3m1bJM1DcS6cL70EPk2xvYjhQYqD/view?usp=sharing", thumbnail: educativos, duration: "30 min", description: "Cuide do nosso planeta! Várias histórias sobre preservação ambiental, reciclagem e como ser um defensor da natureza." },
  { title: "Cocoricó Fala Sobre a Água", url: "https://drive.google.com/file/d/1J8lzgqSq90hmLLD3wT-9qoUatNrPGYoM/view?usp=sharing", thumbnail: educativos, duration: "22 min", description: "A água é vida! A turma do Cocoricó ensina sobre a importância da água e como não desperdiçar esse recurso precioso." },
  { title: "DESCUBRA QUAL É A FRUTA", url: "https://drive.google.com/file/d/1_Lp5Uoh0-3RqoNUagA7ubTn0MdcquHGJ/view?usp=sharing", thumbnail: educativos, duration: "25 min", description: "Jogo educativo de frutas! Aprenda sobre alimentação saudável enquanto descobre diferentes tipos de frutas e seus benefícios." },
  { title: "Aprenda os Números de 1 a 10", url: "https://drive.google.com/file/d/114-tjhqscuot6ol4nceiEvaqdDCm5ufX/view?usp=sharing", thumbnail: educativos, duration: "20 min", description: "Matemática divertida! Conte de 1 a 10 de forma lúdica e desenvolva habilidades numéricas básicas." },
  { title: "Histórias Sobre Respeito, Amizade e Aceitação", url: "https://drive.google.com/file/d/1ij9ky-AV2aUq4tZtkRUi3pda19vE3tKg/view?usp=sharing", thumbnail: educativos, duration: "25 min", description: "Valores importantes! Histórias emocionantes que ensinam sobre empatia, gentileza e aceitar as diferenças dos outros." },
  { title: "Turma da Mônica - Juntos pela Igualdade", url: "https://drive.google.com/file/d/1JYM-4KibPxupUKe5frdySVgU10xO0F5d/view?usp=sharing", thumbnail: educativos, duration: "30 min", description: "Todos somos iguais! Mônica e sua turma ensinam sobre igualdade, direitos e respeito às diferenças." },
  { title: "Viva as Diferenças! Um Mundo Melhor", url: "https://drive.google.com/file/d/1qO4aUcmVykQgPPn__EHywhQzWdZAA4Di/view?usp=sharing", thumbnail: educativos, duration: "20 min", description: "Diversidade é bonita! Aprenda que cada pessoa é única e especial, e que isso torna o mundo mais interessante." },
  { title: "Dengue - Combate à Dengue", url: "https://drive.google.com/file/d/1qR959iQchfs13hpNp0ubpdtfwk4HiGAJ/view?usp=sharing", thumbnail: educativos, duration: "30 min", description: "Saúde em primeiro lugar! Aprenda a prevenir a dengue e outras doenças transmitidas por mosquitos." },
  { title: "OrthoDontic - Super Bob Dente Contra as Bactérias", url: "https://drive.google.com/file/d/1l5uTfxhBja4gAGFQr48FRZjY2aiEzAqT/view?usp=sharing", thumbnail: educativos, duration: "28 min", description: "Heróis da saúde bucal! Bob Dente ensina como escovar bem os dentes e combater as bactérias malvadas." },
  { title: "Clubinho Honda - Segurança no Trânsito", url: "https://drive.google.com/file/d/1md4Tq3cE-r9vWqNQYXUCOR_X5NMk8E1X/view?usp=sharing", thumbnail: educativos, duration: "35 min", description: "Atravesse com segurança! Aprenda regras importantes de trânsito para pedestres e ciclistas." },
  { title: "Animais Vertebrados e Invertebrados", url: "https://drive.google.com/file/d/1T83J7czWcMQaog-QmgPpTiw88fFhHqM/view?usp=sharing", thumbnail: educativos, duration: "30 min", description: "Biologia divertida! Descubra a diferença entre animais com e sem coluna vertebral de forma didática." },
  { title: "JOÃOZINHO E SEUS DENTINHOS", url: "https://drive.google.com/file/d/1zx6GqIj3m6kjdixx9ApmtwbXuH2lvq9I/view?usp=sharing", thumbnail: educativos, duration: "25 min", description: "Cuide dos seus dentes! Joãozinho ensina sobre higiene bucal, escovação e a importância de ir ao dentista." },
  { title: "Sistema Solar para Crianças - Planeta por Planeta", url: "https://drive.google.com/file/d/116t1VpXX31Fj0YdDqfu9S9Qc-q1ccWRy/view?usp=sharing", thumbnail: educativos, duration: "20 min", description: "Viaje pelo espaço! Conheça todos os planetas do Sistema Solar e aprenda curiosidades sobre o universo." },
  { title: "Xuxa - Abecedário da Xuxa", url: "https://drive.google.com/file/d/1RgRDLDFTGSxh8Nn7shs9jXj-Xk1WTCmm/view?usp=sharing", thumbnail: educativos, duration: "25 min", description: "Aprenda o alfabeto com a Xuxa! Uma forma musical e divertida de conhecer todas as letras." },
  { title: "A IDADE DAS ÁRVORES", url: "https://drive.google.com/file/d/1SKXr8UqdC_MoYsCsA-IlrKQ4SwT7I5uw/view?usp=sharing", thumbnail: educativos, duration: "30 min", description: "Árvores contam histórias! Descubra como saber a idade de uma árvore e a importância das florestas." },
  { title: "MOVIMENTO DE ROTAÇÃO DA TERRA", url: "https://drive.google.com/file/d/1Z2P2CxszGISp4GnAQ4ZXSogYt6uBDpNe/view?usp=sharing", thumbnail: educativos, duration: "30 min", description: "Por que a Terra gira? Entenda o movimento de rotação e como ele cria o dia e a noite." },
  { title: "De Onde Vem o Dia e a Noite", url: "https://drive.google.com/file/d/1x6W7Ju1VA6mPxviuuvxdoIlrt6oaS0NJ/view?usp=sharing", thumbnail: educativos, duration: "30 min", description: "Astronomia para crianças! Descubra de forma simples como funciona a alternância entre dia e noite." },
  { title: "De Onde Vem o Fósforo", url: "https://drive.google.com/file/d/1FfrWZ40XLXqstJjGQf8av8-z9W_nIWHs/view?usp=sharing", thumbnail: educativos, duration: "30 min", description: "História do fósforo! Aprenda sobre a fabricação do fósforo e a importância de usar com segurança." },
  { title: "De Onde Vem o Leite", url: "https://drive.google.com/file/d/1Cdb-c-8buv91dY43inzdT6-pvvmxhFEf/view?usp=sharing", thumbnail: educativos, duration: "30 min", description: "Da fazenda à mesa! Descubra todo o processo de produção do leite e seus derivados." },
  { title: "Aprender Brincar - Aprender Cores - Compilação", url: "https://drive.google.com/file/d/187beE6TOrT59V9R1BXnduOsQrcYcymol/view?usp=sharing", thumbnail: educativos, duration: "25 min", description: "Mundo colorido! Aprenda todas as cores de forma divertida e interativa através de brincadeiras." },
  { title: "Aprender Brincar - Preparando-se para o Dia - Compilação", url: "https://drive.google.com/file/d/1a4NP7jB8OervIN1Dm8tlmS13bQFbLX6r/view?usp=sharing", thumbnail: educativos, duration: "20 min", description: "Rotina saudável! Aprenda a se preparar para o dia com higiene, café da manhã e organização." },
  { title: "Mundo Bita - Alfabita", url: "https://drive.google.com/file/d/1TXc7m0aPbSbZqpdCaGrgE3OP8Q63FlKW/view?usp=sharing", thumbnail: educativos, duration: "30 min", description: "Alfabetização musical! Bita ensina o alfabeto de forma super animada e fácil de aprender." }
];

const safeSpaceEpisodes = [
  { title: "Vila Sésamo - Maratona Hábitos Saudáveis", url: "https://drive.google.com/file/d/1Ir4t9CyLpY_0spbvdLmvUSKeeCil7pzf/view?usp=sharing", thumbnail: safe, duration: "30 min", description: "Saúde é divertido! A turma da Vila Sésamo ensina sobre alimentação, exercícios e cuidados com o corpo." },
  { title: "Vila Sésamo - Maratona Especial Autismo - Conheça a Júlia!", url: "https://drive.google.com/file/d/1rbwBx2VSSJohNkh10h5GtVw16EZsUNDY/view?usp=sharing", thumbnail: safe, duration: "30 min", description: "Inclusão e compreensão! Conheça Júlia e aprenda sobre autismo de forma sensível, respeitosa e educativa." },
  { title: "Caillou Dublado - É Bom Ser Criança", url: "https://drive.google.com/file/d/1voNIrRkk-VvmRhOGtLjsD6a2RbqwH3bX/view?usp=sharing", thumbnail: safe, duration: "1h", description: "Aventuras do dia a dia! Caillou vive experiências infantis que ajudam crianças a lidar com emoções e situações cotidianas." },
  { title: "Daniel Tigre - Aprendendo Hábitos Saudáveis", url: "https://drive.google.com/file/d/1w4vwtJOVLMTgXAf0_7PdozmUyQ4wlW-q/view?usp=sharing", thumbnail: safe, duration: "30 min", description: "Rotinas positivas! Daniel Tigre ensina hábitos saudáveis através de músicas e histórias acolhedoras." },
  { title: "Mundo Colorido - A Turma do Seu Lobato - TEA Autismo", url: "https://drive.google.com/file/d/142SEZjE2obkC5Kyp6RVHcAfxQgRkJdV7/view?usp=sharing", thumbnail: safe, duration: "30 min", description: "Educação inclusiva! Conteúdo especialmente desenvolvido para crianças no espectro autista com muito carinho e respeito." },
  { title: "Aprenda Formas - Aprenda com Dino o Dinossauro", url: "https://drive.google.com/file/d/1DK-8j4bxC0eIqf_CxZOrHAxhKPTbIYDi/view?usp=sharing", thumbnail: safe, duration: "08 min", description: "Geometria divertida! Dino o dinossauro ensina sobre círculos, quadrados, triângulos e outras formas." },
  { title: "POCOYO em Português - Cachorro Sujo", url: "https://drive.google.com/file/d/1cZ22JJiMa0rlys95jKjLL2ivYbJ1WUAZ/view?usp=sharing", thumbnail: safe, duration: "30 min", description: "Diversão com Pocoyo! Uma história engraçada sobre limpeza, responsabilidade e cuidar dos animais de estimação." }
];

const sophiaEpisodes = [
  { title: "Princesinha Sofia - Fliegel I Momentos Mágicos", url: "https://drive.google.com/file/d/1d1JHeWBPqj8J1otIwFJ-8RWEYDIo6NBS/view?usp=sharing", thumbnail: sophia, duration: "3 min", description: "Magia no reino! Sofia vive momentos mágicos com sua família e amigos, ensinando sobre bondade e coragem." },
  { title: "Princesinha Sofia - Demasiado Fofinha para Assustar", url: "https://drive.google.com/file/d/1JwGt-I23HmsIPaZUP_fG4OdplWx2JbJH/view?usp=sharing", thumbnail: sophia, duration: "4 min", description: "Nem tudo é como parece! Sofia descobre que ser gentil é mais importante do que parecer assustador." },
  { title: "Princesinha Sofia - A Varinha de Merlin", url: "https://drive.google.com/file/d/1xfWjjYr3pL23TAcdS8nzw8fjPqzGW14L/view?usp=sharing", thumbnail: sophia, duration: "6 min", description: "Aventura mágica! Sofia aprende sobre responsabilidade ao usar a poderosa varinha do mago Merlin." },
  { title: "Princesinha Sofia - A Festa do Pijama", url: "https://drive.google.com/file/d/1kp_k6DfrYjL5NQDM8wXzPpgdS_h1uS40/view?usp=sharing", thumbnail: sophia, duration: "4 min", description: "Noite divertida! Sofia e suas amigas aprendem sobre amizade, respeito e se divertir juntas." },
  { title: "Princesinha Sofia - Só Um dos Príncipes", url: "https://drive.google.com/file/d/175jU9-JSW8LDODTbJHb3NwsNzJmnEvfs/view?usp=sharing", thumbnail: sophia, duration: "4 min", description: "Igualdade é importante! Sofia mostra que meninos e meninas podem fazer as mesmas coisas e brincar juntos." },
  { title: "Princesinha Sofia - A Caverna dos Duendes", url: "https://drive.google.com/file/d/1D6wva5fg5bhzc8-SkiJS8lzu6j2Gbx-B/view?usp=sharing", thumbnail: sophia, duration: "4 min", description: "Exploração corajosa! Uma aventura emocionante sobre superar medos e trabalhar em equipe." },
  { title: "Princesinha Sofia - Momentos Especiais - Amuleto", url: "https://drive.google.com/file/d/15L6bOSlROKAv6gVhQbLtLd43Uq_65nNp/view?usp=sharing", thumbnail: sophia, duration: "4 min", description: "O poder do amuleto! Sofia aprende que a verdadeira magia vem do coração e das boas ações." }
];

const peppaEpisodes = [
  { title: "Peppa Pig - George Fica Doente / George Pega um Resfriado", url: "https://drive.google.com/file/d/1x4E8jRKlleb7Zjwzy0bkA6nDtzhK27xV/view?usp=sharing", thumbnail: peppa, duration: "1h", description: "George não está se sentindo bem! Peppa e a família cuidam dele, ensinando sobre saúde e cuidar dos outros." },
  { title: "Peppa Pig - O Carro Novo", url: "https://drive.google.com/file/d/1blxEXvc5S1QhcPK04RI_x8RJYKyVhWOl/view?usp=sharing", thumbnail: peppa, duration: "30 min", description: "A família tem um carro novo! Peppa e George descobrem que coisas novas podem ser emocionantes e divertidas." },
  { title: "Peppa Pig - Peppa Faz Pipoca!", url: "https://drive.google.com/file/d/109tHrHBphemWwzZKQh9vlRe-whEuwi7_/view?usp=sharing", thumbnail: peppa, duration: "21 min", description: "Hora do lanche! Peppa aprende a fazer pipoca e descobre a diversão de cozinhar com a família." },
  { title: "Peppa Pig - Vários Episódios Completos", url: "https://drive.google.com/file/d/1pn4AI9MTyjs3kxan9kgzflETMs9qdaGy/view?usp=sharing", thumbnail: peppa, duration: "27 min", description: "Muitas aventuras da Peppa! Episódios variados sobre família, amizade e as alegrias da infância." },
  { title: "Peppa Pig - Acampando", url: "https://drive.google.com/file/d/17lWBaD9c2arg66AHtz_j4uDR-dAA7nlk/view?usp=sharing", thumbnail: peppa, duration: "31 min", description: "Aventura ao ar livre! Peppa e a família acampam e aprendem sobre natureza e vida ao ar livre." },
  { title: "Peppa Pig - O Trem Noturno!", url: "https://drive.google.com/file/d/1qePOXjsUdnSkMmZUGQhhgkcgvEve1QqW/view?usp=sharing", thumbnail: peppa, duration: "27 min", description: "Viagem especial de trem! Uma jornada noturna cheia de descobertas e momentos em família." }
];

const peixonautaEpisodes = [
  { title: "Peixonauta - O Caso da Alta Velocidade", url: "https://drive.google.com/file/d/1RS7h_tAoW7Wwz4RZT0Ve-KOfwqi77I1R/view?usp=sharing", thumbnail: peixonauta, duration: "11 min", description: "Mistério para resolver! Peixonauta investiga por que tudo está muito rápido, ensinando sobre velocidade e segurança." },
  { title: "Peixonauta - O Caso da Bagunça Bagunçada", url: "https://drive.google.com/file/d/1imq1IR8o4_ZLQFsbrmzAe7NxQxpvagG1/view?usp=sharing", thumbnail: peixonauta, duration: "11 min", description: "Organização é importante! Os amigos aprendem sobre limpar e organizar através de uma divertida investigação." },
  { title: "Peixonauta - 1 Hora de Episódios Completos - FAÇA CHUVA OU FAÇA SOL", url: "https://drive.google.com/file/d/1_HL7pBAcR951Afz0zsmj81kAglBlurso/view?usp=sharing", thumbnail: peixonauta, duration: "12 min", description: "Aventuras ecológicas! Vários episódios sobre natureza, clima e meio ambiente com muito aprendizado." },
  { title: "Peixonauta - O Caso do Dente Perdido", url: "https://drive.google.com/file/d/1mYyETcaPsUM_xTzvkb66We1UEW-aQ0kN/view?usp=sharing", thumbnail: peixonauta, duration: "11 min", description: "Onde está o dente? Uma investigação sobre dentes de leite e cuidados com a saúde bucal." },
  { title: "Peixonauta - O Caso dos Gatos", url: "https://drive.google.com/file/d/134lZfGgM1kV0nPo8RYeFGyxh0mETqDGD/view?usp=sharing", thumbnail: peixonauta, duration: "1h", description: "Mistério felino! Peixonauta e amigos aprendem sobre comportamento dos gatos e respeito aos animais." },
  { title: "Peixonauta - O Caso do Dia de Sol", url: "https://drive.google.com/file/d/1bCj0q3z4C2O2BOJFVcOBgReTWtveZL-V/view?usp=sharing", thumbnail: peixonauta, duration: "1h", description: "Investigação solar! Descubra curiosidades sobre o Sol e sua importância para a vida na Terra." }
];

const lunaEpisodes = [
  { title: "O Show da Luna - MARATONA MELHORES EPISÓDIOS DA 1ª TEMPORADA", url: "https://drive.google.com/file/d/1w_V5Ers0BZHrNQzbzNDH4FBTxyNV3QuO/view?usp=sharing", thumbnail: luna, duration: "1H", description: "Ciência divertida! Os melhores episódios de Luna respondendo perguntas curiosas sobre o mundo com experimentos." },
  { title: "O Show da Luna - Eu Quero Saber - Melhores Músicas", url: "https://drive.google.com/file/d/1B5q1bLzzHYqgfFgXwdfAz_BSrF2Jd5X6/view?usp=sharing", thumbnail: luna, duration: "3 min", description: "Músicas educativas! As canções mais legais que ensinam ciência de forma musical e divertida." },
  { title: "O Show da Luna - MARATONA VIAGEM DE FÉRIAS", url: "https://drive.google.com/file/d/11IQDp7PxboYFVXD-klJuCz7h70N89zmF/view?usp=sharing", thumbnail: luna, duration: "35 min", description: "Descobertas em viagem! Luna explora novos lugares e aprende sobre geografia, cultura e natureza." },
  { title: "O Show da Luna - POR QUE O URSO POLAR É BRANCO?", url: "https://drive.google.com/file/d/1-cAIzrD5XicSBvQn00KlDcsvE_B8f-S7/view?usp=sharing", thumbnail: luna, duration: "12 min", description: "Curiosidades sobre animais! Luna descobre por que os ursos polares têm pelo branco e vivem no gelo." },
  { title: "O Show da Luna - A IDADE DAS ÁRVORES", url: "https://drive.google.com/file/d/1yGZdD2T6n1nvSgD0m4FFtroaz0fX6uWJ/view?usp=sharing", thumbnail: luna, duration: "12 min", description: "Botânica fascinante! Aprenda como descobrir quantos anos uma árvore tem através dos anéis do tronco." },
  { title: "O Show da Luna - MOVIMENTO DE ROTAÇÃO DA TERRA", url: "https://drive.google.com/file/d/1TRXQombSFMRD1UqQ9zN_sYXmDjKaoEel/view?usp=sharing", thumbnail: luna, duration: "12 min", description: "Astronomia para crianças! Luna explica de forma simples e divertida por que a Terra gira e o que isso causa." }
];

type Episode = {
  title: string;
  url: string;
  thumbnail: string;
  duration: string;
  description: string;
};

type Video = {
  id: number;
  title: string;
  duration: string;
  thumbnail: string;
  category: string;
  link?: string;
  episodes?: Episode[];
};

const videos: Video[] = [
  { id: 1, title: "Patrulha Canina", duration: "15 min", thumbnail: patrulhacanina, category: "Aventura", episodes: patrulhaCaninaEpisodes },
  { id: 3, title: "Superpoderosas", duration: "20 min", thumbnail: meninas, category: "Princesas", episodes: superpoderosasEpisodes },
  { id: 4, title: "Barbie", duration: "18 min", thumbnail: barbie, category: "Aventura", episodes: barbieEpisodes },
  { id: 5, title: "Bob Esponja", duration: "20 min", thumbnail: bobEsponja, category: "Aventura", episodes: bobEsponjaEpisodes },
  { id: 6, title: "PEIXONAUTA", duration: "30 min", thumbnail: peixonauta, category: "Aventura", episodes: peixonautaEpisodes },
  { id: 7, title: "CHAVES DESENHO ANIMADO", duration: "15 min", thumbnail: chaves, category: "Comédia", episodes: chavesDesenhoAnimadoEpisodes },
  { id: 8, title: "Peppa Pig", duration: "20 min", thumbnail: peppa, category: "Aventura", episodes: peppaEpisodes },
  { id: 9, title: "O SHOW DA LUNA", duration: "25 min", thumbnail: luna, category: "Aventura/Educativos", episodes: lunaEpisodes },
  { id: 10, title: "Charlie e Lolla", duration: "30 min", thumbnail: charlieLolla, category: "Fantasia", episodes: charlieLollaEpisodes },
  { id: 11, title: "Hora de Aprender: Desenhos Educativos", duration: "30 min", thumbnail: educativos, category: "Educativos", episodes: educativosEpisodes },
  { id: 12, title: "MUNDO BITA-MUSICAL", duration: "30 min", thumbnail: mundobita, category: "Musical", episodes: mundoBitaEpisodes },
  { id: 13, title: "GALINHA PINTADINHA", duration: "30 min", thumbnail: galinha, category: "Musical", episodes: galinhaPintadinhaEpisodes },
  { id: 14, title: "PRINCESINHA SOPHIA", duration: "30 min", thumbnail: sophia, category: "Princesas", episodes: sophiaEpisodes },
  { id: 15, title: "SAFE SPACE AFFECTUS-CRIANÇAS ATÍPICAS", duration: "30 min", thumbnail: safe, category: "Safe Space", episodes: safeSpaceEpisodes },
  { id: 16, title: "CASTELO RÁ-TIM-BUM", duration: "30 min", thumbnail: castelo, category: "Aventura", episodes: casteloRatimbumEpisodes }
];

export function VideosScreen() {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showName, setShowName] = useState("");
  const [showDescription, setShowDescription] = useState<number | null>(null);

  useEffect(() => {
    if (selectedVideo || showEpisodes) {
      document.body.classList.add('player-open');
    } else {
      document.body.classList.remove('player-open');
    }
    
    return () => {
      document.body.classList.remove('player-open');
    };
  }, [selectedVideo, showEpisodes]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (video.episodes &&
        video.episodes.some((ep) =>
          ep.title.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

  const handleVideoSelect = (link: string, title: string, videoEpisodes?: Episode[]) => {
    if (videoEpisodes && videoEpisodes.length > 0) {
      setEpisodes(videoEpisodes);
      setShowEpisodes(true);
      setShowName(title);
    } else {
      setSelectedVideo({ link, title });
      setEpisodes([]);
      setShowEpisodes(false);
      setShowName(title);
    }
  };

  const handleEpisodeSelect = (episodeIndex: number) => {
    const episode = episodes[episodeIndex];
    setCurrentEpisodeIndex(episodeIndex);
    setSelectedVideo({ link: episode.url, title: episode.title });
    setShowEpisodes(false);
  };

  const handlePreviousEpisode = () => {
    if (currentEpisodeIndex > 0) {
      const newIndex = currentEpisodeIndex - 1;
      const episode = episodes[newIndex];
      setCurrentEpisodeIndex(newIndex);
      setSelectedVideo({ link: episode.url, title: episode.title });
    }
  };

  const handleNextEpisode = () => {
    if (currentEpisodeIndex < episodes.length - 1) {
      const newIndex = currentEpisodeIndex + 1;
      const episode = episodes[newIndex];
      setCurrentEpisodeIndex(newIndex);
      setSelectedVideo({ link: episode.url, title: episode.title });
    }
  };

  const closePlayer = () => {
    setSelectedVideo(null);
  };
  const navigate = useNavigate();
    const [] = useState(false); 
    const [] = useState(false); 

  const goBack = () => {
    navigate('/HomeKids');
  };

  return (
    <div className="videos-screen">
    <button className="back-home" onClick={goBack}>
          <ArrowLeft size={24} color="#1f2937" />
        </button>
      <div className="main-container">
        <div className="brand-section">
          <div className="mascot-container2">
         
            <img src={dentinho1} alt="Mascote Colorir" className="mascot-image2" />
          </div>
          <div className="legal-text">
            <h2>
              LEGAL!
              <AudioButton text="LEGAL! O QUE VAMOS ASSISTIR HOJE?" className="header-audio" />
            </h2>
            <p>O QUE VAMOS ASSISTIR HOJE?</p>
          </div>
        </div>

        <div className="search-container3">
          <input
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="PESQUISAR"
            className="search-input3"
            aria-label="Pesquisar vídeos"
          />
          <button className="search-button3" aria-label="Buscar">
            <Search className="search-icon3" />
          </button>
        </div>

        <div className="categories-container">
          {categories.map((category) => (
            <Button
              key={category.id}
              className={`${category.color} category-button`}
              variant="default"
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
              <AudioButton text={category.name} className="category-audio" />
            </Button>
          ))}
        </div>
      </div>

      {/* Lista de Vídeos */}
      <div className="video-grid">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="video-card"
            onClick={() =>
              handleVideoSelect(video.link || "", video.title, video.episodes)
            }
          >
            <div className="video-thumbnail-container">
              <ImageWithFallback
                src={video.thumbnail}
                alt={video.title}
                className="video-thumbnail"
              />
              <div className="play-overlay">
                <Button size="icon" className="play-button">
                  <Play className="play-icon" fill="currentColor" />
                </Button>
              </div>
              {video.episodes && (
                <div className="duration-badge">{video.episodes.length} eps</div>
              )}
            </div>
            <div className="video-info">
              <h3 className="video-title">
                {video.title}
                <AudioButton text={video.title} className="title-audio" />
              </h3>
              {video.category && (
                <p className="video-category">
                  {video.category}
                  <AudioButton text={`Categoria: ${video.category}`} className="category-label-audio" />
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Episódios - OVERLAY */}
      {showEpisodes && (
        <div className="episode-overlay">
          <div className="episode-section">
            <div className="close-button-container">
              <Button
                className="close-button"
                onClick={() => setShowEpisodes(false)}
              >
                <X className="back-icon" size={20} /> Fechar
              </Button>
            </div>
            <h2 className="episode-header">
              QUAL EPISÓDIO VAMOS ASSISTIR?
              <AudioButton text="QUAL EPISÓDIO VAMOS ASSISTIR?" className="episode-header-audio" />
            </h2>
            <div className="episode-grid">
              {episodes.map((ep, index) => (
                <div
                  key={index}
                  className="episode-card"
                >
                  <div className="episode-thumbnail-container" onClick={() => handleEpisodeSelect(index)}>
                    <ImageWithFallback
                      src={ep.thumbnail}
                      alt={`Episódio ${index + 1}`}
                      className="episode-thumbnail"
                    />
                  </div>
                  <div className="episode-info">
                    <h3 className="episode-title">
                      {ep.title}
                      <AudioButton text={ep.title} className="episode-title-audio" />
                    </h3>
                    <span className="episode-duration">
                      {ep.duration}
                      <AudioButton text={`Duração: ${ep.duration}`} className="duration-audio" />
                    </span>
                    <Button
                      className={`description-button ${showDescription === index ? "active" : ""}`}
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDescription(showDescription === index ? null : index);
                      }}
                    >
                      {showDescription === index ? "Ocultar" : "Ver Descrição"}
                    </Button>
                    {showDescription === index && (
                      <p className="episode-description">
                        {ep.description}
                        <AudioButton text={ep.description} className="description-audio" />
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PLAYER - ACIMA DE TUDO */}
      {selectedVideo && (
        <div className="video-player-overlay">
          <div className="video-player-wrapper">
            {/* BOTÃO FECHAR NO TOPO DIREITO */}
            <button className="close-player-button" onClick={closePlayer} aria-label="Fechar player">
              <X size={24} />
            </button>
            
            {/* MOLDURA DO VIDEO */}
            <div className="video-frame">
              <div className="video-player-content">
                <iframe
                  src={getPreviewLink(selectedVideo.link)}
                  width="100%"
                  height="100%"
                  allow="autoplay"
                  allowFullScreen
                  className="video-iframe"
                  title={selectedVideo.title}
                ></iframe>
              </div>

              {/* BOTÕES SOBREPOSTOS AO VÍDEO */}
              <div className="video-controls-overlay">
                <Button
                  onClick={closePlayer}
                  className="video-control-btn video-control-back"
                  variant="ghost"
                  size="sm"
                >
                  <ArrowLeft size={16} />
                  Voltar
                </Button>
                
                {episodes.length > 0 && (
                  <>
                    <Button
                      onClick={handlePreviousEpisode}
                      disabled={currentEpisodeIndex === 0}
                      className="video-control-btn"
                      variant="ghost"
                      size="sm"
                    >
                      <SkipBack size={16} />
                      Anterior
                    </Button>
                    
                    <Button
                      onClick={handleNextEpisode}
                      disabled={currentEpisodeIndex === episodes.length - 1}
                      className="video-control-btn"
                      variant="ghost"
                      size="sm"
                    >
                      Próximo
                      <SkipForward size={16} />
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* INFORMAÇÕES DO VIDEO - NOME COMPLETO DO DESENHO E EPISÓDIO */}
            <div className="player-info">
              <h3 className="show-name">
                {showName}
                <AudioButton text={showName} className="show-name-audio" />
              </h3>
              <p className="current-video-title">
                {selectedVideo.title}
                <AudioButton text={selectedVideo.title} className="video-title-audio" />
              </p>
              {episodes.length > 0 && (
                <p className="episode-counter">
                  Episódio {currentEpisodeIndex + 1} de {episodes.length}
                  <AudioButton 
                    text={`Episódio ${currentEpisodeIndex + 1} de ${episodes.length}`} 
                    className="episode-counter-audio" 
                  />
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
