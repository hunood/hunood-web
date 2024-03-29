export default interface BusinessStepRequest {
  cnpj?: string;
  razaoSocial?: string;
  nomeFantasia: string;
  cepLogradouro: string;
  nomeLogradouro: string;
  numeroLogradouro: string;
  complementoLogradouro?: string;
  bairroLogradouro: string;
  cidadeLogradouro: string;
  estadoLogradouro: string;
}