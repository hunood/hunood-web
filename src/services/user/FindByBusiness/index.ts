import ApiService from 'services/_config-services/apiService';
import FindByBusinessResponse from './interfaces/response';
import FindByBusinessRequest from './interfaces/request';

class FindByBusinessService extends ApiService<FindByBusinessResponse, FindByBusinessRequest> {
  constructor() {
    super({
      config: (request: FindByBusinessRequest) => ({
        url: `user/find-by-business`,
        method: 'POST',
        data: request,
      }),
      handleLoader: false,
      handleError: true
    });
  }
}

export default FindByBusinessService;
export type { FindByBusinessResponse, FindByBusinessRequest };