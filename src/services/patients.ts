import type { Patient } from "../types/patient";

const BASE_URL = "https://affectus-backend.onrender.com";

export async function fetchPatients(signal?: AbortSignal): Promise<Patient[]> {
  const res = await fetch(`${BASE_URL}/api/patients`, { signal });
  if (!res.ok) throw new Error(`Erro ao buscar pacientes: ${res.status}`);
  return res.json();
}

export async function createPatient(
  patient: Omit<Patient, "id">,
  signal?: AbortSignal
): Promise<Patient> {
  const res = await fetch(`${BASE_URL}/api/patients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient),
    signal,
  });
  if (!res.ok) throw new Error(`Erro ao criar paciente: ${res.status}`);
  return res.json();
}
