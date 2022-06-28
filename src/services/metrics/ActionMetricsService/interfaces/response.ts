import { Acao } from "typing/enums";

export interface UsuarioMetrica {
  createdAt: Date;
  updatedAt: Date;
  idAutenticacao: string;
  idEmpresa: string;
  nomeUsuario: string;
  usuarioAtivo: boolean;
  tipoUsuario: string
}

export interface ProdutoMetrica {
  id: string;
  nome: string;
  quantidade: number;
  marca: string;
  codigo: string;
  createdAt: Date;
  updatedAt: Date;
  idEmpresa: string;
  idTipoProduto: number;
  unidadeMedida: string;
  precoUnidade: number
}

export interface Metrica {
  id: string;
  usuario: UsuarioMetrica;
  produto: ProdutoMetrica;
  idEmpresa: string;
  idAutenticacao: string;
  idProduto: string;
  idLote: string;
  tipoAcao: keyof typeof Acao;
  dataAcao: Date;
  createdAt: Date;
  updatedAt: Date
}

export default interface ActionMetricsResponse {
  metricas: Metrica[]
}