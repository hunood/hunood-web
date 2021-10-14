import { Generos, TipoUsuario, TratarComo } from "typing/enums";

export interface Usuario {
  id: string;
  id_autenticacao: string;
  cpf: string;
  nome: string;
  nomeUsuario: string;
  usuarioAtivo: boolean;
  dataNascimento: Date;
  genero: keyof Generos,
  generoPersonalizado: string;
  tratarPor: keyof TratarComo;
  tipoUsuario: keyof TipoUsuario;
  ultimaAtualizacaoAssociacao: Date;
}
export default interface FindByBusinessResponse {
  usuarios: Usuario[]
}
