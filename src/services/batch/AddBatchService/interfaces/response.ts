export default interface AddBatchResponse {
  id: string;
  dataFabricacao: string;
  dataValidade: string;
  observacoes?: string,
  readonly createdAt: Date;
  readonly updatedAt: Date;
}