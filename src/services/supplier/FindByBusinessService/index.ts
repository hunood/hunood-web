import ApiService from 'services/_config-services/apiService';
import FindByBusinessResponse from './interfaces/response';
import FindByBusinessRequest from './interfaces/request';

class AddSupplierService extends ApiService<FindByBusinessResponse, FindByBusinessRequest> {
  constructor() {
    super({
      config: (request: FindByBusinessRequest) => ({
        url: `supplier/find-by-business`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default AddSupplierService;
export type { FindByBusinessResponse, FindByBusinessRequest };