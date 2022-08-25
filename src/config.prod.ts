import { Config } from 'typing/interfaces';
import { Languages } from './typing/enums';

export const config: Config = {
    environment: 'production',
    language: Languages.PortuguesBr,
    appName: 'Hunood Web',
    baseUrl: process.env['BASE_URL'],
    backendUrl: process.env['BACKEND_URL'],
    timeout: 5000,
    timeoutModalGeneric: 30000,
    googleClientId: '1021946640152-9akcglmplcn5jvg7buqcv3jemtnq2vl0.apps.googleusercontent.com'
    // googleClientId: '1021946640152-bp4ev84l6k5uileonnfs0if3lgk2q19g.apps.googleusercontent.com'
};
