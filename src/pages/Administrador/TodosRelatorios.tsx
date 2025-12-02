import React, { useState } from "react";
import { FileText, Search, Calendar, Clock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Relatorio {
  id: number;
  patientId: number;
  tipoPaciente: string;
  nomePaciente: string;
  data: string;
  medicamentos: string;
  descricao: string;
  procedimentos: string;
}

const TodosRelatorios: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);

  React.useEffect(() => {
    const loadRelatorios = async () => {
      try {
        const response = await fetch(
          "https://affectus-backend.onrender.com/api/relatorios"
        );
        const data = await response.json();
        const montados = data.map((relatorio: any) => ({
          id: relatorio.id,
          patientId: relatorio.patientId,
          nomePaciente: relatorio.patient.name,
          data: new Date(relatorio.data).toLocaleDateString("pt-br"),
          medicamentos: relatorio.medicamentos,
          descricao: relatorio.descricao,
          procedimentos: relatorio.procedimentos,
        }));
        setRelatorios(montados);
      } catch (e) {
        console.error(e);
        setRelatorios([]);
      }
    };
    loadRelatorios();
  }, []);

  const filteredRelatorios = relatorios.filter(
    (relatorio) =>
      relatorio.nomePaciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      relatorio.procedimentos.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #E8F4F8 0%, #D6EBFF 50%, #C5E3FF 100%)",
    fontFamily: '"Nunito", sans-serif',
    padding: "60px 24px",
  };

  const headerStyle: React.CSSProperties = {
    maxWidth: "1400px",
    margin: "0 auto 50px",
    textAlign: "center",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "56px",
    fontWeight: "800",
    color: "#0D47A1",
    marginBottom: "12px",
    letterSpacing: "-1px",
    textShadow: "0 2px 10px rgba(13, 71, 161, 0.1)",
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: "20px",
    color: "#1976D2",
    marginBottom: "16px",
    fontWeight: "600",
  };

  const statsStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    gap: "32px",
    flexWrap: "wrap",
    marginTop: "24px",
  };

  const statItemStyle: React.CSSProperties = {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: "16px 32px",
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 16px rgba(33, 150, 243, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.8)",
  };

  const statNumberStyle: React.CSSProperties = {
    fontSize: "32px",
    fontWeight: "800",
    color: "#0D47A1",
    marginBottom: "4px",
  };

  const statLabelStyle: React.CSSProperties = {
    fontSize: "14px",
    color: "#42A5F5",
    fontWeight: "600",
  };

  const searchContainerStyle: React.CSSProperties = {
    maxWidth: "1400px",
    margin: "0 auto 40px",
    position: "relative",
  };

  const searchWrapperStyle: React.CSSProperties = {
    position: "relative",
    maxWidth: "600px",
    margin: "0 auto",
  };

  const searchIconStyle: React.CSSProperties = {
    position: "absolute",
    left: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#42A5F5",
    pointerEvents: "none",
    zIndex: 1,
  };

  const searchInputStyle: React.CSSProperties = {
    width: "100%",
    padding: "18px 24px 18px 56px",
    border: "none",
    borderRadius: "50px",
    fontSize: "16px",
    backgroundColor: "#FFFFFF",
    color: "#0D47A1",
    outline: "none",
    transition: "all 0.3s ease",
    fontFamily: '"Nunito", sans-serif',
    boxShadow: "0 4px 20px rgba(33, 150, 243, 0.15)",
    fontWeight: "600",
  };

  const cardContainerStyle: React.CSSProperties = {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "grid",
    gap: "24px",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#FFFFFF",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 8px 24px rgba(33, 150, 243, 0.12)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    border: "1px solid rgba(224, 242, 254, 0.8)",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  };

  const cardAccentStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "4px",
    background: "linear-gradient(90deg, #2196F3 0%, #64B5F6 100%)",
  };

  const badgeStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    fontSize: "22px",
    marginBottom: "16px",
    fontWeight: "700",
    letterSpacing: "0.3px",
  };

  const badgeNeurodivStyle: React.CSSProperties = {
    ...badgeStyle,
    background: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
    boxShadow: "0 3px 10px rgba(33, 150, 243, 0.25)",
  };

  const patientNameStyle: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: "800",
    color: "#0D47A1",
    marginBottom: "18px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    letterSpacing: "-0.3px",
  };

  const infoRowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "14px",
    color: "#1976D2",
    fontSize: "15px",
    fontWeight: "600",
  };

  const procedureStyle: React.CSSProperties = {
    color: "#1565C0",
    marginBottom: "24px",
    paddingTop: "16px",
    borderTop: "2px solid #E8F4F8",
    fontSize: "15px",
    fontWeight: "600",
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 28px",
    background: "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "16px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    fontFamily: '"Nunito", sans-serif',
    boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
    letterSpacing: "0.3px",
    marginTop: "auto",
  };

  const emptyStateStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "60px 20px",
    color: "#64B5F6",
  };

  const totalRelatorios = relatorios.length;
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Meus Relatórios</h1>
        <p style={subtitleStyle}>
          Plataforma Affectus - Relatórios Odontológicos
        </p>

        <div style={statsStyle}>
          <div style={statItemStyle}>
            <div style={statNumberStyle}>{totalRelatorios}</div>
            <div style={statLabelStyle}>Total de Atendimentos</div>
          </div>
        </div>
      </div>

      <div style={searchContainerStyle}>
        <div style={searchWrapperStyle}>
          <div style={searchIconStyle}>
            <Search size={22} />
          </div>
          <input
            type="text"
            placeholder="Buscar por paciente ou procedimento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={searchInputStyle}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(33, 150, 243, 0.25)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow =
                "0 4px 20px rgba(33, 150, 243, 0.15)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          />
        </div>
      </div>

      {filteredRelatorios.length > 0 ? (
        <div style={cardContainerStyle}>
          {filteredRelatorios.map((relatorio) => (
            <div
              key={relatorio.id}
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-8px) scale(1.02)";
                e.currentTarget.style.boxShadow =
                  "0 16px 40px rgba(33, 150, 243, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(33, 150, 243, 0.12)";
              }}
            >
              <div style={cardAccentStyle}></div>

              {relatorio.tipoPaciente === "Neurodivergente" && (
                <span style={badgeNeurodivStyle}>🧩</span>
              )}

              <h3 style={patientNameStyle}>
                <User size={22} strokeWidth={2.5} />
                {relatorio.nomePaciente}
              </h3>

              <div style={infoRowStyle}>
                <Calendar size={18} strokeWidth={2.5} />
                <span>{relatorio.data}</span>
              </div>

              <div style={infoRowStyle}>
                <Clock size={18} strokeWidth={2.5} />
                <span>{relatorio.data}</span>
              </div>

              <div style={procedureStyle}>
                <strong>Procedimento:</strong>
                <div style={{ marginTop: "6px", color: "#42A5F5" }}>
                  {relatorio.procedimentos}
                </div>
              </div>
              <button
                style={buttonStyle}
                onClick={() => navigate(`/RelatorioDetalhado/${relatorio.id}`)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-2px) scale(1.03)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(33, 150, 243, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(33, 150, 243, 0.3)";
                }}
              >
                Abrir Relatório
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={emptyStateStyle}>
          <FileText size={64} style={{ margin: "0 auto 16px", opacity: 0.5 }} />
          <h3>Nenhum relatório encontrado</h3>
          <p>Tente ajustar sua busca</p>
        </div>
      )}
    </div>
  );
};

export default TodosRelatorios;
