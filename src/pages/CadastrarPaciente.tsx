import React, { useState } from "react";
import { createPatient } from "../services/patients";
import type { Patient, Address } from "../types/patient";

const emptyAddress: Address = {
  id: 0,
  logradouro: "",
  numero: "",
  bairro: "",
  cidade: "",
  estado: "",
  cep: "",
};

interface FormState {
  name: string;
  tipoPaciente: string;
  cpf: string;
  genero: string;
  dataNascimento: string;
  addresses: Address[];
}

const initialForm: FormState = {
  name: "",
  tipoPaciente: "",
  cpf: "",
  genero: "",
  dataNascimento: "",
  addresses: [{ ...emptyAddress }],
};

const CadastrarPaciente: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const updateField = (field: keyof FormState, value: any) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const updateAddress = (
    index: number,
    field: keyof Address,
    value: string
  ) => {
    setForm((f) => {
      const addresses = f.addresses.map((a, i) =>
        i === index ? { ...a, [field]: value } : a
      );
      return { ...f, addresses };
    });
  };

  const addAddress = () => {
    setForm((f) => ({
      ...f,
      addresses: [...f.addresses, { ...emptyAddress }],
    }));
  };

  const removeAddress = (index: number) => {
    setForm((f) => ({
      ...f,
      addresses: f.addresses.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.name.trim()) {
      setError("Nome é obrigatório.");
      return;
    }
    if (!form.genero.trim()) {
      setError("Gênero é obrigatório.");
      return;
    }
    if (!form.dataNascimento) {
      setError("Data de nascimento é obrigatória.");
      return;
    }

    const payload: Omit<Patient, "id"> = {
      name: form.name.trim(),
      tipoPaciente: form.tipoPaciente.trim() || "",
      cpf: form.cpf.trim() || null,
      genero: form.genero,
      dataNascimento: form.dataNascimento,
      addresses: form.addresses
        .filter((a) => a.logradouro.trim())
        .map((a, idx) => ({ ...a, id: idx + 1 })),
    };

    setSaving(true);
    try {
      await createPatient(payload);
      setSuccess("Paciente cadastrado com sucesso.");
      setForm(initialForm);
    } catch (err: any) {
      setError(err.message || "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Cadastrar Paciente</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.grid}>
          <div style={styles.field}>
            <label style={styles.label}>Nome *</label>
            <input
              style={styles.input}
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Nome completo"
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Tipo Paciente</label>
            <input
              style={styles.input}
              value={form.tipoPaciente}
              onChange={(e) => updateField("tipoPaciente", e.target.value)}
              placeholder="Ex: Neurodivergente"
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>CPF</label>
            <input
              style={styles.input}
              value={form.cpf}
              onChange={(e) => updateField("cpf", e.target.value)}
              placeholder="123.456.789-00"
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Gênero *</label>
            <select
              style={styles.input}
              value={form.genero}
              onChange={(e) => updateField("genero", e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="M">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Data Nascimento *</label>
            <input
              type="date"
              style={styles.input}
              value={form.dataNascimento}
              onChange={(e) => updateField("dataNascimento", e.target.value)}
            />
          </div>
        </div>

        <div style={styles.addressHeader}>
          <h2 style={styles.subtitle}>Endereços</h2>
          <button type="button" style={styles.addButton} onClick={addAddress}>
            + Adicionar
          </button>
        </div>

        {form.addresses.map((addr, idx) => (
          <div key={idx} style={styles.addressBlock}>
            <div style={styles.addressRow}>
              <div style={styles.addressField}>
                <label style={styles.labelSmall}>Logradouro</label>
                <input
                  style={styles.input}
                  value={addr.logradouro}
                  onChange={(e) =>
                    updateAddress(idx, "logradouro", e.target.value)
                  }
                  placeholder="Rua / Av."
                />
              </div>
              <div style={styles.addressField}>
                <label style={styles.labelSmall}>Número</label>
                <input
                  style={styles.input}
                  value={addr.numero}
                  onChange={(e) => updateAddress(idx, "numero", e.target.value)}
                  placeholder="123"
                />
              </div>
              <div style={styles.addressField}>
                <label style={styles.labelSmall}>Bairro</label>
                <input
                  style={styles.input}
                  value={addr.bairro}
                  onChange={(e) => updateAddress(idx, "bairro", e.target.value)}
                  placeholder="Centro"
                />
              </div>
              <div style={styles.addressField}>
                <label style={styles.labelSmall}>Cidade</label>
                <input
                  style={styles.input}
                  value={addr.cidade}
                  onChange={(e) => updateAddress(idx, "cidade", e.target.value)}
                  placeholder="São Paulo"
                />
              </div>
              <div style={styles.addressField}>
                <label style={styles.labelSmall}>Estado</label>
                <input
                  style={styles.input}
                  value={addr.estado}
                  onChange={(e) => updateAddress(idx, "estado", e.target.value)}
                  placeholder="SP"
                />
              </div>
              <div style={styles.addressField}>
                <label style={styles.labelSmall}>CEP</label>
                <input
                  style={styles.input}
                  value={addr.cep}
                  onChange={(e) => updateAddress(idx, "cep", e.target.value)}
                  placeholder="00000-000"
                />
              </div>
            </div>
            {form.addresses.length > 1 && (
              <button
                type="button"
                style={styles.removeButton}
                onClick={() => removeAddress(idx)}
              >
                Remover
              </button>
            )}
          </div>
        ))}

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <button type="submit" style={styles.submitButton} disabled={saving}>
          {saving ? "Salvando..." : "Cadastrar Paciente"}
        </button>
      </form>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 960,
    margin: "40px auto",
    padding: "24px 32px",
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    fontFamily: "'Nunito', sans-serif",
  },
  title: {
    margin: "0 0 24px", // corrigido: antes estava margin: 0 0 24px,
    fontSize: 32,
    fontWeight: 700,
    color: "#111827",
  },
  subtitle: {
    margin: "0",
    fontSize: 20,
    fontWeight: 700,
    color: "#111827",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
    gap: 16,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: ".5px",
    textTransform: "uppercase",
    color: "#374151",
  },
  labelSmall: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: ".5px",
    textTransform: "uppercase",
    color: "#4b5563",
  },
  input: {
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    fontSize: 14,
    outline: "none",
  },
  addressHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addButton: {
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
  },
  removeButton: {
    alignSelf: "flex-start",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    marginTop: 8,
  },
  addressBlock: {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 16,
    background: "#f9fafb",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  addressRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))",
    gap: 12,
  },
  addressField: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  submitButton: {
    background: "#10b981",
    color: "#fff",
    border: "none",
    padding: "14px 24px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 16,
    letterSpacing: ".5px",
    boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
  },
  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "10px 14px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
  },
  success: {
    background: "#dcfce7",
    color: "#065f46",
    padding: "10px 14px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
  },
};

export default CadastrarPaciente;
