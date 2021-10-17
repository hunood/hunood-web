import ApiService from 'services/_config-services/apiService';
import UpdateAssociationResponse from './interfaces/response';
import UpdateAssociationRequest from './interfaces/request';

class UpdateAssociationService extends ApiService<UpdateAssociationResponse, UpdateAssociationRequest> {
  constructor() {
    super({
      config: (request: UpdateAssociationRequest) => ({
        url: `association/update`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default UpdateAssociationService;
export type { UpdateAssociationResponse, UpdateAssociationRequest };