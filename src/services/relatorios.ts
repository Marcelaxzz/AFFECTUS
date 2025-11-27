import type { Relatorio } from "../types/relatorio";

const BASE_URL = "https://affectus-backend.onrender.com";

export async function fetchRelatorios(signal?: AbortSignal): Promise<Relatorio[]> {
  const res = await fetch(`${BASE_URL}/api/relatorios`, { signal });
  if (!res.ok) throw new Error(`Erro ao buscar relatórios: ${res.status}`);
  return res.json();
}

// Normaliza para comparar nomes sem acentos e case-insensitive
const normalize = (s?: string) =>
  (s || "").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();

export async function fetchRelatoriosForPatient(
  patient: { id: number; name: string },
  signal?: AbortSignal
): Promise<Relatorio[]> {
  const all = await fetchRelatorios(signal);
  const nameNorm = normalize(patient.name);

  return all
    .filter(r => r.patientId === patient.id || normalize(r.patient?.name) === nameNorm)
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
}

export async function fetchRelatoriosByPatientId(
  patientId: number,
  signal?: AbortSignal
): Promise<Relatorio[]> {
  const res = await fetch(`${BASE_URL}/api/relatorios/${patientId}`, { signal });
  if (!res.ok)
    throw new Error(
      `Erro ao buscar relatórios do paciente ${patientId}: ${res.status}`
    );
  return res.json();
}
