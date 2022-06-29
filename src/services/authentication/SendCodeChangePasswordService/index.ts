import ApiService from 'services/_config-services/apiService';
import SendCodeChangePasswordResponse from './interfaces/response';
import SendCodeChangePasswordRequest from './interfaces/request';

class SendCodeChangePasswordService extends ApiService<SendCodeChangePasswordResponse, SendCodeChangePasswordRequest> {
  constructor() {
    super({
      config: (request: SendCodeChangePasswordRequest) => ({
        url: `authentication/send-code-change-password`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default SendCodeChangePasswordService;
export type { SendCodeChangePasswordResponse, SendCodeChangePasswordRequest };