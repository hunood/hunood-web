import React, { FC, useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { t } from 'i18n';
import { SendCodeChangePasswordService } from 'services/authentication';

interface AlterPasswordModalProps {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const AlterPasswordModal: FC<AlterPasswordModalProps> = ({ visible, setVisible }) => {

    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [mensagens, setMensagens] = useState({ sucesso: false, erro: false });
    const sendCodeChangePasswordService = new SendCodeChangePasswordService().useAsHook();

    const handleOk = () => {
        setMensagens((msg) => {
            msg.erro = false;
            msg.sucesso = false;
            return msg;
        });
        form.validateFields().then((data) => {
            sendCodeChangePasswordService.send({ email: data.email })
            setConfirmLoading(true);
        })
    };

    sendCodeChangePasswordService.onSuccess(() => {
        setMensagens((msg) => {
            msg.sucesso = true;
            msg.erro = false;
            return msg;
        });
        setTimeout(() => {
            setVisible(false);
        }, 5000);
    })

    sendCodeChangePasswordService.onError(() => {
        setMensagens((msg) => {
            msg.sucesso = false;
            msg.erro = true;
            return msg;
        });
    })

    sendCodeChangePasswordService.onFinish(() => {
        setConfirmLoading(false);
    })

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <Modal
                title={t('modals:alter-password.titulo')}
                visible={visible}
                onOk={handleOk}
                okText={confirmLoading ? t('modals:alter-password.enviando-email-btn') : t('modals:alter-password.redefinir-email')}
                confirmLoading={confirmLoading}
                onCancel={!confirmLoading ? handleCancel : () => null}
                destroyOnClose
            >
                <Form
                    key="alter-password"
                    name="alter-password"
                    layout="vertical"
                    onFinish={handleOk}
                    form={form}
                    autoComplete="off"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
                    {!confirmLoading ? <p>{t('modals:alter-password.forneca-email')}</p> : <p>{t('modals:alter-password.enviando-email')}</p>}
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: t('messages:email-invalido')
                            },
                            {
                                required: true,
                                message: t('messages:campo-obrigatorio'),
                            }
                        ]}
                    >
                        <Input prefix={<MailOutlined className="login-icon-input" />} type="email" placeholder={t('modals:alter-password.email')} disabled={confirmLoading} />
                    </Form.Item>
                    {mensagens.sucesso && <p style={{ color: "green" }}>E-mail enviado com sucesso!</p>}
                    {mensagens.erro && <p style={{ color: "red" }}>O servidor não conseguiu enviar o e-mail.</p>}
                </Form>
            </Modal>
        </>
    );
};

export { AlterPasswordModal };
