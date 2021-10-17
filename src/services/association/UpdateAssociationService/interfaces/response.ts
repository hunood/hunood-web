import { Generos } from "typing/enums";

export default interface UpdateAssociationResponse {
  id: string;
  idAutenticacao: string;
  cpf: string;
  nome: string;
  dataNascimento: Date;
  genero: keyof typeof Generos;
  generoPersonalizado: string;
  tratarPor: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}