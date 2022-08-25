import { Moment } from "moment"
import { Generos, TipoUsuario, TratarComo } from "typing/enums"

export type UsuarioEmpresa = {
  id: string,
  tipoUsuario: keyof TipoUsuario,
  nomeFantasia: string,
  nomeUsuario: string
}

export type Usuario = {
  id: string,
  cpf: string,
  nome: string,
  dataNascimento: Moment,
  genero: keyof typeof Generos,
  generoPersonalizado: string | null,
  tratarPor: keyof typeof TratarComo
}

export default interface AuthentecateResponse {
  id: string,
  email: string,
  emailValido: boolean,
  etapaOnboarding: number,
  empresas: UsuarioEmpresa[],
  usuario: Usuario
}

