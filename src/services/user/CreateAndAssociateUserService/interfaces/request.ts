import { Contact } from "components/forms";
import { Generos, TipoUsuario, TratarComo } from "typing/enums";

export default interface CreacteAndAssociateUserRequest {
  idEmpresa: string;
  cpf: string;
  tipoUsuario: keyof typeof TipoUsuario;
  nome?: string;
  dataNascimento?: Date;
  genero?: keyof typeof Generos;
  generoPersonalizado?: string;
  tratarPor?: keyof typeof TratarComo;
  contatos?: Contact[]
}