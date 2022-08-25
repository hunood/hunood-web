import { TipoUsuario } from "typing/enums";

export type UsuarioEmpresa = {
  id: string,
  tipoUsuario: keyof TipoUsuario,
  nomeFantasia: string,
  nomeUsuario: string
}

export default interface FindByUserResponse {
  empresas: UsuarioEmpresa[]
}