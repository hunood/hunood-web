import React, { FC } from 'react';
import { Button, Checkbox, Form, Input, Layout, Tabs } from 'antd';
import { LockOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { SquareAnimation } from 'components/animations';
import { t } from 'i18n';
import "./style.less";

const Login: FC = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <>
            <Form
                name="login"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="!#">
                        Forgot password
                    </a>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" block>
                        Log in
                            </Button>
                </Form.Item>
            </Form>
        </>
    )
}

const SignUp: FC = () => {
    return (
        <>
            <p>SignUp</p>
        </>
    )
}

const LoginSignUp: FC = () => {
    const { TabPane } = Tabs;

    return (
        <>
            <Layout className="layout-center">
                <h1>{t('areaAberta:hunood')}</h1>

                <Tabs defaultActiveKey="1" centered className="login-tabs-panel">
                    <TabPane tab="Entrar" key="1">
                        <Login />
                    </TabPane>
                    <TabPane tab="Inscrever-se" key="2">
                        <SignUp />
                    </TabPane>
                </Tabs>
            </Layout>
            <SquareAnimation />
        </>
    );
}

export default LoginSignUp; 