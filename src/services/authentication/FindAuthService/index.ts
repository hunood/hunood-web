import ApiService from 'services/_config-services/apiService';
import FindAuthResponse from './interfaces/response';
import FindAuthRequest from './interfaces/request';

class FindAuthService extends ApiService<FindAuthResponse, FindAuthRequest> {
  constructor() {
    super({
      config: (request: FindAuthRequest) => ({
        url: `authentication/find/${request.id || request.email}`,
        method: 'GET',
        data: request,
      }),
      handleLoader: false,
      handleError: true
    });
  }
}

export default FindAuthService;
export type { FindAuthResponse, FindAuthRequest };