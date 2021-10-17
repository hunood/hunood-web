import { TipoUsuario } from "typing/enums";

export default interface UpdateAssociationRequest {
  idAutenticacao: string;
  idEmpresa: string;
  dados: {
    nomeUsuario?: string,
    usuarioAtivo?: boolean,
    tipoUsuario?: keyof TipoUsuario
  }
}