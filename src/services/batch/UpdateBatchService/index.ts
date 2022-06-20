import ApiService from 'services/_config-services/apiService';
import UpdateBatchResponse from './interfaces/response';
import UpdateBatchRequest from './interfaces/request';

class UpdateBatchService extends ApiService<UpdateBatchResponse, UpdateBatchRequest> {
  constructor() {
    super({
      config: (request: UpdateBatchRequest) => ({
        url: `batch/update`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default UpdateBatchService;
export type { UpdateBatchResponse, UpdateBatchRequest };