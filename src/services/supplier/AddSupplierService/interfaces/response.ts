import { Contact } from "components/forms";

export default interface AddSupplierResponse {
  id: string;
  idEmpresa: string;
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
  observacoes?: string;
  contatos: Contact[],
  readonly createdAt: Date;
  readonly updatedAt: Date;
}