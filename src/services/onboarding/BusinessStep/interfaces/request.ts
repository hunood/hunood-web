export default interface SignupRequest {
  cnpj?: string;
  razaoSocial?: string;
  nomeFantasia: boolean;
  cepLogradouro: string;
  nomeLogradouro: string;
  numeroLogradouro: number;
  complementoLogradouro?: string;
  bairroLogradouro: string;
  cidadeLogradouro: string;
  estadoLogradouro: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}