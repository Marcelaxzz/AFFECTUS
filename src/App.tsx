import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import BemVindo from "./pages/bemVindo";
import { HomeKids } from "./pages/homeKids";
import { VideosScreen } from "./pages/VideosScreen";
import TelaEscolha from "./pages/TelaEscolha";
import LerLivros from "./pages/LerLivros";
import ColorirLivros from "./pages/ColorirLivros";
import Colorir from "./pages/ColorirLivros";
import Certificados from "./pages/Certificados";
import Login from "./pages/Administrador/Login";
import PlaylistRelax from "./pages/Administrador/PlaylistRelax";
import Esqueceu from "./pages/Administrador/Esqueceu";
import Feedbacks from "./pages/Administrador/Feedbacks";
import GerarCertificado from "./pages/Administrador/GerarCertificado";
import Agendamentos from "./pages/Administrador/Agendamentos";
import FAQ from "./pages/Administrador/FAQ";
import DashboardAdmin from "./pages/Administrador/DashboardAdmin";
import MeusPacientes from "./pages/MeusPacientes";
import RelatorioOdontologico from "./pages/MeusRelatorio";
import TodosRelatorios from "./pages/Administrador/TodosRelatorios";
import GamesScreen from "./pages/games/GamesScreen";
import RelatorioDetalhado from "./pages/Administrador/RelatorioDetalhado";
import Historico from "./pages/Historico";
import JogoMemoria from "./pages/games/JogoMemoria";
import ArrastaSolta from "./pages/games/ArrastaSolta";
import AnagramaJogo from "./pages/games/Anagrama";
import JogoMatematico from "./pages/games/JogoMatematico";
import JogoEscovacao from "./pages/games/JogoEscovacao";
import JogoPirata from "./pages/games/JogoPirata";
import JogoDePares from "./pages/games/JogoDePares";
import JogoDaVelha from "./pages/games/JogoDaVelha";
import EquacaoInvisivel from "./pages/games/EquacaoInvisivel";
import JogoReflexo from "./pages/games/Reflexo";

import GameRouter from "./pages/games/GameRouter";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<BemVindo />} />
        <Route path="/HomeKids" element={<HomeKids />} />
        <Route path="/VideosScreen" element={<VideosScreen />} />
        <Route path="/TelaEscolha" element={<TelaEscolha />} />
        <Route path="/LerLivros" element={<LerLivros />} />
        <Route path="/ColorirLivros" element={<ColorirLivros />} />
        <Route path="/Colorir" element={<Colorir />} />
        <Route path="/Certificados" element={<Certificados />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/PlaylistRelax" element={<PlaylistRelax />} />
        <Route path="/Esqueceu" element={<Esqueceu />} />
        <Route path="/Feedbacks" element={<Feedbacks />} />
        <Route path="/GerarCertificado" element={<GerarCertificado />} />
        <Route path="/Agendamentos" element={<Agendamentos />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/MeusPacientes" element={<MeusPacientes />} />
        <Route path="/MeusRelatorio" element={<RelatorioOdontologico />} />
        <Route path="/TodosRelatorios" element={<TodosRelatorios />} />
        <Route path="/GamesScreen" element={<GamesScreen />} />
        <Route path="/Historico" element={<Historico />} />
        

        {/* 🔵 ROTA DINÂMICA CORRETA DO RELATÓRIO */}
      <Route path="/RelatorioDetalhado/:id" element={<RelatorioDetalhado />} />


        {/* 🔵 ROTA DINÂMICA DOS JOGOS */}
        <Route
          path="/game/:id"
          element={
            <GameRouter
              jogos={{
                1: <JogoMemoria aoSair={() => {}} efeitosAtivos={true} />,
                2: <ArrastaSolta />,
                3: <AnagramaJogo />,
                4: <JogoMatematico />,
                5: <JogoEscovacao />,
                6: <JogoPirata />,
                7: <JogoDePares />,
                8: <JogoDaVelha />,
                9: <EquacaoInvisivel />,
                10: <JogoReflexo />
              }}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
