export default interface AuthentecateResponse {
  id: string,
  email: string,
  emailValido: boolean,
  etapaOnboarding: number,
  accessToken: string,
  refreshToken: string,
  createdAt: Date,
  updatedAt: Date
}