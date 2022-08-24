import AuthenticateService, { AuthenticateResponse, AuthenticateRequest } from './AuthenticateService';
import SignupService, { SignupResponse, SignupRequest } from './SignupService';
import ForbidService, { ForbidResponse, ForbidRequest } from './ForbidService';
import ExistsAuthService, { ExistsAuthResponse, ExistsAuthRequest } from './ExistsAuthService';
import UpdateEmailService, { UpdateEmailResponse, UpdateEmailRequest } from './UpdateEmailService';
import SendCodeChangePasswordService, { SendCodeChangePasswordResponse, SendCodeChangePasswordRequest } from './SendCodeChangePasswordService';
import ChangePasswordNewUserService, { ChangePasswordNewUserServiceResponse, ChangePasswordNewUserServiceRequest } from './ChangePasswordNewUserService';
import ChangePasswordService, { ChangePasswordResponse, ChangePasswordRequest } from './ChangePasswordService';

export {
    AuthenticateService,
    SignupService,
    ForbidService,
    ExistsAuthService,
    UpdateEmailService,
    SendCodeChangePasswordService,
    ChangePasswordNewUserService,
    ChangePasswordService
};

export type {
    AuthenticateResponse, AuthenticateRequest,
    SignupResponse, SignupRequest,
    ForbidResponse, ForbidRequest,
    ExistsAuthResponse, ExistsAuthRequest,
    UpdateEmailResponse, UpdateEmailRequest,
    SendCodeChangePasswordResponse, SendCodeChangePasswordRequest,
    ChangePasswordNewUserServiceResponse, ChangePasswordNewUserServiceRequest,
    ChangePasswordResponse, ChangePasswordRequest
}