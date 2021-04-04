export default interface SendCodeResponse {
  enviados: string[],
  rejeitados: string[],
  message?: string
}