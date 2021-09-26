import { Moment } from "moment"
import { Enums } from "typing"

export type Empresa = {
  id: string,
  tipoUsuario: keyof typeof Enums.TipoUsuario
}

export type Usuario = {
  id: string,
  cpf: string,
  nome: string,
  dataNascimento: Moment,
  genero: keyof typeof Enums.Generos,
  generoPersonalizado: string | null,
  tratarPor: keyof typeof Enums.TratarComo
}

export default interface AuthentecateResponse {
  id: string,
  email: string,
  emailValido: boolean,
  etapaOnboarding: number,
  empresas: Empresa[],
  usuario: Usuario
}

