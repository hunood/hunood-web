import { Lote } from "services/product/GetAllProductsService/interfaces/response";

export default interface UpdateBatchResponse {
  lote: Lote,
  readonly createdAt: Date;
  readonly updatedAt: Date;
}