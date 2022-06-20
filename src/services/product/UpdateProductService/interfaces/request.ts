import { Produto } from "services/product/GetAllProductsService/interfaces/response";

export default interface UpdateProductRequest {
  idEmpresa: string;
  dados?: Produto
}