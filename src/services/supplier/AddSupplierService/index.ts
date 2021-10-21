import ApiService from 'services/_config-services/apiService';
import AddSupplierResponse from './interfaces/response';
import AddSupplierRequest from './interfaces/request';

class AddSupplierService extends ApiService<AddSupplierResponse, AddSupplierRequest> {
  constructor() {
    super({
      config: (request: AddSupplierRequest) => ({
        url: `supplier/add`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default AddSupplierService;
export type { AddSupplierResponse, AddSupplierRequest };