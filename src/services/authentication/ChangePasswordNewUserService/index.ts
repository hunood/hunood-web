import ApiService from 'services/_config-services/apiService';
import ChangePasswordNewUserServiceResponse from './interfaces/response';
import ChangePasswordNewUserServiceRequest from './interfaces/request';

class ChangePasswordNewUserService extends ApiService<ChangePasswordNewUserServiceResponse, ChangePasswordNewUserServiceRequest> {
  constructor() {
    super({
      config: (request: ChangePasswordNewUserServiceRequest) => ({
        url: `authentication/change-password-new-user`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default ChangePasswordNewUserService;
export type { ChangePasswordNewUserServiceResponse, ChangePasswordNewUserServiceRequest };