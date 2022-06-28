import ApiService from 'services/_config-services/apiService';
import ActionMetricsResponse from './interfaces/response';
import ActionMetricsRequest from './interfaces/request';

class ActionMetricsService extends ApiService<ActionMetricsResponse, ActionMetricsRequest> {
  constructor() {
    super({
      config: (request: ActionMetricsRequest) => ({
        url: `metrics/actions`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default ActionMetricsService;
export type { ActionMetricsResponse, ActionMetricsRequest };