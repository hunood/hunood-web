import { ErrorService } from "typing/types";

export default interface AddProductResponse extends ErrorService {
  idTipoProduto: number,
  nome: string,
  unidadeMedida: string,
  quantidade: number,
  precoUnidade: number
  marca: string,
  readonly createdAt: Date;
  readonly updatedAt: Date;
}