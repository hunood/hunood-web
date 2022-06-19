import ApiService from 'services/_config-services/apiService';
import GetAllProductResponse from './interfaces/response';
import GetAllProductRequest from './interfaces/request';

class GetAllProductService extends ApiService<GetAllProductResponse, GetAllProductRequest> {
  constructor() {
    super({
      config: (request: GetAllProductRequest) => ({
        url: `product/findAll`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default GetAllProductService;
export type { GetAllProductResponse, GetAllProductRequest };