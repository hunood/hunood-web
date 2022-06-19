import ApiService from 'services/_config-services/apiService';
import GetProductResponse from './interfaces/response';
import GetProductRequest from './interfaces/request';

class GetProductService extends ApiService<GetProductResponse, GetProductRequest> {
  constructor() {
    super({
      config: (request: GetProductRequest) => ({
        url: `product/find`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default GetProductService;
export type { GetProductResponse, GetProductRequest };