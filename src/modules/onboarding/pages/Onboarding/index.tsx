import React, { FC, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Steps, Layout, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { t } from 'i18n';
import './style.less';

import {
    User, UserForm,
    Business, BusinessForm,
    ValidationAccount, ValidationAccountForm,
} from 'components/forms';

import { UserStepService, BusinessStepService, SendCodeService, VerificationCodeService } from 'services/onboarding';
import { AuthContext } from 'assets/context/AuthContext';

const Onboarding: FC = () => {

    const { handleLogout, auth, authenticated } = useContext(AuthContext);

    const userService = new UserStepService().useAsHook();
    const businessStepService = new BusinessStepService().useAsHook();
    const sendCodeService = new SendCodeService().useAsHook();
    const verificationCodeService = new VerificationCodeService().useAsHook();

    const { Step } = Steps;
    const { Header, Content, Footer } = Layout;
    
    const [current, setCurrent] = useState<number>(0);
    const [redirectDashboard, setRedirectDashboard] = useState<boolean>(false);
    const [form] = Form.useForm();

    const steps = [
        {
            title: t('onboarding:dados-pessoais'),
            content: <UserForm form={form} />,
            onFinish: (values: User) => userService.send(Object.assign(values))
        },
        {
            title: t('onboarding:sua-empresa'),
            content: <BusinessForm form={form} />,
            onFinish: (values: Business) => businessStepService.send(Object.assign(values))
        },
        {
            title: t('onboarding:conta-finalizacao'),
            content: <ValidationAccountForm form={form} email={auth.email} />,
            onFinish: (values: ValidationAccount) => verificationCodeService.send({ codigo: values.codigo })
        }
    ];

    const next = () => {
        if (current === 1) sendCodeService.send({ email: auth.email });
        setCurrent(current + 1);
    };

    const done = () => {
        setRedirectDashboard(true);
    }

    const onFinish = (values: any) => {
        steps[current].onFinish(values);
    }

    userService.onSuccess(next);
    businessStepService.onSuccess(next);
    verificationCodeService.onSuccess(done);

    React.useEffect(() => {
        setCurrent(auth?.etapaOnboarding || 0);
        return;
    }, [auth]);

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
                <Layout className="layout-100 box">
                    <Header className="site-layout-background header-logout">
                        <Menu theme='dark'>
                            <Menu.Item key="1" onClick={handleLogout}>
                                {t('onboarding:sair')} &nbsp;<LogoutOutlined />
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Content className="content">
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
                </Layout>
            </Form>
        </>
    );
};

export { Onboarding };