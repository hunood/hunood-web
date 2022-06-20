export default interface AddBatchRequest {
  idEmpresa: string,
  identificacao: string,
  dataFabricacao?: Date | null;
  dataValidade?: Date | null;
  observacoes?: string;
  codigoLote: string
}