import ApiService from 'services/_config-services/apiService';
import VerificationCodeResponse from './interfaces/response';
import VerificationCodeRequest from './interfaces/request';

class VerificationCodeService extends ApiService<VerificationCodeResponse, VerificationCodeRequest> {
  constructor() {
    super({
      config: (request: VerificationCodeRequest) => ({
        url: `onboarding/verificationCode`,
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default VerificationCodeService;
export type { VerificationCodeResponse, VerificationCodeRequest };