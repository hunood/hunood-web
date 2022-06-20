import { Lote } from "services/product/GetAllProductsService/interfaces/response";

export default interface UpdateBatchRequest {
  idProduto: string,
  dados?: Lote
}