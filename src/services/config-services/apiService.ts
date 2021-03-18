import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { Modal } from 'antd';
import Connector from './connector';
import Loader from './loader';
import UseService from './useService';

interface IApiBehavior<Response, Request> {
    handleLoader: boolean;
    handleError: boolean;
    handleNotFoundError?: boolean;
    url?: string;
    config: (request: Request) => AxiosRequestConfig;
    transformOnSuccess?: (response: Response) => Response;
}

interface ResponseError {
    code: string,
    message: string,
    status: string,
    error: boolean
}

export default class ApiService<Response, Request = {}> {
    private _connector: Connector;
    private _loader: Loader;

    constructor(private _apiBehavior: IApiBehavior<Response, Request>) {
        this._connector = Connector.getInstance(this._apiBehavior.url);
        this._loader = Loader.getInstance();
    }

    public execute = (request: Request = {} as Request, correlationId?: string) => {
        const { handleLoader } = this._apiBehavior;
        const mountedConfig = this._mountConfig(request, correlationId);

        if (handleLoader) this._loader.show();

        return this._connector
            .execute<Response>(mountedConfig)
            .then(this._handleSuccess)
            .catch(this._handleError)
            .finally(() => {
                if (handleLoader) this._loader.hide();
            });
    };

    public useAsHook = () => {
        return UseService<Response, Request>(this);
    };

    private _mountConfig = (request: Request, correlationId?: string) => {
        const { config } = this._apiBehavior;
        const mountedConfig = config(request);

        mountedConfig.headers = {
            ...mountedConfig.headers,
        };

        if (correlationId) {
            mountedConfig.headers['X-Correlation-ID'] = correlationId;
        }

        return mountedConfig;
    };

    private _handleSuccess = (response: AxiosResponse<Response>) => {
        const { data } = response;
        if (this._apiBehavior.transformOnSuccess) {
            return Promise.resolve(this._apiBehavior.transformOnSuccess(data));
        }
        return Promise.resolve(data);
    };

    private modal(type: 'info' | 'error' | 'success' | 'warning', title: string, message: string) {
        let secondsToGo = 60;

        const modal = (Modal as any)[type]({
            title: `${title}`,
            content: message,
            okText: `OK (${secondsToGo})`
        });

        const timer = setInterval(() => {
            secondsToGo -= 1;
            if (secondsToGo > 0) modal.update({
                okText: `OK (${secondsToGo})`
            });
        }, 1000);

        setTimeout(() => {
            clearInterval(timer);
            modal.destroy();
        }, secondsToGo * 1000);
    }

    private _handleError = (error: AxiosError<ResponseError>) => {
        const { handleError, handleNotFoundError = false } = this._apiBehavior;
        const { response } = error;

        if (handleError && response) {
            const { status } = response;

            if (status >= 500) {
                this.modal('error', `Erro ${response?.data.code}`, response?.data.message);
            } else if (handleNotFoundError && status === 404) {
                // to implement
            }
        }

        return Promise.reject(response?.data);
    };
}
