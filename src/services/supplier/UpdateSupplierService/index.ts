import ApiService from 'services/_config-services/apiService';
import UpdateSupplierResponse from './interfaces/response';
import UpdateSupplierRequest from './interfaces/request';

class UpdateSupplierService extends ApiService<UpdateSupplierResponse, UpdateSupplierRequest> {
  constructor() {
    super({
      config: (request: UpdateSupplierRequest) => ({
        url: `supplier/update`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default UpdateSupplierService;
export type { UpdateSupplierResponse, UpdateSupplierRequest };