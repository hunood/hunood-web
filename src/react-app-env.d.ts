/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production',
        BASE_URL: string,
        BACKEND_URL: string,
        GOOGLE_CLIENT_ID_OAUTH: string
    }
}