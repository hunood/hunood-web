import ApiService from 'services/_config-services/apiService';
import UpdateEmailResponse from './interfaces/response';
import UpdateEmailRequest from './interfaces/request';

class UpdateEmailService extends ApiService<UpdateEmailResponse, UpdateEmailRequest> {
  constructor() {
    super({
      config: (request: UpdateEmailRequest) => ({
        url: `authentication/update-email`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default UpdateEmailService;
export type { UpdateEmailResponse, UpdateEmailRequest };