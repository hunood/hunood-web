import React, { FC, useContext, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { Form, Input, Modal } from 'antd';
import { LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { AuthContext } from 'assets/context/AuthContext';
import { ChangePasswordService } from 'services/authentication';
import { t } from 'i18n';
import "./style.less";

const jwt = require('jsonwebtoken');

const ChangePassword: FC = () => {

    React.useEffect(() => { return; }, []);

    const { handleLogout } = useContext(AuthContext);
    const [redirectHome, setRedirectHome] = useState(false);
    const changePasswordService = new ChangePasswordService().useAsHook();
    
    const query = useQuery();
    const token = query.get("token") || '';

    const decode = jwt.decode(token, { complete: true });
    const email = decode?.payload?.email;

    const [form] = Form.useForm();

    

    function useQuery() {
        const { search } = useLocation();
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    const onOk = () => {
        form.validateFields()
            .then((values: any) => {
                changePasswordService.send({ token, senha: values.password });
            })
            .finally(() => {
                handleLogout();
            })
    }

    const onCancel = () => setRedirectHome(true)

    changePasswordService.onFinish(() => setRedirectHome(true))

    if (!token || !email || redirectHome) {
        return <Redirect to="/" />
    }

    return (
        <>
            <Modal
                visible={true}
                title={
                    <>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column" }}>
                            <span>Digite uma nova senha para redefinição de sua conta</span>
                            <span style={{ color: "#ff5100", fontSize: "0.8em" }}>({email})</span>
                        </div>
                    </>
                }
                okText="Redefinir senha"
                closable={false}
                onOk={onOk}
                onCancel={onCancel}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{ modifier: 'public' }}
                >
                    <Form.Item
                        label="Nova senha"
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
                            allowClear
                            prefix={<LockOutlined className="login-icon-input" />}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            type="password"
                            placeholder={t('openedArea:login.senha')}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Confirmação de senha"
                        name="confirmPassword"
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
                            allowClear
                            prefix={<LockOutlined className="login-icon-input" />}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            type="password"
                            placeholder={t('openedArea:login.senha')}
                        />
                    </Form.Item>


                </Form>
            </Modal>

        </>
    );
}

export default ChangePassword;
