import Fornecedor from "services/supplier/AddSupplierService/interfaces/response";

export default interface UpdateSupplierRequest {
  idEmpresa: string;
  dados: Fornecedor
}