import ApiService from 'services/_config-services/apiService';
import ExistsAuthResponse from './interfaces/response';
import ExistsAuthRequest from './interfaces/request';

class ExistsAuthService extends ApiService<ExistsAuthResponse, ExistsAuthRequest> {
  constructor() {
    super({
      config: (request: ExistsAuthRequest) => ({
        url: `authentication/exists/${request.idOuEmail}`,
        method: 'GET',
        data: request,
      }),
      handleLoader: false,
      handleError: true
    });
  }
}

export default ExistsAuthService;
export type { ExistsAuthResponse, ExistsAuthRequest };