export default interface AuthentecateResponse {
  id: string,
  email: string,
  emailValido: boolean,
  etapaOnboarding: number,
  accessToken: string,
  refreshToken: string,
  readonly createdAt: Date,
  readonly updatedAt: Date
}