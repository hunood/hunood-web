import ApiService from 'services/_config-services/apiService';
import AddStockResponse from './interfaces/response';
import AddStockRequest from './interfaces/request';

class AddStockService extends ApiService<AddStockResponse, AddStockRequest> {
  constructor() {
    super({
      config: (request: AddStockRequest) => ({
        url: `stock/create`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default AddStockService;
export type { AddStockResponse, AddStockRequest };