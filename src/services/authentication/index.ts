import AuthenticateService, { AuthenticateResponse, AuthenticateRequest } from './AuthenticateService';
import SignupService, { SignupResponse, SignupRequest } from './SignupService';
import ForbidService, { ForbidResponse, ForbidRequest } from './ForbidService';
import ExistsAuthService, { ExistsAuthResponse, ExistsAuthRequest } from './ExistsAuthService';
import UpdateEmailService, { UpdateEmailResponse, UpdateEmailRequest } from './UpdateEmailService';
import SendCodeChangePasswordService, { SendCodeChangePasswordResponse, SendCodeChangePasswordRequest } from './SendCodeChangePasswordService';

export {
    AuthenticateService,
    SignupService,
    ForbidService,
    ExistsAuthService,
    UpdateEmailService,
    SendCodeChangePasswordService
};

export type {
    AuthenticateResponse, AuthenticateRequest,
    SignupResponse, SignupRequest,
    ForbidResponse, ForbidRequest,
    ExistsAuthResponse, ExistsAuthRequest,
    UpdateEmailResponse, UpdateEmailRequest,
    SendCodeChangePasswordResponse, SendCodeChangePasswordRequest
}