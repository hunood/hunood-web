import ApiService from 'services/config-services/apiService';
import SignupResponse from './interfaces/response';
import SignupRequest from './interfaces/request';

class SignupService extends ApiService<SignupResponse, SignupRequest> {
  constructor() {
    super({
      config: (request: SignupRequest) => ({
        url: `authentication/create`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default SignupService;
export type { SignupResponse, SignupRequest };