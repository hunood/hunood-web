import ApiService from 'services/_config-services/apiService';
import AddBatchResponse from './interfaces/response';
import AddBatchRequest from './interfaces/request';

class AddBatchService extends ApiService<AddBatchResponse, AddBatchRequest> {
  constructor() {
    super({
      config: (request: AddBatchRequest) => ({
        url: `batch/create`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default AddBatchService;
export type { AddBatchResponse, AddBatchRequest };