import { TipoUsuario } from "typing/enums";

export type UsuarioEmpresa = {
  id: string,
  tipoUsuario: keyof TipoUsuario,
  nomeFantasia: string
}

export default interface FindByUserResponse {
  empresas: UsuarioEmpresa[]
}