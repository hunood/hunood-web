import ApiService from 'services/_config-services/apiService';
import UpdateUserResponse from './interfaces/response';
import UpdateUserRequest from './interfaces/request';

class UpdateUserService extends ApiService<UpdateUserResponse, UpdateUserRequest> {
  constructor() {
    super({
      config: (request: UpdateUserRequest) => ({
        url: `user/create`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default UpdateUserService;
export type { UpdateUserResponse, UpdateUserRequest };