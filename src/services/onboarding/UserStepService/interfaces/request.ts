import { Contact } from "components/forms";
import { Generos, TratarComo } from "typing/enums";

export default interface UserStepRequest {
  idAutenticacao: string;
  cpf: string;
  nome: string;
  dataNascimento: Date;
  genero: keyof typeof Generos;
  generoPersonalizado?: string;
  tratarPor: keyof typeof TratarComo;
  contatos: Contact[]
}