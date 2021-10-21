import { Contact } from "components/forms";

export default interface AddSupplierRequest {
  idEmpresa: string;
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
  observacoes?: string;
  contatos: Contact[],
}