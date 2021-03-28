import ApiService from 'services/_config-services/apiService';
import ForbidResponse from './interfaces/response';
import ForbidRequest from './interfaces/request';

class ForbidService extends ApiService<ForbidResponse, ForbidRequest> {
  constructor() {
    super({
      config: (request: ForbidRequest) => ({
        url: `authentication/forbid`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default ForbidService;
export type { ForbidResponse, ForbidRequest };