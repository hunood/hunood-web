import ApiService from 'services/_config-services/apiService';
import ChangePasswordResponse from './interfaces/response';
import ChangePasswordRequest from './interfaces/request';

class ChangePasswordService extends ApiService<ChangePasswordResponse, ChangePasswordRequest> {
  constructor() {
    super({
      config: (request: ChangePasswordRequest) => ({
        url: `authentication/change-password`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default ChangePasswordService;
export type { ChangePasswordResponse, ChangePasswordRequest };