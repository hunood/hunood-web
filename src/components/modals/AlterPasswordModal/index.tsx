import React, { FC, useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { t } from 'i18n';

interface AlterPasswordModalProps {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const AlterPasswordModal: FC<AlterPasswordModalProps> = ({ visible, setVisible }) => {

    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleOk = () => {

        form.validateFields().then(() => {
            setConfirmLoading(true);
            setTimeout(() => {
                setVisible(false);
                setConfirmLoading(false);
            }, 5000);

        })
    };

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
                        name="username"
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
                </Form>
            </Modal>
        </>
    );
};

export { AlterPasswordModal };
