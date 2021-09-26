import { Contact } from "components/forms";
import { Generos, TipoUsuario, TratarComo } from "typing/enums";

export default interface UpdateUserRequest {
  idAutenticacao: string;
  idEmpresa: string;
  cpf: string;
  nome: string;
  dataNascimento: Date;
  genero: keyof typeof Generos;
  generoPersonalizado?: string;
  tratarPor: keyof typeof TratarComo;
  tipoUsuario: keyof typeof TipoUsuario;
  contatos: Contact[]
}