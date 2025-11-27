export interface RelatorioRaw {
  id: number;
  patientId: number;
  data: string;
  medicamentos: string;
  descricao: string;
  procedimentos: string;
}

export interface Patient {
  id: number;
  name: string;
}

export async function fetchRelatoriosRaw(): Promise<RelatorioRaw[]> {
  const res = await fetch(
    "https://affectus-backend.onrender.com/api/relatorios"
  );
  if (!res.ok) throw new Error("Falha ao buscar relatórios");
  return res.json();
}

export async function fetchChildrenByIds(ids: number[]): Promise<Patient[]> {
  const results = await Promise.all(
    ids.map(async (id) => {
      const res = await fetch(
        `https://affectus-backend.onrender.com/api/patients/${id}`
      );
      if (!res.ok) throw new Error(`Falha ao buscar criança ${id}`);
      return res.json();
    })
  );
  return results;
}

export async function assembleRelatorios() {
  const relatorios = await fetchRelatoriosRaw();
  const uniqueIds = [...new Set(relatorios.map((r) => r.patientId))];
  const children = await fetchChildrenByIds(uniqueIds);
  const childMap = new Map(children.map((c) => [c.id, c.name]));
  return relatorios.map((r) => ({
    ...r,
    nomePaciente: childMap.get(r.patientId) ?? "Desconhecido",
  }));
}
