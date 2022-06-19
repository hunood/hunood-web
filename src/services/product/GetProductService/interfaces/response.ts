export default interface GetProductResponse {
  id: string,
  idEmpresa: string,
  idTipoProduto: number,
  nome: string,
  unidadeMedida: string,
  quantidade: number,
  precoUnidade: number,
  marca: string,
  perecivel: boolean,
  readonly createdAt: Date;
  readonly updatedAt: Date;
}