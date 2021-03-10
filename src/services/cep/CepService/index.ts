import ApiService from 'services/config-services/apiService';
import CEPResponse from './interfaces/response';
import CEPRequest from './interfaces/request';

class CEPService extends ApiService<CEPResponse, CEPRequest> {
  constructor() {
    super({
      config: (request: CEPRequest) => ({
        url: `cep/find/${request.cep}`,
        method: 'GET',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default CEPService;
export type { CEPResponse, CEPRequest };