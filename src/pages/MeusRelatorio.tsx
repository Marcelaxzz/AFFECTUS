import React, { useState } from "react";
import { Printer } from "lucide-react";

// Importe sua imagem quando estiver disponível
import arrowImage from "../assets/Voltar.png";

interface RelatorioOdontologicoProps {
  onGoBack?: () => void;
}

const RelatorioOdontologico: React.FC<RelatorioOdontologicoProps> = ({
  onGoBack,
}) => {
  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      // Fallback: navegar para trás no histórico do navegador
      window.history.back();
    }
  };
  const [formData, setFormData] = useState({
    nomeCrianca: "",
    idade: "",
    data: "",
    diagnostico: "",
    temCrises: "",
    descricaoCrises: "",
    medicacao: "",
    problemaSaude: "",
    descricaoProblemaSaude: "",
    alergia: "",
    descricaoAlergia: "",
    usoMedicamentos: "",
    descricaoUsoMedicamentos: "",
    procedimentos: {
      exameClinico: false,
      limpezaProfilaxia: false,
      tratamentoRestaurador: false,
      orientacaoPreventiva: false,
      outro: false,
    },
    outroDescricao: "",
  });

  // Adiciona estado de salvamento
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      procedimentos: {
        ...prev.procedimentos,
        [name]: checked,
      },
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  // Helper: coleta procedimentos marcados e retorna string separada por vírgula
  const getProcedimentosString = () => {
    const selecionados = Object.entries(formData.procedimentos)
      .filter(([, marcado]) => marcado)
      .map(([key]) => {
        if (key === "outro") {
          return formData.outroDescricao
            ? `${procedimentosLabels[key]}: ${formData.outroDescricao}`
            : procedimentosLabels[key];
        }
        return procedimentosLabels[key];
      });

    return selecionados.join(", ");
  };

  // Handler para salvar
  const handleSave = async () => {
    setSaveError(null);
    if (!formData.nomeCrianca.trim()) {
      alert("Informe o nome da criança.");
      return;
    }
    if (!formData.data) {
      alert("Informe a data.");
      return;
    }
    if (
      formData.usoMedicamentos === "sim" &&
      !formData.descricaoUsoMedicamentos.trim()
    ) {
      alert("Descreva os medicamentos utilizados.");
      return;
    }

    // Função para buscar childId pelo nome da criança
    const fetchChildIdByName = async (name: string): Promise<string> => {
      const res = await fetch(
        `https://affectus-backend.onrender.com/api/children/by-name/${encodeURIComponent(
          name
        )}`
      );
      if (!res.ok) {
        console.log(encodeURIComponent(
          name
        ))
        throw new Error("Erro ao buscar criança.");
      }
      const data = await res.json();
      if (data.length === 0) {
        throw new Error("Criança não encontrada.");
      }
      return data[0].id; // Supondo que o ID da criança está na propriedade 'id'
    };

    const fetchPatientIdByName = async (name: string): Promise<string> => {
      const res = await fetch(
      `https://affectus-backend.onrender.com/api/patients/by-name/${encodeURIComponent(
        name
      )}`
      );
      if (!res.ok) {
      throw new Error(`Erro ao buscar paciente com nome ${name}`);
      }
      const data = await res.json();
      if (data.length === 0) {
      throw new Error("Paciente não encontrado.");
      }
      return data[0].id; // Supondo que o ID do paciente está na propriedade 'id'
    };

    try {
      setIsSaving(true);
      const childId = await fetchChildIdByName(formData.nomeCrianca.trim());
      const patientId = await fetchPatientIdByName(formData.nomeCrianca.trim());

      const medicamentosValue =
        formData.usoMedicamentos === "sim"
          ? formData.descricaoUsoMedicamentos.trim()
          : "";

      const payload = {
        childId,
        patientId,
        data: formData.data,
        medicamentos: medicamentosValue,
        descricao: formData.diagnostico.trim(),
        procedimentos: getProcedimentosString(),
      };

      const res = await fetch("https://affectus-backend.onrender.com/api/relatorios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text().catch(() => "Erro ao salvar.");
        throw new Error(msg || "Erro ao salvar.");
      }

      alert("Relatório salvo com sucesso.");
    } catch (err: any) {
      const isCors =
        err instanceof TypeError &&
        (err.message === "Failed to fetch" || err.message.includes("Network"));
      const msg = isCors
        ? "Falha de CORS / rede. Em produção o backend precisa enviar Access-Control-Allow-Origin."
        : err.message || "Erro desconhecido.";
      setSaveError(msg);
      alert(`Falha ao salvar relatório: ${msg}`);
    } finally {
      setIsSaving(false);
    }
  };

  const styles = {
    container: {
      height: "100vh",
      width: "100vw",
      backgroundColor: "#87CEEB",
      padding: "20px",
      fontFamily: "'Nunito', sans-serif",
      margin: 0,
      overflow: "auto",
      position: "relative" as const,
    },
    backButton: {
      position: "absolute" as const,
      top: "20px",
      left: "20px",
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
    },
    formContainer: {
      maxWidth: "600px",
      margin: "60px auto 20px",
      backgroundColor: "#D3D3D3",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      position: "relative" as const,
    },
    title: {
      textAlign: "center" as const,
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "30px",
      color: "#000",
      lineHeight: "1.3",
      fontFamily: "'Nunito', sans-serif",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "bold",
      marginBottom: "5px",
      color: "#000",
      fontFamily: "'Nunito', sans-serif",
    },
    input: {
      width: "100%",
      padding: "8px",
      fontSize: "14px",
      border: "none",
      borderBottom: "2px solid #000",
      backgroundColor: "transparent",
      outline: "none",
      fontFamily: "'Nunito', sans-serif",
    },
    inputRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      marginBottom: "20px",
    },
    textarea: {
      width: "100%",
      height: "100px",
      padding: "10px",
      fontSize: "14px",
      border: "2px solid #000",
      borderRadius: "5px",
      backgroundColor: "transparent",
      outline: "none",
      resize: "vertical" as const,
      fontFamily: "'Nunito', sans-serif",
    },
    radioGroup: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      marginTop: "10px",
    },
    radioItem: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    radio: {
      width: "16px",
      height: "16px",
    },
    checkboxGroup: {
      marginTop: "10px",
    },
    checkboxItem: {
      display: "flex",
      alignItems: "center",
      marginBottom: "8px",
      gap: "8px",
    },
    checkbox: {
      width: "16px",
      height: "16px",
    },
    checkboxLabel: {
      fontSize: "14px",
      color: "#000",
      fontWeight: "normal",
      fontFamily: "'Nunito', sans-serif",
    },
    outroInput: {
      marginLeft: "24px",
      marginTop: "5px",
      width: "calc(100% - 24px)",
      padding: "4px",
      fontSize: "14px",
      border: "none",
      borderBottom: "1px solid #000",
      backgroundColor: "transparent",
      outline: "none",
      fontFamily: "'Nunito', sans-serif",
    },
    crisesContainer: {
      marginBottom: "20px",
    },
    crisesInput: {
      marginLeft: "10px",
      width: "250px",
      padding: "4px",
      fontSize: "14px",
      border: "none",
      borderBottom: "1px solid #000",
      backgroundColor: "transparent",
      outline: "none",
      fontFamily: "'Nunito', sans-serif",
    },
    actionButtons: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginTop: "30px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "14px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontFamily: "'Nunito', sans-serif",
    },
    saveButton: {
      backgroundColor: "#4CAF50",
      color: "white",
    },
    cancelButton: {
      backgroundColor: "#f44336",
      color: "white",
    },
    printButton: {
      backgroundColor: "#2196F3",
      color: "white",
    },
    crisesText: {
      fontSize: "14px",
      marginRight: "10px",
      fontFamily: "'Nunito', sans-serif",
    },
  };

  const procedimentosLabels: Record<string, string> = {
    exameClinico: "Exame Clínico",
    limpezaProfilaxia: "Limpeza/Profilaxia",
    tratamentoRestaurador: "Tratamento Restaurador",
    orientacaoPreventiva: "Orientação Preventiva",
    outro: "Outro",
  };

  return (
    <>
      <style>{`
        @media print {
          body {
            background-color: white !important;
          }
          .no-print {
            display: none !important;
          }
          .print-container {
            background-color: white !important;
            box-shadow: none !important;
            padding: 20px !important;
            max-width: 100% !important;
          }
          .page-break {
            page-break-inside: avoid;
          }
        }
      `}</style>

      <div style={styles.container}>
        <button
          className="no-print"
          style={styles.backButton}
          onClick={handleGoBack}
        >
          <img
            src={arrowImage}
            alt="Voltar"
            style={{ width: "32px", height: "32px" }}
          />
          <span style={{ fontSize: "24px" }}></span>
        </button>

        <div style={styles.formContainer} className="print-container">
          <h1 style={styles.title}>
            RELATÓRIO DE ATENDIMENTO
            <br />
            ODONTOLÓGICO
          </h1>

          <form>
            <div style={styles.formGroup} className="page-break">
              <label style={styles.label}>NOME DA CRIANÇA:</label>
              <input
                type="text"
                name="nomeCrianca"
                value={formData.nomeCrianca}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "20px",
                alignItems: "center",
              }}
              className="page-break"
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                    color: "#000",
                    fontFamily: "'Nunito', sans-serif",
                  }}
                >
                  IDADE
                </label>
                <input
                  type="text"
                  name="idade"
                  value={formData.idade}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "14px",
                    border: "none",
                    borderBottom: "2px solid #000",
                    backgroundColor: "transparent",
                    outline: "none",
                    height: "36px",
                    fontFamily: "'Nunito', sans-serif",
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                    color: "#000",
                    fontFamily: "'Nunito', sans-serif",
                  }}
                >
                  DATA
                </label>
                <input
                  type="date"
                  name="data"
                  value={formData.data}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "14px",
                    border: "none",
                    borderBottom: "2px solid #000",
                    backgroundColor: "transparent",
                    outline: "none",
                    height: "36px",
                    lineHeight: "36px",
                    fontFamily: "'Nunito', sans-serif",
                  }}
                />
              </div>
            </div>

            <div style={styles.formGroup} className="page-break">
              <label style={styles.label}>
                VOCÊ POSSUI ALGUM PROBLEMA DE SAÚDE?
              </label>
              <div style={styles.radioGroup}>
                <div style={styles.radioItem}>
                  <input
                    type="radio"
                    name="problemaSaude"
                    value="sim"
                    checked={formData.problemaSaude === "sim"}
                    onChange={handleRadioChange}
                    style={styles.radio}
                  />
                  <label style={styles.checkboxLabel}>Sim</label>
                </div>
                <div style={styles.radioItem}>
                  <input
                    type="radio"
                    name="problemaSaude"
                    value="nao"
                    checked={formData.problemaSaude === "nao"}
                    onChange={handleRadioChange}
                    style={styles.radio}
                  />
                  <label style={styles.checkboxLabel}>Não</label>
                </div>
                {formData.problemaSaude === "sim" && (
                  <input
                    type="text"
                    name="descricaoProblemaSaude"
                    value={formData.descricaoProblemaSaude}
                    onChange={handleInputChange}
                    placeholder="Quais?"
                    style={styles.crisesInput}
                  />
                )}
              </div>
            </div>

            <div style={styles.formGroup} className="page-break">
              <label style={styles.label}>TEM ALERGIA A ALGUM REMÉDIO?</label>
              <div style={styles.radioGroup}>
                <div style={styles.radioItem}>
                  <input
                    type="radio"
                    name="alergia"
                    value="sim"
                    checked={formData.alergia === "sim"}
                    onChange={handleRadioChange}
                    style={styles.radio}
                  />
                  <label style={styles.checkboxLabel}>Sim</label>
                </div>
                <div style={styles.radioItem}>
                  <input
                    type="radio"
                    name="alergia"
                    value="nao"
                    checked={formData.alergia === "nao"}
                    onChange={handleRadioChange}
                    style={styles.radio}
                  />
                  <label style={styles.checkboxLabel}>Não</label>
                </div>
                {formData.alergia === "sim" && (
                  <input
                    type="text"
                    name="descricaoAlergia"
                    value={formData.descricaoAlergia}
                    onChange={handleInputChange}
                    placeholder="Quais?"
                    style={styles.crisesInput}
                  />
                )}
              </div>
            </div>

            <div style={styles.formGroup} className="page-break">
              <label style={styles.label}>FAZ USO DE MEDICAMENTOS?</label>
              <div style={styles.radioGroup}>
                <div style={styles.radioItem}>
                  <input
                    type="radio"
                    name="usoMedicamentos"
                    value="sim"
                    checked={formData.usoMedicamentos === "sim"}
                    onChange={handleRadioChange}
                    style={styles.radio}
                  />
                  <label style={styles.checkboxLabel}>Sim</label>
                </div>
                <div style={styles.radioItem}>
                  <input
                    type="radio"
                    name="usoMedicamentos"
                    value="nao"
                    checked={formData.usoMedicamentos === "nao"}
                    onChange={handleRadioChange}
                    style={styles.radio}
                  />
                  <label style={styles.checkboxLabel}>Não</label>
                </div>
                {formData.usoMedicamentos === "sim" && (
                  <input
                    type="text"
                    name="descricaoUsoMedicamentos"
                    value={formData.descricaoUsoMedicamentos}
                    onChange={handleInputChange}
                    placeholder="Quais?"
                    style={styles.crisesInput}
                  />
                )}
              </div>
            </div>

            <div style={styles.formGroup} className="page-break">
              <label style={styles.label}>DIAGNÓSTICO ODONTOLÓGICO</label>
              <textarea
                name="diagnostico"
                value={formData.diagnostico}
                onChange={handleInputChange}
                style={styles.textarea}
                placeholder="Descreva o diagnóstico..."
              />
            </div>

            <div style={styles.crisesContainer} className="page-break">
              <label style={styles.label}>
                CRISES / INTERCORRÊNCIAS DURANTE ATENDIMENTO
              </label>
              <div style={styles.radioGroup}>
                <div style={styles.radioItem}>
                  <input
                    type="radio"
                    name="temCrises"
                    value="sim"
                    checked={formData.temCrises === "sim"}
                    onChange={handleRadioChange}
                    style={styles.radio}
                  />
                  <label style={styles.checkboxLabel}>Sim</label>
                </div>
                <div style={styles.radioItem}>
                  <input
                    type="radio"
                    name="temCrises"
                    value="nao"
                    checked={formData.temCrises === "nao"}
                    onChange={handleRadioChange}
                    style={styles.radio}
                  />
                  <label style={styles.checkboxLabel}>Não</label>
                </div>
                {formData.temCrises === "sim" && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={styles.crisesText}>Se sim, descreva:</span>
                    <input
                      type="text"
                      name="descricaoCrises"
                      value={formData.descricaoCrises}
                      onChange={handleInputChange}
                      style={styles.crisesInput}
                    />
                  </div>
                )}
              </div>
            </div>

            <div style={styles.formGroup} className="page-break">
              <label style={styles.label}>PROCEDIMENTOS REALIZADOS</label>
              <div style={styles.checkboxGroup}>
                {Object.entries(formData.procedimentos).map(
                  ([key, checked]) => (
                    <div key={key} style={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        id={key}
                        name={key}
                        checked={checked}
                        onChange={handleCheckboxChange}
                        style={styles.checkbox}
                      />
                      <label htmlFor={key} style={styles.checkboxLabel}>
                        {procedimentosLabels[key]}
                      </label>
                    </div>
                  )
                )}
                {formData.procedimentos.outro && (
                  <input
                    type="text"
                    name="outroDescricao"
                    value={formData.outroDescricao}
                    onChange={handleInputChange}
                    style={styles.outroInput}
                    placeholder="Especifique o outro procedimento..."
                  />
                )}
              </div>
            </div>

            <div style={styles.actionButtons} className="no-print">
              <button
                type="button"
                style={{ ...styles.button, ...styles.printButton }}
                onClick={handlePrint}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0b7dda")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2196F3")
                }
              >
                <Printer size={18} />
                Imprimir
              </button>
              <button
                type="button"
                style={{
                  ...styles.button,
                  ...styles.saveButton,
                  opacity: isSaving ? 0.7 : 1,
                  pointerEvents: isSaving ? "none" : "auto",
                }}
                onClick={handleSave}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#45a049")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#4CAF50")
                }
              >
                {isSaving ? "Salvando..." : "Salvar Relatório"}
              </button>
              <button
                type="button"
                style={{ ...styles.button, ...styles.cancelButton }}
                onClick={handleGoBack}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#da190b")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f44336")
                }
              >
                Cancelar
              </button>
            </div>
            {saveError && (
              <p
                style={{
                  color: "#b00020",
                  fontSize: "13px",
                  marginTop: "10px",
                }}
              >
                {saveError}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default RelatorioOdontologico;
