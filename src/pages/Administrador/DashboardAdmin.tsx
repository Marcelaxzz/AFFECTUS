import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";
import { fetchFeedbacks, type Feedback } from "../../services/feedbacks";
import type { Relatorio } from "../../types/relatorio";
import type { Patient } from "../../types/patient";
import { fetchRelatorios } from "../../services/relatorios";
import { fetchPatients } from "../../services/patients";

const DashboardAdmin = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [fbLoading, setFbLoading] = useState(false);
  const [fbError, setFbError] = useState<string | null>(null);
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [rtLoading, setRtLoading] = useState(false);
  const [rtError, setRtError] = useState<string | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [ptLoading, setPtLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    setFbLoading(true);
    fetchFeedbacks(controller.signal)
      .then(setFeedbacks)
      .catch((e) => {
        if (e.name !== "AbortError") {
          setFbError(e.message);
        }
      })
      .finally(() => setFbLoading(false));
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const c1 = new AbortController();
    setRtLoading(true);
    fetchRelatorios(c1.signal)
      .then(setRelatorios)
      .catch((e) => {
        if (e.name !== "AbortError") setRtError(e.message);
      })
      .finally(() => setRtLoading(false));
    return () => c1.abort();
  }, []);

  useEffect(() => {
    const pController = new AbortController();
    setPtLoading(true);
    fetchPatients(pController.signal)
      .then(setPatients)
      .catch((e) => {
        if (e.name !== "AbortError") console.error(e);
      })
      .finally(() => setPtLoading(false));
    return () => pController.abort();
  }, []);

  const fbCounts = {
    Feliz: feedbacks.filter((f) => f.tipo === "Feliz").length,
    Normal: feedbacks.filter((f) => f.tipo === "Normal").length,
    Triste: feedbacks.filter((f) => f.tipo === "Triste").length,
  };
  const fbMax = Math.max(1, ...Object.values(fbCounts));
  const barScale = (v: number) => `${Math.round((v / fbMax) * 160)}px`;

  const monthNames = [
    "JAN",
    "FEV",
    "MAR",
    "ABR",
    "MAI",
    "JUN",
    "JUL",
    "AGO",
    "SET",
    "OUT",
    "NOV",
    "DEZ",
  ];
  const monthCounts: Record<string, number> = {};
  relatorios.forEach((r) => {
    const d = new Date(r.data);
    if (!isNaN(d.getTime())) {
      const m = d.getMonth();
      monthCounts[monthNames[m]] = (monthCounts[monthNames[m]] || 0) + 1;
    }
  });
  const sortedMonths = monthNames.filter((m) => monthCounts[m]).slice(0); // mantém ordem cronológica
  const maxMonthValue = Math.max(
    1,
    ...sortedMonths.map((m) => monthCounts[m] || 0)
  );
  const scaleMonth = (v: number) =>
    `${Math.round((v / maxMonthValue) * 160)}px`;

  return (
    <div style={styles.container}>
      {/* Mobile Menu Button */}
      <button
        style={styles.mobileMenuBtn}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="dash-mobile-menu-btn"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          style={styles.overlay}
          onClick={() => setSidebarOpen(false)}
          className="dash-sidebar-overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          ...styles.dashSidebar,
          ...(sidebarOpen ? styles.dashSidebarOpen : {}),
        }}
        className={`dash-sidebar ${sidebarOpen ? "dash-sidebar-open" : ""}`}
      >
        <div style={styles.userInfo}>
          <div style={styles.userAvatar}>👤</div>
          <span style={styles.userName}>PAULO CÉSAR</span>
        </div>

        <nav style={styles.dashNav}>
          <div style={styles.navSection}>
            <h4 style={styles.navTitle}>Dashboard</h4>
            <a
              href="#"
              style={{
                ...styles.navLink,
                ...(hoveredLink === "ver-mais" ? styles.navLinkHover : {}),
              }}
              onMouseEnter={() => setHoveredLink("ver-mais")}
              onMouseLeave={() => setHoveredLink(null)}
              onClick={() => setSidebarOpen(false)}
            >
              <span style={styles.icon}>📊</span>
              VER MAIS
            </a>
          </div>

          <div style={styles.navSection}>
            <a
              href="#"
              style={{
                ...styles.navLink,
                ...(hoveredLink === "novo-relatorio-1"
                  ? styles.navLinkHover
                  : {}),
              }}
              onMouseEnter={() => setHoveredLink("novo-relatorio-1")}
              onMouseLeave={() => setHoveredLink(null)}
              onClick={(e) => {
                e.preventDefault();
                setSidebarOpen(false);
                navigate("/MeusRelatorio");
              }}
            >
              <span style={styles.icon}>📄</span>
              NOVO RELATÓRIO
            </a>
          </div>

          <div style={styles.navSection}>
            <h4 style={styles.navTitle}>Pages</h4>
            <a
              href="#"
              style={{
                ...styles.navLink,
                ...(hoveredLink === "minha-conta" ? styles.navLinkHover : {}),
              }}
              onMouseEnter={() => setHoveredLink("minha-conta")}
              onMouseLeave={() => setHoveredLink(null)}
              onClick={() => setSidebarOpen(false)}
            >
              <span style={styles.icon}>👤</span>
              Minha Conta
            </a>
          </div>

          <div style={styles.navSection}>
            <a
              href="#"
              style={{
                ...styles.navLink,
                ...(hoveredLink === "novo-feedback" ? styles.navLinkHover : {}),
              }}
              onMouseEnter={() => setHoveredLink("novo-feedback")}
              onMouseLeave={() => setHoveredLink(null)}
              onClick={(e) => {
                e.preventDefault();
                setSidebarOpen(false);
                navigate("/Feedbacks");
              }}
            >
              <span style={styles.icon}>💬</span>
              NOVO FEEDBACK
            </a>
            <a
              href="#"
              style={{
                ...styles.navLink,
                ...(hoveredLink === "meus-pacientes"
                  ? styles.navLinkHover
                  : {}),
              }}
              onMouseEnter={() => setHoveredLink("meus-pacientes")}
              onMouseLeave={() => setHoveredLink(null)}
              onClick={(e) => {
                e.preventDefault();
                setSidebarOpen(false);
                navigate("/MeusPacientes");
              }}
            >
              <span style={styles.icon}>👥</span>
              Meus Pacientes
            </a>
            <a
              href="#"
              style={{
                ...styles.navLink,
                ...(hoveredLink === "novo-relatorio-2"
                  ? styles.navLinkHover
                  : {}),
              }}
              onMouseEnter={() => setHoveredLink("novo-relatorio-2")}
              onMouseLeave={() => setHoveredLink(null)}
              onClick={(e) => {
                e.preventDefault();
                setSidebarOpen(false);
                navigate("/MeusRelatorio");
              }}
            >
              <span style={styles.icon}>📄</span>
              NOVO RELATÓRIO
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={styles.main} className="dash-main-content">
        {/* Header */}
        <header style={styles.dashHeader} className="dash-header">
          <div style={styles.logoContainer} className="dash-logo-container">
            <img src={logo} alt="Affectus Logo" style={styles.logoImg} />
          </div>
          <div style={styles.headerContent} className="dash-header-content">
            <h2 style={styles.greeting}>OLÁ, PAULO!</h2>
            <p style={styles.subtitle}>ESSE É O SEU PAINEL PROFISSIONAL.</p>
          </div>
          <button style={styles.logoutBtn} className="dash-logout-btn">
            LOGOUT
          </button>
        </header>

        {/* Stats Cards */}
        <section style={styles.statsGrid} className="dash-stats-grid">
          <div
            style={{
              ...styles.statCard,
              backgroundColor: "#4CAF50",
              ...(hoveredCard === 1 ? styles.statCardHover : {}),
            }}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate("/Feedbacks")}
          >
            <h3 style={styles.statTitle}>FEEDBACKS DE ATENDIMENTO</h3>
            <div style={styles.statNumber}>
              {fbLoading ? "..." : feedbacks.length}
            </div>
          </div>

          <div
            style={{
              ...styles.statCard,
              backgroundColor: "#2196F3",
              ...(hoveredCard === 2 ? styles.statCardHover : {}),
            }}
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate("/TodosRelatorios")}
          >
            <h3 style={styles.statTitle}>MEUS RELATÓRIOS</h3>
            <div style={styles.statNumber}>
              {rtLoading ? "..." : relatorios.length}
            </div>
          </div>

          <div
            style={{
              ...styles.statCard,
              backgroundColor: "#FF9800",
              ...(hoveredCard === 3 ? styles.statCardHover : {}),
            }}
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate("/MeusPacientes")}
          >
            <h3 style={styles.statTitle}>MEUS PACIENTES</h3>
            <div style={styles.statNumber}>
              {ptLoading ? "..." : patients.length}
            </div>
          </div>

          <div
            style={{
              ...styles.statCard,
              backgroundColor: "#FF6B35",
              ...(hoveredCard === 4 ? styles.statCardHover : {}),
            }}
            onMouseEnter={() => setHoveredCard(4)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate("/FAQ")}
          >
            <h3 style={styles.statTitle}>
              ACESSAR FAQ-CRIANÇAS NEURODIVERGENTES
            </h3>
            <div style={styles.faqBadge}>[FAQ]</div>
          </div>

          {/* Linha 2 */}
          <div
            style={{
              ...styles.statCard,
              backgroundColor: "#FFB6C1",
              ...(hoveredCard === 5 ? styles.statCardHover : {}),
            }}
            onMouseEnter={() => setHoveredCard(5)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate("/PlaylistRelax")}
          >
            <h3 style={styles.statTitle}>PLAYLIST RELAX</h3>
            <div style={styles.avatarContainer}>
              <div style={styles.playlistAvatar}>🎵</div>
            </div>
          </div>

          <div
            style={{
              ...styles.statCard,
              backgroundColor: "#FF0000",
              ...(hoveredCard === 6 ? styles.statCardHover : {}),
            }}
            onMouseEnter={() => setHoveredCard(6)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate("/GerarCertificado")}
          >
            <h3 style={styles.statTitle}>GERADOR DE CERTIFICADO INFANTIL</h3>
            <div style={styles.mascoteIcon}>🎓</div>
          </div>

          <div
            style={{
              ...styles.statCard,
              backgroundColor: "#000000",
              ...(hoveredCard === 7 ? styles.statCardHover : {}),
            }}
            onMouseEnter={() => setHoveredCard(7)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate("/Agendamentos")}
          >
            <h3 style={styles.statTitle}>MEUS AGENDAMENTOS</h3>
            <div style={styles.mascoteIcon}>⏰</div>
          </div>
        </section>

        {/* Charts Section */}
        <section style={styles.chartsSection} className="dash-charts-section">
          <div style={styles.chartContainer}>
            <h3 style={styles.chartTitle}>GRÁFICO DE ATENDIMENTOS</h3>
            <div style={styles.chart}>
              {rtLoading && <div>Carregando...</div>}
              {rtError && (
                <div style={{ color: "#b91c1c" }}>Erro: {rtError}</div>
              )}
              {!rtLoading &&
                !rtError &&
                (sortedMonths.length ? (
                  <div style={styles.chartBars}>
                    {sortedMonths.map((m) => (
                      <div
                        key={m}
                        style={{
                          ...styles.bar,
                          height: scaleMonth(monthCounts[m]),
                          backgroundColor: "#3498DB",
                        }}
                        title={`${m}: ${monthCounts[m]}`}
                      >
                        <span
                          style={styles.barLabel}
                        >{`${m} (${monthCounts[m]})`}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>Nenhum atendimento encontrado.</div>
                ))}
            </div>
          </div>

          <div style={styles.chartContainer}>
            <h3 style={styles.chartTitle}>GRÁFICO DE FEEDBACKS</h3>
            <div style={styles.chart}>
              {fbLoading && <div>Carregando...</div>}
              {fbError && (
                <div style={{ color: "#b91c1c" }}>Erro: {fbError}</div>
              )}
              {!fbLoading && !fbError && (
                <div style={styles.feedbackBars}>
                  <div
                    style={{
                      ...styles.feedbackBar,
                      height: barScale(fbCounts.Feliz),
                      backgroundColor: "#10b981",
                    }}
                  >
                    <span style={styles.feedbackLabel}>
                      Feliz ({fbCounts.Feliz})
                    </span>
                  </div>
                  <div
                    style={{
                      ...styles.feedbackBar,
                      height: barScale(fbCounts.Normal),
                      backgroundColor: "#3b82f6",
                    }}
                  >
                    <span style={styles.feedbackLabel}>
                      Normal ({fbCounts.Normal})
                    </span>
                  </div>
                  <div
                    style={{
                      ...styles.feedbackBar,
                      height: barScale(fbCounts.Triste),
                      backgroundColor: "#ef4444",
                    }}
                  >
                    <span style={styles.feedbackLabel}>
                      Triste ({fbCounts.Triste})
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <style>{`
        * {
          box-sizing: border-box;
        }

        @media (max-width: 1200px) {
          .dash-stats-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        @media (max-width: 1024px) {
          .dash-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 15px !important;
            padding: 30px !important;
          }
          .dash-charts-section {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }

        @media (max-width: 768px) {
          .dash-sidebar {
            position: fixed !important;
            left: -280px !important;
            top: 0 !important;
            height: 100vh !important;
            z-index: 1000 !important;
            transition: left 0.3s ease !important;
            width: 250px !important;
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
          }
          
          .dash-sidebar.dash-sidebar-open {
            left: 0 !important;
          }

          .dash-mobile-menu-btn {
            display: block !important;
          }

          .dash-main-content {
            grid-column: 1 / -1 !important;
            width: 100% !important;
          }

          .dash-header {
            padding: 15px 20px !important;
            flex-direction: column !important;
            gap: 15px !important;
            align-items: center !important;
          }

          .dash-logo-container {
            width: 100% !important;
            justify-content: center !important;
          }

          .dash-header-content {
            width: 100% !important;
            text-align: center !important;
          }

          .dash-logout-btn {
            width: 100% !important;
            max-width: 200px !important;
          }

          .dash-stats-grid {
            grid-template-columns: 1fr !important;
            padding: 20px !important;
            gap: 15px !important;
          }

          .dash-charts-section {
            padding: 10px 20px 20px !important;
          }
        }

        @media (max-width: 480px) {
          .dash-header h2 {
            font-size: 18px !important;
          }
          
          .dash-header p {
            font-size: 13px !important;
          }

          .dash-logout-btn {
            font-size: 11px !important;
            padding: 8px 12px !important;
          }

          .dash-stats-grid {
            padding: 15px !important;
          }

          .dash-charts-section {
            padding: 10px 15px 20px !important;
          }
        }

        .dash-sidebar-overlay {
          display: none;
        }

        @media (max-width: 768px) {
          .dash-sidebar-overlay {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "grid",
    gridTemplateColumns: "250px 1fr",
    minHeight: "100vh",
    width: "100%",
    fontFamily: "'Nunito', sans-serif",
    margin: 0,
    position: "relative",
    backgroundColor: "#ffffff",
  },
  mobileMenuBtn: {
    display: "none",
    position: "fixed",
    top: "15px",
    left: "15px",
    zIndex: 1001,
    backgroundColor: "#fff",
    border: "1px solid #e9ecef",
    borderRadius: "4px",
    padding: "8px",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    fontFamily: "'Nunito', sans-serif",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
  dashSidebar: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRight: "1px solid #e9ecef",
    overflowY: "auto",
    fontFamily: "'Nunito', sans-serif",
    height: "100vh",
    position: "sticky",
    top: 0,
  },
  dashSidebarOpen: {
    left: 0,
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "1px solid #e9ecef",
  },
  userAvatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#6c757d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10px",
    fontSize: "16px",
  },
  userName: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#495057",
    fontFamily: "'Nunito', sans-serif",
  },
  dashNav: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  navSection: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  navTitle: {
    fontSize: "12px",
    color: "#6c757d",
    margin: "0",
    marginBottom: "5px",
    fontFamily: "'Nunito', sans-serif",
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    padding: "8px 0",
    textDecoration: "none",
    color: "#495057",
    fontSize: "13px",
    fontWeight: "500",
    transition: "all 0.3s ease",
    cursor: "pointer",
    fontFamily: "'Nunito', sans-serif",
  },
  navLinkHover: {
    color: "#2196F3",
    paddingLeft: "8px",
  },
  icon: {
    marginRight: "8px",
    fontSize: "14px",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#ffffff",
  },
  dashHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 40px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e9ecef",
    flexWrap: "wrap",
    gap: "20px",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logoPlaceholder: {
    padding: "15px 30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2196F3",
    borderRadius: "8px",
    fontFamily: "'Nunito', sans-serif",
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: "18px",
  },
  headerContent: {
    textAlign: "center",
    flex: 1,
  },
  greeting: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    margin: "0 0 5px 0",
    fontFamily: "'Nunito', sans-serif",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6c757d",
    margin: "0",
    fontFamily: "'Nunito', sans-serif",
  },
  logoutBtn: {
    padding: "8px 16px",
    backgroundColor: "transparent",
    border: "1px solid #6c757d",
    borderRadius: "4px",
    color: "#6c757d",
    fontSize: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontFamily: "'Nunito', sans-serif",
    fontWeight: "600",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    padding: "40px",
  },
  statCard: {
    padding: "20px",
    borderRadius: "8px",
    color: "white",
    minHeight: "120px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  statCardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  },
  mascoteIcon: {
    fontSize: "32px",
    marginTop: "10px",
  },
  statTitle: {
    fontSize: "14px",
    fontWeight: "bold",
    margin: "0",
    fontFamily: "'Nunito', sans-serif",
  },
  statNumber: {
    fontSize: "28px",
    fontWeight: "bold",
    marginTop: "8px",
    fontFamily: "'Nunito', sans-serif",
  },
  faqBadge: {
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "8px",
    fontFamily: "'Nunito', sans-serif",
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },
  playlistAvatar: {
    fontSize: "32px",
  },
  chartsSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    padding: "10px 40px 40px",
    alignItems: "start",
  },
  chartContainer: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    border: "1px solid #e9ecef",
  },
  chartTitle: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
    margin: "0 0 20px 0",
    textAlign: "center",
    fontFamily: "'Nunito', sans-serif",
  },
  chart: {
    height: "220px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: "40px",
  },
  chartBars: {
    display: "flex",
    alignItems: "flex-end",
    gap: "15px",
    height: "160px",
  },
  bar: {
    width: "40px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    borderRadius: "4px 4px 0 0",
    position: "relative",
    transition: "all 0.3s ease",
  },
  barLabel: {
    position: "absolute",
    bottom: "-25px",
    fontSize: "10px",
    color: "#666",
    whiteSpace: "nowrap",
    fontFamily: "'Nunito', sans-serif",
    fontWeight: "600",
  },
  feedbackBars: {
    display: "flex",
    alignItems: "flex-end",
    gap: "12px",
    height: "160px",
  },
  feedbackBar: {
    width: "40px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    borderRadius: "4px 4px 0 0",
    position: "relative",
    transition: "all 0.3s ease",
  },
  feedbackLabel: {
    position: "absolute",
    bottom: "-40px",
    left: "50%",
    fontSize: "9px",
    color: "#666",
    transform: "translateX(-50%) rotate(-45deg)",
    transformOrigin: "center",
    whiteSpace: "nowrap",
    width: "max-content",
    fontFamily: "'Nunito', sans-serif",
    fontWeight: "600",
  },
};

export default DashboardAdmin;
