import { Config } from 'typing/interfaces';
import { config as dev } from 'config.dev';
import { config as prod } from 'config.prod';

export const config: Config = process.env["NODE_ENV"] === 'production' ? prod : dev;
