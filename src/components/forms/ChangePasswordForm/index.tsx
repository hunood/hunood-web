import React, { FC } from 'react';
import { Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { t } from 'i18n';
import './style.less'

export interface ChangePassword {
    password: string,
    confirmPassword: string
}

interface ChangePasswordFormProps {
    form?: FormInstance
}

const ChangePasswordForm: FC<ChangePasswordFormProps> = () => {
    React.useEffect(() => { return; });

    return (
        <>
            <h3>{t('forms:changePassword.novaSenha')}</h3>
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
                    placeholder={t('forms:changePassword.senha')}
                />
            </Form.Item>

            <Form.Item
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
                    prefix={<LockOutlined className="login-icon-input" />}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    type="password"
                    placeholder={t('forms:changePassword.confirmarSenha')}
                />
            </Form.Item>
        </>
    )
}

export { ChangePasswordForm };
