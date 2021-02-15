import { languagesTypes } from './types/languages';

interface IConfig {
    environment: 'prod' | 'dev',
    language: typeof languagesTypes | string,
    appName: string,
    baseUrl: string,
    backendUrl: string,
}

export const config: IConfig = {
    environment: 'dev',
    language: languagesTypes.portuguese_br,
    appName: 'Hunood Web',
    baseUrl: 'http://localhost:3000',
    backendUrl: 'http://localhost:3001',
};