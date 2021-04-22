import React, { FC, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Layout, Tabs } from 'antd';
import { SquareAnimation } from 'components/animations';
import { LoginForm, Login, SignupForm, Signup } from 'components/forms';
import { AuthContext } from 'assets/context/AuthContext';
import { SignupService } from 'services/authentication'
import { t } from 'i18n';
import Logo from "assets/img/logo.png";
import "./style.less";

const LoginSignUp: FC = () => {
    React.useEffect(() => { return; }, []);
    const { auth, authenticated, handleLogin } = useContext(AuthContext);

    const { TabPane } = Tabs;
    const [form] = Form.useForm();

    type TabsKey = 'login' | 'signup';
    const [tab, setTab] = useState<TabsKey>('login');

    const onFinish = async (values: Login | Signup) => {
        if (tab === 'login') {
            const login = await handleLogin(values as Login) as any;
            if (login?.message) {
                form.setFields([{ name: 'username', errors: [''] }]);
                form.setFields([{ name: 'password', errors: [t('onboarding:autenticacao-invalida')] }]);
            }
            return;
        }

        if (tab === 'signup') {
            await new SignupService().execute({
                email: values.username,
                senha: values.password
            }).then(async () => {
                (values as Login).remember = false;
                await handleLogin(values as Login);
            }).catch((error) => {
                form.setFields([{ name: 'username', errors: [error?.message] }]);
            });
        }
    };

    if (authenticated) {
        return auth.etapaOnboarding >= 3 ? <Redirect to='/dashboard' /> : <Redirect to='/onboarding' />;
    };

    return (
        <>
            <Layout className="layout-center">
                <img src={Logo} alt={t('openedArea:login.hunood')} className="logo-login"/>
                <Form
                    name="login-signup"
                    spellCheck='false'
                    draggable='false'
                    form={form}
                    onFinish={onFinish}
                    initialValues={{ remember: false }}
                >
                    <Tabs defaultActiveKey="login" centered className="login-tabs-panel"
                        onTabClick={(key) => setTab(key as TabsKey)}
                    >
                        <TabPane tab={t('openedArea:login.entrar')} key="login">
                            {tab === 'login' && <LoginForm />}
                        </TabPane>
                        <TabPane tab={t('openedArea:login.registre-se')} key="signup">
                            {tab === 'signup' && <SignupForm />}
                        </TabPane>
                    </Tabs>
                </Form>
            </Layout>
            <SquareAnimation />
        </>
    );
}

export default LoginSignUp;
