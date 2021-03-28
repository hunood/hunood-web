import { UserForm, User, onFinish as userOnFinish } from './UserForm';
import { BusinessForm, Business, onFinish as businessOnFinish } from './BusinessForm';
import { AddressForm, Address, onFinish as addressOnFinish } from './AddressForm';
import { ContactForm, Contact, onFinish as contactOnFinish } from './ContactForm';
import { ValidationAccountForm, ValidationAccount, onFinish as validationAccountOnFinish } from './ValidationAccountForm';
import { LoginForm, Login, onFinish as loginOnFinish } from './LoginForm';
import { SignupForm, Signup, onFinish as signupOnFinish } from './SignupForm';

export {
    UserForm, userOnFinish,
    BusinessForm, businessOnFinish,
    AddressForm, addressOnFinish,
    ContactForm, contactOnFinish,
    ValidationAccountForm, validationAccountOnFinish,
    LoginForm, loginOnFinish,
    SignupForm, signupOnFinish
}

export type {
    User,
    Business,
    Address,
    Contact,
    ValidationAccount,
    Login,
    Signup
}