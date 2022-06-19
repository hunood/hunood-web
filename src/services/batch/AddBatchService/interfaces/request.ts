export default interface AddBatchRequest {
  idEmpresa: string,
  identificacao: string,
  dataValidadeIndeterminada: boolean,
  dataFabricacao?: Date;
  dataValidade?: Date;
  observacoes?: string;
  codigoLote: string
}