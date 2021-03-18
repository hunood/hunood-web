import ApiService from 'services/_config-services/apiService';
import UserStepResponse from './interfaces/response';
import UserStepRequest from './interfaces/request';

class UserStepService extends ApiService<UserStepResponse, UserStepRequest> {
  constructor() {
    super({
      config: (request: UserStepRequest) => ({
        url: `onboarding/user`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default UserStepService;
export type { UserStepResponse, UserStepRequest };