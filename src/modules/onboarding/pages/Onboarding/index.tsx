import React, { FC, useContext, useState } from 'react';
import { Button, Form, Layout, Steps } from 'antd';
import { AuthContext } from 'assets/context/AuthContext';
import { Business, BusinessForm, ChangePassword, ChangePasswordForm, User, UserForm, ValidationAccount, ValidationAccountForm } from 'components/forms';
import { SimpleHeaderLayout } from 'components/layouts';
import { Redirect } from 'react-router-dom';
import { BusinessStepService, SendCodeService, UserStepService, VerificationCodeService } from 'services/onboarding';
import { ChangePasswordNewUserService } from 'services/authentication';
import { EtapaOnboarding, TipoUsuario } from 'typing/enums';
import { t } from 'i18n';
import './style.less';

const { Step } = Steps;
const { Content, Footer } = Layout;

type StepsType = {
    title: string,
    content: JSX.Element,
    onFinish: (values: any) => void
}

const Onboarding: FC = () => {
    const { auth, authenticated, updateAuth } = useContext(AuthContext);

    const changePasswordNewUserServiceService = new ChangePasswordNewUserService().useAsHook();
    const userStepService = new UserStepService().useAsHook();
    const businessStepService = new BusinessStepService().useAsHook();
    const sendCodeService = new SendCodeService().useAsHook();
    const verificationCodeService = new VerificationCodeService().useAsHook();

    const [current, setCurrent] = useState<number>(auth.etapaOnboarding === 4 ? 0 : auth.etapaOnboarding);
    const [timerResendEmail, setTimerResendEmail] = useState<number>(0);
    const [redirectDashboard, setRedirectDashboard] = useState<boolean>(false);
    const [redirectStock, setRedirectStock] = useState<boolean>(false);
    const [form] = Form.useForm();

    const steps = React.useRef<StepsType[]>([]);

    if (steps.current.length === 0) {
        if (auth.etapaOnboarding === EtapaOnboarding.ALTERACAO_SENHA_NOVO_USUARIO) {
            steps.current = (
                [{
                    title: t('onboarding:alterar-senha'),
                    content: <ChangePasswordForm />,
                    onFinish: (values: ChangePassword) => changePasswordNewUserServiceService.send({ email: auth.email, senha: values.password })
                }]
            )
        }

        if (auth.emailValido && auth.etapaOnboarding < EtapaOnboarding.COMPLETO) {
            steps.current = (
                [{
                    title: t('onboarding:dados-pessoais'),
                    content: <UserForm form={form} ehOnboarding />,
                    onFinish: (values: User) => userStepService.send(Object.assign(values))
                },
                {
                    title: t('onboarding:sua-empresa'),
                    content: <BusinessForm form={form} />,
                    onFinish: (values: Business) => businessStepService.send(Object.assign(values))
                }]
            )
        }

        if (!auth.emailValido && auth.etapaOnboarding < EtapaOnboarding.COMPLETO) {
            steps.current = (
                [{
                    title: t('onboarding:dados-pessoais'),
                    content: <UserForm form={form} ehOnboarding />,
                    onFinish: (values: User) => userStepService.send(Object.assign(values))
                },
                {
                    title: t('onboarding:sua-empresa'),
                    content: <BusinessForm form={form} />,
                    onFinish: (values: Business) => businessStepService.send(Object.assign(values))
                },
                {
                    title: t('onboarding:conta-finalizacao'),
                    content: <ValidationAccountForm form={form} email={auth.email} timerResendEmail={timerResendEmail} />,
                    onFinish: (values: ValidationAccount) => verificationCodeService.send({ codigo: values.codigo })
                }]
            )
        }
    }

    const next = () => {
        if (current === EtapaOnboarding.CADASTRO_EMPRESA) {
            sendCodeService.send({ email: auth.email });
            return;
        }
        setCurrent(current + 1);
    };

    const done = () => {
        updateAuth({ emailValido: true });
        if (auth.empresas[0].tipoUsuario === String(TipoUsuario.ADMINISTRADOR)) setRedirectDashboard(true);
        else setRedirectStock(true);
    };

    const onFinish = (values: User & Business & ValidationAccount) => {
        steps.current[current].onFinish(values);
    };

    // On Success
    changePasswordNewUserServiceService.onSuccess(() => {
        updateAuth({ etapaOnboarding: EtapaOnboarding.COMPLETO });
        done();
    });

    userStepService.onSuccess(() => {
        updateAuth({
            usuario: Object(userStepService.response || {})
        });
        next();
    });

    businessStepService.onSuccess(() => {
        updateAuth({
            empresas: Array(1).fill(businessStepService.response || {})
        });
        Boolean(auth.emailValido) ? done() : next();
    });

    verificationCodeService.onSuccess(() => {
        updateAuth({
            emailValido: verificationCodeService.response?.emailConfirmado || false
        });
        done();
    });

    // On Error
    userStepService.onError(() => {
        form.setFields([{ name: 'cpf', errors: [t('messages:cpf-ja-cadastrado')] }]);
    });

    verificationCodeService.onError(() => {
        form.setFields([{ name: 'codigo', errors: [t('messages:codigo-invalido-ou-expirado')] }]);
    });

    // On Finish
    sendCodeService.onFinish(() => {
        setTimerResendEmail(60);
        setCurrent(current + 1);
    });

    React.useEffect(() => {
        updateAuth({ etapaOnboarding: current });
    }, [current, updateAuth]);

    React.useEffect(() => {
        if (auth.emailValido && current === EtapaOnboarding.CADASTRO_USUARIO) {
            form.setFieldsValue({
                nome: auth?.usuario?.nome || ''
            });
        }
    }, [current, auth, form]);

    if (redirectDashboard) {
        return <Redirect to='/dashboard' />;
    }

    if (redirectStock) {
        return <Redirect to='/stock' />;
    }

    if (!authenticated) {
        return <Redirect to='/login' />;
    }

    return (
        <>
            <Form
                name="user"
                layout="vertical"
                form={form}
                onFinish={onFinish}
                autoComplete="off"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <SimpleHeaderLayout>
                    <Content className="content-onboarding">
                        <div className="steps-content">
                            <Steps direction="horizontal" current={current} className="steps">
                                {steps.current.map(item => (
                                    <Step key={item.title} title={item.title} />
                                ))}
                            </Steps>
                            {steps.current[current].content}
                        </div>
                    </Content>
                    <Footer className="footer">
                        <Button type="primary" htmlType="submit" className="btn-steps">
                            {current < steps.current.length - 1 ? t('onboarding:proximo') : t('onboarding:finalizar')}
                        </Button>
                    </Footer>
                </SimpleHeaderLayout>
            </Form>
        </>
    );
};

export { Onboarding };
