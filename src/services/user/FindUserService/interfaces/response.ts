import { Generos } from "typing/enums";

export default interface FindUserResponse {
  id: string;
  id_autenticacao: string;
  cpf: string;
  nome: string;
  data_nascimento: Date;
  genero: typeof Generos,
  genero_personalizado: string;
  tratar_por: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
