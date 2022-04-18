import { Contact } from "components/forms";

export type Fornecedor = {
  idEmpresa: string;
  cnpj?: string;
  razaoSocial?: string;
  nomeFantasia: string;
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
};

export default interface FindByBusinessResponse {
  fornecedores: Fornecedor[];
}