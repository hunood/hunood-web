import Axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import { config } from 'config';
import { refreshToken } from './refresh';

export default class Connector {
  private static _instance?: Connector;
  private _axios: AxiosInstance;

  private constructor() {
    this._axios = Connector.createAxios();
    this._axios.defaults.headers['Accept'] = 'application/json, text/plain, */*';

    const allResponse = async (response: AxiosResponse) => {
      const accessToken = response.headers['authorization'];
      const refreshToken = response.headers['refresh-authorization'];

      if (response.config.url === 'authentication') {
        response.data = Object.assign(response.data, { accessToken, refreshToken });
      }

      return response;
    };

    const errorResponse = async (error: any) => {
      const originalRequest = error?.config;

      if (error?.response?.status === 401 || error?.response?.status === 418) {
        const refresh = await refreshToken(error);

        delete this._axios.defaults.headers['Authorization'];
        delete this._axios.defaults.headers['Refresh-Authorization'];

        this._axios.defaults.headers['Authorization'] = refresh.accessToken;
        this._axios.defaults.headers['Refresh-Authorization'] = refresh.refreshToken;

        originalRequest.headers['Authorization'] = refresh.accessToken;
        originalRequest.headers['Refresh-Authorization'] = refresh.refreshToken;

        return this._axios(originalRequest);
      }
      return Promise.reject(error);
    };

    const allRequest = (requestConfig: AxiosRequestConfig) => {
      requestConfig.headers.common['Authorization'] = localStorage.getItem('@Auth:token') || '';
      requestConfig.headers.common['Refresh-Authorization'] = localStorage.getItem('@Auth:refresh') || '';
      return requestConfig;
    }

    this._axios.interceptors.response.use(allResponse, errorResponse);
    this._axios.interceptors.request.use(allRequest);
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

  public static getInstance(): Connector {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  public static clearInstance(): void {
    delete this._instance;
  }
}
