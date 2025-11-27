export interface Relatorio {
  id: number;
  patientId: number;
  patient: {
    id: number;
    name: string;
    cpf: string | null;
    genero: string;
    dataNascimento: string;
    tipoPaciente: string;
    addresses: any[]; // ajustar depois se necessário
  };
  data: string; // ISO
  medicamentos: string;
  descricao: string;
  procedimentos: string;
}
