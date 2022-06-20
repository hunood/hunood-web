import { Produto } from "services/product/GetAllProductsService/interfaces/response";

export default interface UpdateProductResponse {
  produto: Produto,
  readonly createdAt: Date;
  readonly updatedAt: Date;
}