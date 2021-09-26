import ApiService from 'services/_config-services/apiService';
import VerifyAssociationUserResponse from './interfaces/response';
import VerifyAssociationUserRequest from './interfaces/request';

class VerifyAssociationUserService extends ApiService<VerifyAssociationUserResponse, VerifyAssociationUserRequest> {
  constructor() {
    super({
      config: (request: VerifyAssociationUserRequest) => ({
        url: `user/find/verify-association`,
        method: 'POST',
        data: request,
      }),
      handleLoader: false,
      handleError: true
    });
  }
}

export default VerifyAssociationUserService;
export type { VerifyAssociationUserResponse, VerifyAssociationUserRequest };