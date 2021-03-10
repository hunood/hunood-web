import { Config } from 'typing/interfaces';
import { Languages } from './typing/enums';

export const config: Config = {
    environment: 'development',
    language: Languages.PortuguesBr,
    appName: 'Hunood Web',
    baseUrl: process.env.URL_BASE as string,
    backendUrl: process.env.URL_BACKEND as string,
    timeout: 5000
};
