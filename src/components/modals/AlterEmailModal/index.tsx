import React, { FC, useState } from 'react';
import { MailOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Button } from 'antd';
import { t } from 'i18n';
import './style.less';

import { ExistsAuthService, UpdateEmailService } from 'services/authentication';

interface AlterEmailModalProps {
    visible: boolean,
    email: string,
    onChange: (event: { visible: boolean, email?: string }) => void
}

const AlterEmailModal: FC<AlterEmailModalProps> = ({ visible, email, onChange }) => {

    React.useEffect(() => { return; });

    const existsAuthService = new ExistsAuthService().useAsHook();
    const updateEmailService = new UpdateEmailService().useAsHook();

    const [form] = Form.useForm();
    const [isVisible, setIsVisible] = useState<boolean>(visible);
    const [novoEmail, setNovoEmail] = useState<string>();

    const handleOk = (form: { username: string }) => {
        setNovoEmail(form.username);
        existsAuthService.send({ idOuEmail: form.username });
    };

    existsAuthService.onSuccess(() => {
        form.setFields([{ name: 'username', errors: [t('modals:alter-email.email-em-uso')] }]);
        onChange({ visible: true, email: undefined });
    });

    existsAuthService.onError(() => {
        if (novoEmail) {
            updateEmailService.send({ email, novoEmail })
        }
    });

    updateEmailService.onSuccess(() => {
        if (novoEmail) {
            onChange({ visible: false, email: novoEmail });
        }
    });

    const handleCancel = () => {
        setIsVisible(false);
        onChange({ visible: false, email: undefined });
    };

    return (
        <>
            <Modal
                visible={isVisible}
                onCancel={handleCancel}
                footer={[
                    <Form
                        key="alter-email"
                        name="alter-email"
                        layout="vertical"
                        onFinish={handleOk}
                        form={form}
                        autoComplete="off"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Form.Item
                            name="username"
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
                            <Input prefix={<MailOutlined className="login-icon-input" />} type="email" placeholder={t('modals:alter-email.email')} />
                        </Form.Item>
                        <Form.Item name="btn-entrar">
                            <Button type="primary" htmlType="submit" className="alter-button" block>
                                {t('modals:alter-email.alterar-email')}
                            </Button>
                        </Form.Item>
                    </Form>
                ]}
            >
                <div className="titulo-modal">
                    {t('modals:alter-email.alteracao-permanente')}
                </div>
            </Modal>
        </>
    )
};


export { AlterEmailModal };