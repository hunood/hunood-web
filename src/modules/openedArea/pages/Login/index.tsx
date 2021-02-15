import React, { FC, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Layout, Tabs } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { SquareAnimation } from 'components/animations';
import { t } from 'i18n';
import "./style.less";


type LoginReturnType = {
    username: string,
    password: string,
    remember: boolean
}
interface ILogin {
    onFinish: (values: LoginReturnType) => void
}

const Login: FC<ILogin> = ({ onFinish }) => {
    return (
        <>
            <Form
                name="login"
                initialValues={{ remember: false }}
                onFinish={onFinish}
                spellCheck='false'
                draggable='false'
            >
                <Form.Item name="username" rules={[{ required: true, message: t('messages:campo-obrigatorio') }]} >
                    <Input
                        type="text"
                        prefix={<UserOutlined className="login-icon-input" />}
                        placeholder={t('openedArea:login.usuario-email')} />
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true, message: t('messages:campo-obrigatorio') }]} >
                    <Input.Password
                        type="password"
                        prefix={<LockOutlined className="login-icon-input" />}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        placeholder={t('openedArea:login.senha')}
                    />
                </Form.Item>

                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>{t('openedArea:login.lembrar-senha')}</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="!#">
                        {t('openedArea:login.esqueci-minha-senha')}
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" block>
                        {t('openedArea:login.entrar')}
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

type SignUpType = {
    email: string,
    password: string,
    confirm: string
}
interface ISignUp {
    onFinish: (values: SignUpType) => void
}

const SignUp: FC<ISignUp> = ({ onFinish }) => {
    return (
        <>
            <Form
                name="signup"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                spellCheck='false'
                draggable='false'
            >
                <Form.Item
                    name="email"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: t('messages:campo-obrigatorio'),
                        },
                        {
                            type: 'email',
                            message: t('messages:email-invalido')
                        }
                    ]}
                >
                    <Input prefix={<MailOutlined className="login-icon-input" />} type="email" placeholder={t('openedArea:login.email')} />
                </Form.Item>

                <Form.Item
                    name="password"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: t('messages:campo-obrigatorio'),
                        },
                        {
                            min: 8,
                            message: t('messages:minimo-x-caracteres', { quantidade: 8 }),
                        },
                        {
                            max: 15,
                            message: t('messages:maximo-x-caracteres', { quantidade: 15 }),
                        },
                        {
                            pattern: new RegExp('^(?=.*?[a-z]).{1,}$'),
                            message: t('messages:minimo-letra-minuscula')
                        },
                        {
                            pattern: new RegExp('^(?=.*?[A-Z]).{1,}$'),
                            message: t('messages:minimo-letra-maiuscula')
                        },
                        {
                            pattern: new RegExp('^(?=.*?[0-9]).{1,}$'),
                            message: t('messages:minimo-numero')
                        },
                        {
                            pattern: new RegExp('^(?=.*?[!@#$%&*+]).{1,}$'),
                            message: t('messages:minimo-caracteres-especiais')
                        }
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="login-icon-input" />}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        type="password"
                        placeholder={t('openedArea:login.senha')}
                    />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: t('messages:campo-obrigatorio'),
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(t('messages:senhas-nao-coincidem'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="login-icon-input" />}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        type="password"
                        placeholder={t('openedArea:login.senha')}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" block>
                        {t('openedArea:login.iniciar')}
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

const LoginSignUp: FC = () => {
    const { TabPane } = Tabs;

    const [redirectOnboarding, setRedirectOnboarding] = useState(false);

    const onFinishLogin = (values: LoginReturnType) => {
        console.log('Login: ', values);
        setRedirectOnboarding(true);
    };
    
    const onFinishSignUp = (values: SignUpType) => {
        console.log('SignUp: ', values);
        setRedirectOnboarding(true);
    };

    if(redirectOnboarding) {
        return <Redirect to='/onboarding'/>;
    }

    return (
        <>
            <Layout className="layout-center">
                <h1>{t('openedArea:login.hunood')}</h1>

                <Tabs defaultActiveKey="1" centered className="login-tabs-panel">
                    <TabPane tab={t('openedArea:login.entrar')} key="1">
                        <Login onFinish={onFinishLogin} />
                    </TabPane>
                    <TabPane tab={t('openedArea:login.registre-se')} key="2">
                        <SignUp onFinish={onFinishSignUp} />
                    </TabPane>
                </Tabs>
            </Layout>
            <SquareAnimation />
        </>
    );
}

export default LoginSignUp; 