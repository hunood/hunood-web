export default interface VerifyAssociationUserResponse {
  associacao: boolean
  associadoNaEmpresa: boolean,
  emailCadastrado: boolean;
  cpfCadastrado: boolean;
  emailCpfCadastrado: string;
}

