import { Estados } from "typing/enums";

export default interface CepResponse {
  cep: string,
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: keyof typeof Estados,
  ibge: string,
  gia: string,
  ddd: string,
  siafi: string
}