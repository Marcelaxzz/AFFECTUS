export interface Address {
  id: number;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface Patient {
  id: number;
  name: string;
  tipoPaciente: string | null;
  cpf: string | null;
  genero: string;
  dataNascimento: string;
  addresses: Address[];
}
