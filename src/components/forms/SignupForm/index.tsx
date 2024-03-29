import React, { FC } from 'react';
import { Button, Form, Input, } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { LockOutlined, MailOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { t } from 'i18n';
import './style.less'

export interface Signup {
    newUsername: string,
    newPassword: string,
    oauth: boolean
}

interface SignupFormProps {
    form?: FormInstance
}

const SignupForm: FC<SignupFormProps> = () => {
    React.useEffect(() => { return; });

    return (
        <>
            <Form.Item
                name="newUsername"
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
                <Input
                    prefix={<MailOutlined className="login-icon-input" />}
                    type="email"
                    placeholder={t('openedArea:login.email')}
                />
            </Form.Item>

            <Form.Item
                name="newPassword"
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
                dependencies={['newPassword']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: t('messages:campo-obrigatorio'),
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
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
        </>
    )
}

export { SignupForm };
