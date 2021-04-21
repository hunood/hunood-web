import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { Modal } from 'assets/utils/modal';
import Connector from './connector';
import Loader from './loader';
import UseService from './useService';
import { t } from 'i18n';

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
        this._connector = Connector.getInstance();
        this._loader = Loader.getInstance();
    }

    public execute = (request: Request = {} as Request) => {
        const { handleLoader } = this._apiBehavior;
        const mountedConfig = this._mountConfig(request);

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

    private _mountConfig = (request: Request) => {
        const { config } = this._apiBehavior;
        const mountedConfig = config(request);

        mountedConfig.headers = {
            ...mountedConfig.headers,
        };

        return mountedConfig;
    };

    private _handleSuccess = (response: AxiosResponse<Response>) => {
        const { data } = response;
        if (this._apiBehavior.transformOnSuccess) {
            return Promise.resolve(this._apiBehavior.transformOnSuccess(data));
        }
        return Promise.resolve(data);
    };

    private _handleError = (error: AxiosError<ResponseError>) => {
        const { handleError, handleNotFoundError = false } = this._apiBehavior;
        const { response } = error;

        if (handleError && response) {
            const { status } = response;

            if (status >= 500) {
                Modal.openTimerModal('error', t('messages:occoreu-um-erro'), response?.data.message);
            } else if (handleNotFoundError && status === 404) {
                // to implement
            }
        }

        return Promise.reject(response?.data);
    };
}
