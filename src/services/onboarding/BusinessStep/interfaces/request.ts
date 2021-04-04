export default interface BusinessStepRequest {
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
}