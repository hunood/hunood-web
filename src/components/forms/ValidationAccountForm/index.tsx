import React, { FC } from 'react';
import { Col, Checkbox, Form, Input, Row, Typography } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { t } from 'i18n';
import './style.less'
import { formatEmail } from 'assets/utils/format';

interface ValidationAccountFormProps {
    form: FormInstance
}
export interface ValidationAccount {
    codigo: string;
    aceite_termos: boolean;
}

const onFinish = (validationAccount: ValidationAccount[], callback?: () => void) => {
    callback && callback();
    return validationAccount;
};

const onFinishFailed = (validationAccount: ValidationAccount[], callback?: () => void) => {
    callback && callback();
    return validationAccount;
};

const ValidationAccountForm: FC<ValidationAccountFormProps> = () => {
    const { Text } = Typography;
    React.useEffect(() => { return; });

    return (
        <>
            <Row gutter={[16, 8]}>
                <Col xs={{ span: 24 }}>
                    <h3>{t('forms:validationAccount.enviado-codigo')} <Text keyboard>{formatEmail('dannyel.kayke@hotmail.com')}</Text></h3>
                    <p>{t('forms:validationAccount.por-favor-verique')}</p>
                </Col>
                <Col xs={{ span: 24 }} className="codigo">
                    <Form.Item
                        name="codigo"
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <Input placeholder={t('forms:validationAccount.codigo')} className="input-codigo" />
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }}>
                    <Form.Item
                        name="aceite_termos"
                        valuePropName="checked"
                        rules={[{
                            validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error(t('messages:campo-obrigatorio')))
                        }]}
                    >
                        <Checkbox>
                            {t('forms:validationAccount.li-e-aceito')} {t('forms:validationAccount.termos-de-uso')}
                        </Checkbox>
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};


export { ValidationAccountForm, onFinish, onFinishFailed };
