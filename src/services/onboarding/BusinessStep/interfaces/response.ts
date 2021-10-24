import { Enums } from "typing";

export default interface BusinessStepResponse {
  id: string,
  nomeFantasia: string,
  tipoUsuario: keyof typeof Enums.TipoUsuario
}