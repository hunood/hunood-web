import { Config } from 'typing/interfaces';
import { Languages } from './typing/enums';

export const config: Config = {
    environment: 'development',
    language: Languages.PortuguesBr,
    appName: 'Hunood Web',
    baseUrl: process.env.URL_BASE || 'http://localhost:3000',
    backendUrl: process.env.URL_BACKEND || 'https://hunood-backend.herokuapp.com/',
    timeout: 5000
};