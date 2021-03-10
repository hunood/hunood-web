import { Languages } from "./enums";

export interface Config {
    environment: 'production' | 'development',
    language: typeof Languages | string,
    appName: string,
    baseUrl: string,
    backendUrl: string,
    timeout: number
}
 