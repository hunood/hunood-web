import { Config } from 'typing/interfaces';
import { Languages } from './typing/enums';

export const config: Config = {
    environment: 'production',
    language: Languages.PortuguesBr,
    appName: 'Hunood Web',
    baseUrl: process.env['BASE_URL'],
    backendUrl: process.env['BACKEND_URL'],
    timeout: 5000,
    timeoutModalGeneric: 30000
};
