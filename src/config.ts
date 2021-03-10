import { Config } from 'typing/interfaces';
import { Languages } from './typing/enums';

export const config: Config = {
    environment: 'development',
    language: Languages.PortuguesBr,
    appName: 'Hunood Web',
    baseUrl: process.env.REACT_APP_URL_BASE as string,
    backendUrl: process.env.REACT_APP_URL_BACKEND as string,
    timeout: 5000
};
