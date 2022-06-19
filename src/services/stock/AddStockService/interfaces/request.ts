type Lote = {
  id: string | null;
  ehLoteNovo: boolean;
  dataValidadeIndeterminada: boolean;
  dataFabricacao: Date;
  dataValidade: Date;
  observacoes: string;
  codigo: string;
  quantidadeProdutos: number;
}

export default interface AddStockRequest {
  idEmpresa: string;
  idAutenticacao: string;
  idProduto: string;
  tipoAcao: string;
  dataAcao: Date;
  quantidadeAcao: number;
  lote: Lote;
}
