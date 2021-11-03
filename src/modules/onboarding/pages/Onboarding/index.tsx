import React, { FC, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Steps, Layout } from 'antd';
import { SimpleHeaderLayout } from 'components/layouts';
import { User, UserForm, Business, BusinessForm, ValidationAccount, ValidationAccountForm } from 'components/forms';
import { UserStepService, BusinessStepService, SendCodeService, VerificationCodeService } from 'services/onboarding';
import { AuthContext } from 'assets/context/AuthContext';
import { EtapaOnboarding } from 'typing/enums';
import { t } from 'i18n';
import './style.less';

const { Step } = Steps;
const { Content, Footer } = Layout;

const Onboarding: FC = () => {
    const { auth, authenticated, updateAuth } = useContext(AuthContext);

    const userStepService = new UserStepService().useAsHook();
    const businessStepService = new BusinessStepService().useAsHook();
    const sendCodeService = new SendCodeService().useAsHook();
    const verificationCodeService = new VerificationCodeService().useAsHook();

    const [current, setCurrent] = useState<number>(auth.etapaOnboarding);
    const [timerResendEmail, setTimerResendEmail] = useState<number>(0);
    const [redirectDashboard, setRedirectDashboard] = useState<boolean>(false);
    const [form] = Form.useForm();

    const steps = [
        {
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
        }
    ];

    if (auth.emailValido) {
        steps.pop();
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
        setRedirectDashboard(true);
    };

    const onFinish = (values: User & Business & ValidationAccount) => {
        steps[current].onFinish(values);
    };

    // On Success
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
                nome: auth.usuario.nome
            });
        }
    }, [current, auth, form]);

    if (redirectDashboard) {
        return <Redirect to='/dashboard' />;
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
                                {steps.map(item => (
                                    <Step key={item.title} title={item.title} />
                                ))}
                            </Steps>
                            {steps[current].content}
                        </div>
                    </Content>
                    <Footer className="footer">
                        <Button type="primary" htmlType="submit" className="btn-steps">
                            {current < steps.length - 1 ? t('onboarding:proximo') : t('onboarding:finalizar')}
                        </Button>
                    </Footer>
                </SimpleHeaderLayout>
            </Form>
        </>
    );
};

export { Onboarding };