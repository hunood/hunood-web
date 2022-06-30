import ApiService from 'services/_config-services/apiService';
import DeleteSupplierResponse from './interfaces/response';
import DeleteSupplierRequest from './interfaces/request';

class DeleteSupplierService extends ApiService<DeleteSupplierResponse, DeleteSupplierRequest> {
  constructor() {
    super({
      config: (request: DeleteSupplierRequest) => ({
        url: `supplier/delete`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default DeleteSupplierService;
export type { DeleteSupplierResponse, DeleteSupplierRequest };