import { Config } from 'typing/interfaces';
import { Languages } from './typing/enums';

export const config: Config = {
    environment: 'development',
    language: Languages.PortuguesBr,
    appName: 'Hunood Web',
    baseUrl: 'http://localhost:3000/',
    backendUrl: 'http://localhost:3001/',
    timeout: 5000,
    timeoutModalGeneric: 60000,
    googleClientId: '1021946640152-bp4ev84l6k5uileonnfs0if3lgk2q19g.apps.googleusercontent.com'
};
