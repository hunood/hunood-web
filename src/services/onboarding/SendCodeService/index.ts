import ApiService from 'services/_config-services/apiService';
import SendCodeResponse from './interfaces/response';
import SendCodeRequest from './interfaces/request';

class SendCodeService extends ApiService<SendCodeResponse, SendCodeRequest> {
  constructor() {
    super({
      config: (request: SendCodeRequest) => ({
        url: `onboarding/send-code`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default SendCodeService;
export type { SendCodeResponse, SendCodeRequest };