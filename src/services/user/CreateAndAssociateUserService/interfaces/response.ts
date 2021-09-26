import { Enums } from "typing";

export default interface CreacteAndAssociateUserResponse {
  id_autenticacao: string;
  id_empresa: string;
  tipo_usuario: Enums.TipoUsuario;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}