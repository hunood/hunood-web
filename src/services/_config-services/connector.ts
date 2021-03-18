import Axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import { config } from 'config';

export default class Connector {
  private static _instance?: Connector;
  private _axios: AxiosInstance;

  private constructor() {
    this._axios = Connector.createAxios();
    this._axios.interceptors.request.use(async (config: AxiosRequestConfig) => {
      const token = localStorage.getItem('@Auth:token');

      if (token) {
        config.headers.Authorization = token;
      }

      return config;
    });
  }

  get axios() {
    return this._axios;
  }

  private static createAxios() {
    const axios = Axios.create({
      baseURL: config.backendUrl,
      timeout: config.timeout
    });

    return axios;
  }

  public execute<Response>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<Response>> {
    return this._axios.request<Response>(config);
  }

  public static getInstance(url?: string): Connector {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  public static clearInstance(): void {
    delete this._instance;
  }
}
