export default interface UpdateEmailResponse {
  id: string;
  email: string;
  email_valido: boolean;
  etapa_onboarding: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
