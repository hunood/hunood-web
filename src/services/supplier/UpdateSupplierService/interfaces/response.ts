import Fornecedor from "services/supplier/AddSupplierService/interfaces/response";

export default interface UpdateSupplierResponse {
  fornecedor: Fornecedor,
  readonly createdAt: Date;
  readonly updatedAt: Date;
}