export type Lote = {
  id: string,
  dataFabricacao: Date
  dataValidade: Date
  dataValidadeIndeterminada: boolean
  observacoes: string,
  quantidadeProdutos: number,
  codigo: string,
  idProduto: string,
  tipoAcao: string, // ENTRADA SAIDA
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
  perecivel: boolean,
  tangivel: boolean,
  codigo: string,
  lotes: Lote[],
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export default interface GetAllProductResponse {
  produtos: Produto[]
}