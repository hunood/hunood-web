export default interface AddBatchResponse {
  id: string;
  dataFabricacao: Date | null;
  dataValidade: Date | null;
  observacoes?: string,
  readonly createdAt: Date;
  readonly updatedAt: Date;
}