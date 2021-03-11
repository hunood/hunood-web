import { Config } from 'typing/interfaces';
import { Languages } from './typing/enums';

export const config: Config = {
    environment: 'production',
    language: Languages.PortuguesBr,
    appName: 'Hunood Web',
    baseUrl: 'https://hunood-web.herokuapp.com/',
    backendUrl: 'https://hunood-backend.herokuapp.com/',
    timeout: 5000
};
