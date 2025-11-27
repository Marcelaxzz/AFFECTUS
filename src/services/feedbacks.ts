const BASE_URL = "https://affectus-backend.onrender.com";

export interface FeedbackCreate {
  tipo: "Feliz" | "Normal" | "Triste";
  // adicione outros campos se necessários (ex: patientId)
}

export interface Feedback {
  id?: number;
  tipo: "Feliz" | "Normal" | "Triste";
}

export async function createFeedback(
  data: FeedbackCreate,
  signal?: AbortSignal
): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/feedbacks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    signal,
  });
  if (!res.ok) throw new Error(`Erro ao enviar feedback: ${res.status}`);
}

export async function fetchFeedbacks(
  signal?: AbortSignal
): Promise<Feedback[]> {
  const res = await fetch(`${BASE_URL}/api/feedbacks`, { signal });
  if (!res.ok) throw new Error(`Erro ao buscar feedbacks: ${res.status}`);
  return res.json();
}
