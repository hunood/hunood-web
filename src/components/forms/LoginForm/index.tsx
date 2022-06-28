import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { AlterPasswordModal } from 'components/modals/AlterPasswordModal';
import { t } from 'i18n';
import React, { FC, useState } from 'react';
import './style.less';

export interface Login {
    username: string,
    password: string,
    remember: boolean,
    oauth: boolean
}

interface LoginFormProps {
    form?: FormInstance
}

const LoginForm: FC<LoginFormProps> = () => {
    React.useEffect(() => { return; });

    const [abrirModalRedefinicao, setAbrirModalRedefinicao] = useState(false);

    const esqueciMinhaSenha = (event: any) => {
        event?.preventDefault();
        setAbrirModalRedefinicao(true);
    }

    return (
        <>
            <span>
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

                    <a className="login-form-forgot" href="!#" onClick={esqueciMinhaSenha}>
                        {t('openedArea:login.esqueci-minha-senha')}
                    </a>
                </Form.Item>

                <Form.Item name="btn-entrar">
                    <Button type="primary" htmlType="submit" className="login-form-button" block>
                        {t('openedArea:login.entrar')}
                    </Button>
                </Form.Item>
            </span>

            <AlterPasswordModal visible={abrirModalRedefinicao} setVisible={setAbrirModalRedefinicao} />
        </>
    )
}

export { LoginForm };

