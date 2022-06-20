import ApiService from 'services/_config-services/apiService';
import UpdateProductResponse from './interfaces/response';
import UpdateProductRequest from './interfaces/request';

class UpdateProductService extends ApiService<UpdateProductResponse, UpdateProductRequest> {
  constructor() {
    super({
      config: (request: UpdateProductRequest) => ({
        url: `product/update`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default UpdateProductService;
export type { UpdateProductResponse, UpdateProductRequest };