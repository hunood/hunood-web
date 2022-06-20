import { Acao } from "typing/enums"

export type Lote = {
  id: string,
  dataFabricacao: Date | null,
  dataValidade: Date | null,
  observacoes: string,
  quantidadeProdutos: number,
  codigo: string,
  idProduto: string,
  tipoAcao: keyof typeof Acao,
  dataAcao: Date,
  idAutenticacao: string,
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type Produto = {
  id: string,
  idEmpresa: string,
  idTipoProduto: number,
  nome: string,
  unidadeMedida: string,
  quantidade: number,
  precoUnidade: number,
  marca: string,
  codigo: string,
  lotes: Lote[],
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export default interface GetAllProductResponse {
  produtos: Produto[]
}