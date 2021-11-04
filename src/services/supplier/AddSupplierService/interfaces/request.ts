import { Contact } from "components/forms";

export default interface AddSupplierRequest {
  idEmpresa: string;
  cnpj: string | null;
  razaoSocial: string | null;
  nomeFantasia: string;
  cepLogradouro: string;
  nomeLogradouro: string;
  numeroLogradouro: string;
  complementoLogradouro: string | null;
  bairroLogradouro: string;
  cidadeLogradouro: string;
  estadoLogradouro: string;
  observacoes: string | null;
  contatos: Contact[],
}