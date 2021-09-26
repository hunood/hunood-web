import ApiService from 'services/_config-services/apiService';
import CreateAndAssociateResponse from './interfaces/response';
import CreateAndAssociateRequest from './interfaces/request';

class CreateAndAssociateUserService extends ApiService<CreateAndAssociateResponse, CreateAndAssociateRequest> {
  constructor() {
    super({
      config: (request: CreateAndAssociateRequest) => ({
        url: `user/create-and-associate`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default CreateAndAssociateUserService;
export type { CreateAndAssociateResponse, CreateAndAssociateRequest };