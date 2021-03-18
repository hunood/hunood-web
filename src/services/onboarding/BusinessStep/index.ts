import ApiService from 'services/_config-services/apiService';
import BusinessStepResponse from './interfaces/response';
import BusinessStepRequest from './interfaces/request';

class BusinessStepService extends ApiService<BusinessStepResponse, BusinessStepRequest> {
  constructor() {
    super({
      config: (request: BusinessStepRequest) => ({
        url: `onboarding/business`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default BusinessStepService;
export type { BusinessStepResponse, BusinessStepRequest };