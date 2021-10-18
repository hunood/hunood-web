import ApiService from 'services/_config-services/apiService';
import FindByUserResponse from './interfaces/response';
import FindByUserRequest from './interfaces/request';

class FindByUserService extends ApiService<FindByUserResponse, FindByUserRequest> {
  constructor() {
    super({
      config: (request: FindByUserRequest) => ({
        url: `business/find-by-user`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default FindByUserService;
export type { FindByUserResponse, FindByUserRequest };