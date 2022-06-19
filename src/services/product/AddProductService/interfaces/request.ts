import { AddBatchRequest } from "services/batch/AddBatchService";

export default interface AddProductRequest extends Partial<AddBatchRequest> {
  idEmpresa: string,
  idTipoProduto: number,
  nome: string,
  unidadeMedida: string,
  quantidade: number,
  precoUnidade: number
  marca: string,
  codigo: string,
  perecivel: boolean
}