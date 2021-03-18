import ApiService from 'services/_config-services/apiService';
import AuthenticateResponse from './interfaces/response';
import AuthenticateRequest from './interfaces/request';

class AuthenticateService extends ApiService<AuthenticateResponse, AuthenticateRequest> {
  constructor() {
    super({
      config: (request: AuthenticateRequest) => ({
        url: `authentication`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default AuthenticateService;
export type { AuthenticateResponse, AuthenticateRequest };