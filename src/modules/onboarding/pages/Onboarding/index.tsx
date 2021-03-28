import React, { FC, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Steps, Layout, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { t } from 'i18n';
import './style.less';

import {
    User, UserForm, userOnFinish,
    BusinessForm, businessOnFinish,
    ValidationAccountForm,
} from 'components/forms';

import { UserStepService,
    //  BusinessStepService 
    } from 'services/onboarding';
import { AuthContext } from 'assets/context/AuthContext';


const Onboarding: FC = () => {
    React.useEffect(() => { return; }, []);

    const { handleLogout, authenticated } =  useContext(AuthContext);
    const userService = new UserStepService().useAsHook();

    const { Step } = Steps;

    const { Header, Content, Footer } = Layout;
    const [current, setCurrent] = useState(0);
    const [redirectLogin, setRedirectLogin] = useState(false);
    const [form] = Form.useForm();

    const steps = [
        {
            title: t('onboarding:sua-empresa'),
            content: <BusinessForm form={form} />,
            onFinish: businessOnFinish
        },
        {
            title: t('onboarding:dados-pessoais'),
            content: <UserForm form={form} />,
            onFinish: (values: User) => userService.send(Object.assign(values))
        },
        {
            title: t('onboarding:conta-finalizacao'),
            content: <ValidationAccountForm form={form} />,
            onFinish: userOnFinish
        }
    ];

    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
    };

    const logout = () => {
        handleLogout().then((logout) => {
            console.log('>> ', authenticated);
            setRedirectLogin(true);
        });
    }


    const next = () => {
        setCurrent(current + 1);
    };

    const done = () => {
        // message.success('Processing complete!');
    }

    const onFinish = (values: any) => {
        if (current === steps.length - 1) {
            steps[current].onFinish(values, done);
            return;
        }

        steps[current].onFinish(values, next);
    }

    if (redirectLogin) {
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
                {...layout}
            >
                <Layout className="layout-100 box">
                    <Header className="site-layout-background header-logout">
                        <Menu theme='dark'>
                            <Menu.Item key="1" onClick={logout}>
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