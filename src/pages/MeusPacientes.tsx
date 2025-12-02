import React, { useState, useEffect } from "react";
import arrowImage from "../assets/Voltar.png";
import logo from "../assets/logo.png";
import {
  Calendar,
  FileText,
  Activity,
  X,
  CreditCard,
  User,
} from "lucide-react";
import { fetchPatients } from "../services/patients";
import { fetchRelatoriosForPatient } from "../services/relatorios";
import type { Patient } from "../types/patient";
import type { Relatorio } from "../types/relatorio";

interface MeusPacientesProps {
  onGoBack?: () => void;
}

const MeusPacientes: React.FC<MeusPacientesProps> = ({ onGoBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("nome");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"dados" | "relatorios">("dados");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [relatoriosLoading, setRelatoriosLoading] = useState(false);
  const [relatoriosError, setRelatoriosError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchPatients(controller.signal)
      .then(setPatients)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      window.history.back();
    }
  };

  const totalItems = patients.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / 8));

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const handlePatientDetail = (patientId: number) => {
    const patient = patients.find((p) => p.id === patientId);
    if (patient) {
      setSelectedPatient(patient);
      setIsDialogOpen(true);
      setActiveTab("dados");
      setRelatorios([]);
      setRelatoriosLoading(true);
      setRelatoriosError(null);
      fetchRelatoriosForPatient({ id: patient.id, name: patient.name })
        .then(setRelatorios)
        .catch((e) => setRelatoriosError(e.message))
        .finally(() => setRelatoriosLoading(false));
    }
  };

  const closeModal = () => {
    setIsDialogOpen(false);
    setSelectedPatient(null);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <button style={styles.backButton} onClick={handleGoBack}>
            <img
              src={arrowImage}
              alt="Voltar"
              style={{ width: "32px", height: "32px" }}
            />
          </button>
          <div style={styles.logoContainer}>
            <div style={styles.logoNoBackground}>
              <img
                src={logo}
                alt="logo"
                style={{ width: "150px", height: "75px" }}
              />
            </div>
          </div>
        </div>

        <div style={styles.headerCenter}>
          <h1 style={styles.greeting}>OLÁ, PAULO!</h1>
          <p style={styles.subtitle}>ESSES SÃO SEUS PACIENTES.</p>
        </div>

        <div style={styles.headerRight}>
          <select
            style={styles.filterSelect}
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="nome">Filtrar Por Ordem</option>
            <option value="nome">Nome</option>
            <option value="cidade">Cidade</option>
            <option value="recente">Mais Recente</option>
          </select>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {loading && <div style={{ padding: "20px" }}>Carregando...</div>}
        {error && (
          <div style={{ padding: "20px", color: "red" }}>Erro: {error}</div>
        )}
        {/* Table Container */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>NOME</th>
                <th style={styles.tableHeader}>TIPO</th>
                <th style={styles.tableHeader}>CPF</th>
                <th style={styles.tableHeader}>GÊNERO</th>
                <th style={styles.tableHeader}>CIDADE</th>
                <th style={styles.tableHeader}>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr
                  key={patient.id}
                  style={{
                    ...styles.tableRow,
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                  }}
                >
                  <td style={styles.tableCell}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #a8d0f0 0%, #7eb8e6 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "700",
                          color: "#fff",
                          fontSize: "16px",
                          boxShadow: "0 2px 4px rgba(168, 208, 240, 0.3)",
                        }}
                      >
                        {patient.name.charAt(0)}
                      </div>
                      <span style={{ fontWeight: "500" }}>{patient.name}</span>
                    </div>
                  </td>
                  <td style={styles.tableCell}>
                    {patient.tipoPaciente?.trim() || "—"}
                  </td>
                  <td style={styles.tableCell}>{patient.cpf || "—"}</td>
                  <td style={styles.tableCell}>{patient.genero}</td>
                  <td style={styles.tableCell}>
                    {patient.addresses?.[0]?.cidade || "—"}
                  </td>
                  <td style={styles.tableCell}>
                    <button
                      style={styles.detailButton}
                      onClick={() => handlePatientDetail(patient.id)}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#22c55e")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#4ade80")
                      }
                    >
                      DETALHAR
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={styles.pagination}>
          <span style={styles.paginationInfo}>Mostrando 1 de {totalItems}</span>

          <div style={styles.paginationControls}>
            <button
              style={{ ...styles.paginationButton, ...styles.paginationArrow }}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ‹
            </button>

            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                style={{
                  ...styles.paginationButton,
                  ...(currentPage === page
                    ? styles.paginationButtonActive
                    : {}),
                }}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}

            <span style={styles.paginationEllipsis}>...</span>

            <button
              style={styles.paginationButton}
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages * 8}
            </button>

            <button
              style={{ ...styles.paginationButton, ...styles.paginationArrow }}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              ›
            </button>
          </div>
        </div>
      </main>

      {/* Custom Modal */}
      {isDialogOpen && selectedPatient && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={styles.modalHeader}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #a8d0f0 0%, #7eb8e6 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "700",
                    color: "#fff",
                    fontSize: "32px",
                    boxShadow: "0 4px 12px rgba(168, 208, 240, 0.4)",
                  }}
                >
                  {selectedPatient.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={styles.modalTitle}>{selectedPatient.name}</h2>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginTop: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      CPF: {selectedPatient.cpf || "—"}
                    </span>
                    <span style={{ fontSize: "14px", color: "#6b7280" }}>
                      Gênero: {selectedPatient.genero}
                    </span>
                    <span style={{ fontSize: "14px", color: "#6b7280" }}>
                      Nascimento:{" "}
                      {new Date(
                        selectedPatient.dataNascimento
                      ).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              </div>
              <button style={styles.closeButton} onClick={closeModal}>
                <X size={24} />
              </button>
            </div>

            {/* Stats Cards */}
            <div style={styles.statsContainer}>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>
                  <FileText size={20} color="#3b82f6" />
                </div>
                <div>
                  <p style={styles.statValue}>{relatorios.length}</p>
                  <p style={styles.statLabel}>Relatórios</p>
                </div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>
                  <Activity size={20} color="#10b981" />
                </div>
                <div>
                  <p style={styles.statValue}>
                    {relatorios.filter((r) => r.medicamentos?.trim()).length}
                  </p>
                  <p style={styles.statLabel}>Com Medicamentos</p>
                </div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>
                  <Calendar size={20} color="#f59e0b" />
                </div>
                <div>
                  <p style={styles.statValue}>
                    {relatorios.length
                      ? new Date(relatorios[0].data).toLocaleDateString("pt-BR")
                      : "—"}
                  </p>
                  <p style={styles.statLabel}>Último Registro</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div style={styles.tabsContainer}>
              <div style={styles.tabsList}>
                <button
                  style={{
                    ...styles.tabButton,
                    ...(activeTab === "dados" ? styles.tabButtonActive : {}),
                  }}
                  onClick={() => setActiveTab("dados")}
                >
                  <User size={16} style={{ marginRight: "6px" }} />
                  Dados Pessoais
                </button>
                <button
                  style={{
                    ...styles.tabButton,
                    ...(activeTab === "relatorios"
                      ? styles.tabButtonActive
                      : {}),
                  }}
                  onClick={() => setActiveTab("relatorios")}
                >
                  <FileText size={16} style={{ marginRight: "6px" }} />
                  Relatórios
                </button>
              </div>

              {/* Tab Content */}
              <div style={styles.tabContent}>
                {/* Dados Pessoais */}
                {activeTab === "dados" && selectedPatient && (
                  <div style={styles.dadosContainer}>
                    <div style={styles.dadosSection}>
                      <h3 style={styles.sectionTitle}>Informações Pessoais</h3>
                      <div style={styles.dadosGrid}>
                        <div style={styles.infoCard}>
                          <div style={styles.infoIconWrapper}>
                            <Calendar size={18} color="#3b82f6" />
                          </div>
                          <div>
                            <p style={styles.infoLabel}>Data de Nascimento</p>
                            <p style={styles.infoValue}>
                              {new Date(
                                selectedPatient.dataNascimento
                              ).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                        </div>

                        <div style={styles.infoCard}>
                          <div style={styles.infoIconWrapper}>
                            <User size={18} color="#10b981" />
                          </div>
                          <div>
                            <p style={styles.infoLabel}>Tipo Paciente</p>
                            <p style={styles.infoValue}>
                              {selectedPatient.tipoPaciente?.trim() ||
                                "Não informado"}
                            </p>
                          </div>
                        </div>

                        <div style={styles.infoCard}>
                          <div style={styles.infoIconWrapper}>
                            <CreditCard size={18} color="#f59e0b" />
                          </div>
                          <div>
                            <p style={styles.infoLabel}>CPF</p>
                            <p style={styles.infoValue}>
                              {selectedPatient.cpf || "—"}
                            </p>
                          </div>
                        </div>

                        <div style={styles.infoCard}>
                          <div style={styles.infoIconWrapper}>
                            <Activity size={18} color="#ef4444" />
                          </div>
                          <div>
                            <p style={styles.infoLabel}>Gênero</p>
                            <p style={styles.infoValue}>
                              {selectedPatient.genero}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={styles.dadosSection}>
                      <h3 style={styles.sectionTitle}>Endereços</h3>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        {selectedPatient.addresses.map((addr) => (
                          <div key={addr.id} style={styles.detailRow}>
                            <p style={styles.detailLabel}>
                              Endereço #{addr.id}
                            </p>
                            <p style={styles.detailText}>
                              {addr.logradouro}, {addr.numero} - {addr.bairro},{" "}
                              {addr.cidade}/{addr.estado} - CEP {addr.cep}
                            </p>
                          </div>
                        ))}
                        {!selectedPatient.addresses.length && (
                          <div style={styles.detailRow}>
                            <p style={styles.detailText}>
                              Nenhum endereço cadastrado.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Relatórios */}
                {activeTab === "relatorios" && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    {relatoriosLoading && <div>Carregando relatórios...</div>}
                    {relatoriosError && (
                      <div style={{ color: "red" }}>
                        Erro: {relatoriosError}
                      </div>
                    )}
                    {!relatoriosLoading &&
                      !relatoriosError &&
                      relatorios.length === 0 && (
                        <div style={styles.detailRow}>
                          <p style={styles.detailText}>
                            Nenhum relatório encontrado para este paciente.
                          </p>
                        </div>
                      )}
                    {relatorios.map((r) => (
                      <div key={r.id} style={styles.consultaCard}>
                        <div style={styles.consultaHeader}>
                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                marginBottom: "8px",
                              }}
                            >
                              <h3 style={styles.consultaTitle}>
                                Relatório #{r.id}
                              </h3>
                            </div>
                            <p style={styles.consultaSubtitle}>
                              <Calendar
                                size={14}
                                style={{
                                  marginRight: "6px",
                                  verticalAlign: "middle",
                                }}
                              />
                              {new Date(r.data).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                        </div>
                        <div style={styles.separator} />
                        <div style={styles.consultaDetails}>
                          <div style={styles.detailRow}>
                            <p style={styles.detailLabel}>Procedimentos:</p>
                            <p style={styles.detailText}>
                              {r.procedimentos || "—"}
                            </p>
                          </div>
                          <div style={styles.detailRow}>
                            <p style={styles.detailLabel}>Medicamentos:</p>
                            <p style={styles.detailText}>
                              {r.medicamentos || "—"}
                            </p>
                          </div>
                          <div style={styles.detailRow}>
                            <p style={styles.detailLabel}>Descrição:</p>
                            <p style={styles.detailText}>
                              {r.descricao || "—"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column" as const,
    backgroundColor: "#f5f6fa",
    fontFamily: "'Nunito', sans-serif",
    margin: 0,
    padding: 0,
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#a8d0f0",
    padding: "20px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #e0e6ed",
    flexShrink: 0,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  backButton: {
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "50%",
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "none",
    outline: "none",
    fontFamily: "'Nunito', sans-serif",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column" as const,
  },
  logoNoBackground: {
    padding: "10px 20px",
    borderRadius: "8px",
    boxShadow: "none",
    backgroundColor: "transparent",
  },
  headerCenter: {
    textAlign: "center" as const,
  },
  greeting: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    margin: "0 0 5px 0",
    fontFamily: "'Nunito', sans-serif",
  },
  subtitle: {
    fontSize: "16px",
    color: "#333",
    margin: 0,
    fontFamily: "'Nunito', sans-serif",
  },
  headerRight: {
    minWidth: "200px",
  },
  filterSelect: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    fontSize: "14px",
    cursor: "pointer",
    width: "100%",
    fontFamily: "'Nunito', sans-serif",
    fontWeight: "500",
  },
  main: {
    padding: "40px",
    flex: 1,
    overflow: "auto",
    display: "flex",
    flexDirection: "column" as const,
  },
  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    flex: 1,
    maxWidth: "1600px",
    width: "100%",
    margin: "0 auto",
    border: "1px solid #e5e7eb",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    fontFamily: "'Nunito', sans-serif",
  },
  tableHeaderRow: {
    backgroundColor: "#f9fafb",
    borderBottom: "2px solid #e5e7eb",
  },
  tableHeader: {
    padding: "18px 24px",
    textAlign: "left" as const,
    fontSize: "12px",
    fontWeight: "700",
    color: "#374151",
    letterSpacing: "0.8px",
    textTransform: "uppercase" as const,
    fontFamily: "'Nunito', sans-serif",
  },
  tableRow: {
    borderBottom: "1px solid #f3f4f6",
    transition: "background-color 0.2s",
  },
  tableCell: {
    padding: "18px 24px",
    fontSize: "14px",
    color: "#1f2937",
    fontFamily: "'Nunito', sans-serif",
  },
  detailButton: {
    backgroundColor: "#4ade80",
    color: "#fff",
    border: "none",
    padding: "10px 24px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    letterSpacing: "0.5px",
    transition: "all 0.2s",
    fontFamily: "'Nunito', sans-serif",
    boxShadow: "0 2px 8px rgba(74, 222, 128, 0.3)",
  },
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "30px",
    padding: "0 20px",
    flexShrink: 0,
    maxWidth: "1600px",
    width: "100%",
    margin: "30px auto 0",
  },
  paginationInfo: {
    fontSize: "14px",
    color: "#6b7280",
    fontFamily: "'Nunito', sans-serif",
    fontWeight: "500",
  },
  paginationControls: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  paginationButton: {
    padding: "10px 14px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#fff",
    color: "#374151",
    cursor: "pointer",
    borderRadius: "6px",
    fontSize: "14px",
    minWidth: "40px",
    textAlign: "center" as const,
    fontFamily: "'Nunito', sans-serif",
    fontWeight: "500",
    transition: "all 0.2s",
  },
  paginationButtonActive: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    borderColor: "#3b82f6",
    fontWeight: "600",
    boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
  },
  paginationArrow: {
    fontSize: "18px",
    fontWeight: "700",
  },
  paginationEllipsis: {
    padding: "8px 4px",
    color: "#6b7280",
    fontFamily: "'Nunito', sans-serif",
  },
  // Modal Styles
  modalOverlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
    fontFamily: "'Nunito', sans-serif",
    backdropFilter: "blur(4px)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    maxWidth: "1400px",
    width: "100%",
    maxHeight: "90vh",
    overflow: "auto",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    fontFamily: "'Nunito', sans-serif",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "32px 40px",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
  },
  modalTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#111827",
    margin: 0,
    fontFamily: "'Nunito', sans-serif",
    letterSpacing: "-0.5px",
  },
  closeButton: {
    backgroundColor: "#f3f4f6",
    border: "none",
    cursor: "pointer",
    padding: "8px",
    color: "#6b7280",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    width: "40px",
    height: "40px",
  },
  // Stats Container
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    padding: "24px 40px",
    backgroundColor: "#f9fafb",
    borderBottom: "1px solid #e5e7eb",
  },
  statCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  statIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    backgroundColor: "#f0f9ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statValue: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#111827",
    margin: "0 0 4px 0",
    fontFamily: "'Nunito', sans-serif",
  },
  statLabel: {
    fontSize: "13px",
    color: "#6b7280",
    margin: 0,
    fontFamily: "'Nunito', sans-serif",
    fontWeight: "500",
  },
  // Tabs Styles
  tabsContainer: {
    padding: "0",
    fontFamily: "'Nunito', sans-serif",
  },
  tabsList: {
    display: "flex",
    borderBottom: "2px solid #e5e7eb",
    padding: "0 40px",
    gap: "4px",
    backgroundColor: "#fff",
  },
  tabButton: {
    padding: "16px 24px",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "3px solid transparent",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    color: "#6b7280",
    transition: "all 0.2s",
    marginBottom: "-2px",
    fontFamily: "'Nunito', sans-serif",
    display: "flex",
    alignItems: "center",
    borderRadius: "8px 8px 0 0",
  },
  tabButtonActive: {
    color: "#3b82f6",
    borderBottomColor: "#3b82f6",
    backgroundColor: "#f0f9ff",
  },
  tabContent: {
    padding: "32px 40px",
    fontFamily: "'Nunito', sans-serif",
    minHeight: "400px",
  },
  // Dados Pessoais Styles
  dadosContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "32px",
  },
  dadosSection: {
    backgroundColor: "#fff",
    borderRadius: "12px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#111827",
    margin: "0 0 20px 0",
    fontFamily: "'Nunito', sans-serif",
    display: "flex",
    alignItems: "center",
    paddingBottom: "12px",
    borderBottom: "2px solid #e5e7eb",
  },
  dadosGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
  },
  infoCard: {
    display: "flex",
    gap: "16px",
    alignItems: "flex-start",
    padding: "20px",
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    transition: "all 0.2s",
  },
  infoIconWrapper: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  },
  infoLabel: {
    fontSize: "13px",
    color: "#6b7280",
    margin: "0 0 6px 0",
    fontFamily: "'Nunito', sans-serif",
    fontWeight: "600",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  },
  infoValue: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#111827",
    margin: 0,
    fontFamily: "'Nunito', sans-serif",
  },
  infoSubtext: {
    fontSize: "14px",
    color: "#9ca3af",
    margin: "4px 0 0 0",
    fontFamily: "'Nunito', sans-serif",
  },
  // Consultas Styles
  consultasList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
  },
  consultaCard: {
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "28px",
    backgroundColor: "#fff",
    transition: "all 0.2s",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
  },
  consultaHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "20px",
    gap: "20px",
  },
  consultaTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#111827",
    margin: 0,
    fontFamily: "'Nunito', sans-serif",
  },
  consultaSubtitle: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0,
    fontFamily: "'Nunito', sans-serif",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
  },
  valorBadge: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "16px",
    fontWeight: "700",
    fontFamily: "'Nunito', sans-serif",
    boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
    flexShrink: 0,
  },
  separator: {
    height: "1px",
    backgroundColor: "#e5e7eb",
    margin: "20px 0",
  },
  consultaDetails: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  },
  detailRow: {
    backgroundColor: "#f9fafb",
    padding: "16px",
    borderRadius: "8px",
    borderLeft: "3px solid #3b82f6",
  },
  detailLabel: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#374151",
    margin: "0 0 8px 0",
    fontFamily: "'Nunito', sans-serif",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  },
  detailText: {
    fontSize: "15px",
    color: "#1f2937",
    margin: 0,
    lineHeight: "1.6",
    fontFamily: "'Nunito', sans-serif",
  },
  // Exames Styles
  examesList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
  },
  exameCard: {
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "28px",
    backgroundColor: "#fff",
    transition: "all 0.2s",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
  },
  exameHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "20px",
    gap: "20px",
  },
  exameTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#111827",
    margin: 0,
    fontFamily: "'Nunito', sans-serif",
  },
  exameSubtitle: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0,
    fontFamily: "'Nunito', sans-serif",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
  },
  exameDetails: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
  },
  resultadoBox: {
    backgroundColor: "#f0f9ff",
    padding: "20px",
    borderRadius: "12px",
    border: "2px solid #bfdbfe",
  },
  resultadoLabel: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#1e40af",
    margin: "0 0 8px 0",
    fontFamily: "'Nunito', sans-serif",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  },
  resultadoValue: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1e3a8a",
    margin: 0,
    fontFamily: "'Nunito', sans-serif",
  },
  imagemSection: {
    marginTop: "8px",
  },
  imagemLabel: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#374151",
    margin: "0 0 16px 0",
    fontFamily: "'Nunito', sans-serif",
    display: "flex",
    alignItems: "center",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  },
  imageContainer: {
    borderRadius: "12px",
    overflow: "hidden",
    border: "2px solid #e5e7eb",
    backgroundColor: "#1f2937",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  examImage: {
    width: "100%",
    height: "auto",
    maxHeight: "500px",
    objectFit: "contain" as const,
    display: "block",
  },
};

export default MeusPacientes;
