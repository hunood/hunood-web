import ApiService from 'services/_config-services/apiService';
import CepResponse from './interfaces/response';
import CepRequest from './interfaces/request';

class CepService extends ApiService<CepResponse, CepRequest> {
  constructor() {
    super({
      config: (request: CepRequest) => ({
        url: `cep/find/${request.cep}`,
        method: 'GET',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default CepService;
export type { CepResponse, CepRequest };