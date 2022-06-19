import ApiService from 'services/_config-services/apiService';
import AddProductResponse from './interfaces/response';
import AddProductRequest from './interfaces/request';

class AddProductService extends ApiService<AddProductResponse, AddProductRequest> {
  constructor() {
    super({
      config: (request: AddProductRequest) => ({
        url: `product/create`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default AddProductService;
export type { AddProductResponse, AddProductRequest };