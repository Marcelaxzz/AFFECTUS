// RelatorioDetalhado.tsx
import React, { useEffect, useState } from "react";
import { ArrowLeft, Printer, Save, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
interface RelatorioDetalhadoProps {}

interface Address {
  id: number;
  patientId: number;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  patient: null;
}

interface Patient {
  id: number;
  tipoPaciente: string;
  name: string;
  cpf: string | null;
  genero: string;
  dataNascimento: string;
  addresses: Address[];
}

interface DadosRelatorio {
  id: number;
  patientId: number;
  patient: Patient | null;
  data: string;
  medicamentos: string;
  descricao: string;
  procedimentos: string;
}

const RelatorioDetalhado: React.FC<RelatorioDetalhadoProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const relatorioId = Number(id);

  // -------------------------------
  // ESTADO PARA RELATÓRIOS
  // -------------------------------
  const [relatorio, setRelatorio] = useState<DadosRelatorio | null>(null);

  // -------------------------------
  // ESTADO DO FORMULÁRIO
  // -------------------------------
  const [formData, setFormData] = useState({
    medicamentos: "",
    descricao: "",
    procedimentos: "",
  });

  // -------------------------------
  // BUSCAR DADOS DA API
  // -------------------------------
  useEffect(() => {
    const fetchRelatorioDetalhado = async () => {
      try {
        // Fetch the relatorio data
        const relatorioResponse = await fetch(`https://affectus-backend.onrender.com/api/relatorios/${relatorioId}`);
        const relatorioData: DadosRelatorio = await relatorioResponse.json();

        if (!relatorioData) {
          console.error("Relatório não encontrado");
          return;
        }

        // Fetch the patient data using patientId
        const patientResponse = await fetch(`https://affectus-backend.onrender.com/api/patients/${relatorioData.patientId}`);
        const patientData: Patient = await patientResponse.json();

        // Combine relatorio and patient data
        const relatorioComPaciente: DadosRelatorio = {
          ...relatorioData,
          patient: patientData,
        };
        console.log(relatorioComPaciente);
        console.log(relatorioData);

        setRelatorio(relatorioComPaciente);

        // Set form data
        setFormData({
          medicamentos: relatorioData.medicamentos,
          descricao: relatorioData.descricao,
          procedimentos: relatorioData.procedimentos,
        });
      } catch (error) {
        console.error("Erro ao buscar dados detalhados:", error);
      }
    };

    fetchRelatorioDetalhado();
  }, [relatorioId]);

  // -------------------------------
  // FUNÇÕES
  // -------------------------------
  const handlePrint = () => window.print();
  const handleSave = () => alert("Relatório salvo!");
  const handleBack = () => navigate(-1);

  // -------------------------------
  // ESTILOS
  // -------------------------------
  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #87CEEB, #B0E0E6)",
    padding: "40px 20px",
    fontFamily: "Nunito, sans-serif",
  };

  const cardStyle: React.CSSProperties = {
    maxWidth: "800px",
    margin: "0 auto",
    background: "#fff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    border: "none",
    borderBottom: "2px solid #000",
    padding: "10px",
    fontSize: "16px",
    fontWeight: 600,
    background: "transparent",
  };

  const textareaStyle: React.CSSProperties = {
    width: "100%",
    minHeight: "120px",
    border: "2px solid #000",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "10px",
  };

  // -------------------------------
  // JSX FINAL
  // -------------------------------
  if (!relatorio) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={containerStyle}>
      <button
        onClick={handleBack}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#fff",
          padding: "12px 20px",
          borderRadius: 12,
          border: "none",
          marginBottom: 20,
          cursor: "pointer",
        }}
      >
        <ArrowLeft size={20} />
        Voltar
      </button>

      <div style={cardStyle}>
        <h1 style={{ textAlign: "center", fontSize: 28, fontWeight: 800 }}>
          RELATÓRIO DETALHADO
        </h1>

        {/* Verifica se o paciente está disponível */}
        {relatorio.patient ? (
          <>
            {/* Nome do Paciente */}
            <div style={{ marginTop: 20 }}>
              <label>Nome do Paciente</label>
              <input
              style={inputStyle}
              value={`${
                relatorio.patient.tipoPaciente.toLowerCase() === "neurodivergente" ? "🧩 " : ""
              }${relatorio.patient.name}`}
              readOnly
              />
            </div>

            <div style={{ marginTop: 20 }}>
              <label>Idade</label>
              <input
              style={inputStyle}
              value={
                new Date().getFullYear() - new Date(relatorio.patient.dataNascimento).getFullYear() -
                (new Date().getMonth() < new Date(relatorio.patient.dataNascimento).getMonth() ||
                (new Date().getMonth() === new Date(relatorio.patient.dataNascimento).getMonth() &&
                new Date().getDate() < new Date(relatorio.patient.dataNascimento).getDate())
                ? 1
                : 0)
              }
              readOnly
              />
            </div>

            {/* Gênero + Data de Nascimento */}
            <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
              <div style={{ flex: 1 }}>
                <label>Gênero</label>
                <input style={inputStyle} value={relatorio.patient.genero} readOnly />
              </div>

              <div style={{ flex: 1 }}>
                <label>Data de Nascimento</label>
                <input
                  style={inputStyle}
                  value={new Date(relatorio.patient.dataNascimento).toLocaleDateString("pt-br")}
                  readOnly
                />
              </div>
            </div>
          </>
        ) : (
          <div style={{ marginTop: 20, color: "red" }}>
            Paciente não encontrado.
          </div>
        )}

        {/* Medicamentos */}
        <div style={{ marginTop: 20 }}>
          <label>Medicamentos</label>
          <textarea
            style={textareaStyle}
            value={formData.medicamentos}
            onChange={(e) =>
              setFormData({ ...formData, medicamentos: e.target.value })
            }
          />
        </div>

        {/* Descrição */}
        <div style={{ marginTop: 20 }}>
          <label>Descrição</label>
          <textarea
            style={textareaStyle}
            value={formData.descricao}
            onChange={(e) =>
              setFormData({ ...formData, descricao: e.target.value })
            }
          />
        </div>

        {/* Procedimentos */}
        <div style={{ marginTop: 20 }}>
          <label>Procedimentos</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
            {["Exame Clínico", "Limpeza/Profilaxia", "Tratamento Restaurador", "Orientação Preventiva"].map((procedimento) => (
              <label key={procedimento} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input
            type="checkbox"
            checked={formData.procedimentos.includes(procedimento)}
            onChange={(e) => {
              const checked = e.target.checked;
              setFormData((prev) => ({
                ...prev,
                procedimentos: checked
            ? [...prev.procedimentos.split(", "), procedimento].join(", ")
            : prev.procedimentos.split(", ").filter((p) => p !== procedimento).join(", "),
              }));
            }}
          />
          {procedimento}
              </label>
            ))}
            <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              Outro
              <textarea
          style={textareaStyle}
          value={formData.procedimentos
            .split(", ")
            .filter(
              (procedimento) =>
                !["Exame Clínico", "Limpeza/Profilaxia", "Tratamento Restaurador", "Orientação Preventiva"].includes(procedimento)
            )
            .join(", ")}
          onChange={(e) => {
            const outros = e.target.value.split(", ").filter((p) => p.trim() !== "");
            setFormData((prev) => ({
              ...prev,
              procedimentos: [
                ...prev.procedimentos
            .split(", ")
            .filter((p) =>
              ["Exame Clínico", "Limpeza/Profilaxia", "Tratamento Restaurador", "Orientação Preventiva"].includes(p)
            ),
                ...outros,
              ].join(", "),
            }));
          }}
              />
            </label>
          </div>
        </div>

        {/* Botões */}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            justifyContent: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={handlePrint}
            style={{
              background: "#2196F3",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: 12,
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Printer size={20} />
            Imprimir
          </button>

          <button
            onClick={handleSave}
            style={{
              background: "#4CAF50",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: 12,
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Save size={20} />
            Salvar
          </button>

          <button
            onClick={handleBack}
            style={{
              background: "#F44336",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: 12,
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <X size={20} />
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RelatorioDetalhado;