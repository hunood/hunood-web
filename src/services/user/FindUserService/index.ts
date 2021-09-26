import ApiService from 'services/_config-services/apiService';
import FindUserResponse from './interfaces/response';
import FindUserRequest from './interfaces/request';

class FindUserService extends ApiService<FindUserResponse, FindUserRequest> {
  constructor() {
    super({
      config: (request: FindUserRequest) => ({
        url: `user/find`,
        method: 'POST',
        data: request,
      }),
      handleLoader: false,
      handleError: true
    });
  }
}

export default FindUserService;
export type { FindUserResponse, FindUserRequest };