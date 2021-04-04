import React, { FC, useEffect, useState } from 'react';
import { Col, Checkbox, Form, Input, Row, Typography } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { t } from 'i18n';
import './style.less'
import { formatEmail } from 'assets/utils/format';
import { SendCodeService } from 'services/onboarding';

interface ValidationAccountFormProps {
    form: FormInstance,
    email: string
}
export interface ValidationAccount {
    codigo: string;
    aceite_termos: boolean;
}

const ValidationAccountForm: FC<ValidationAccountFormProps> = ({ form, email }) => {
    React.useEffect(() => { return; });

    const sendCodeService = new SendCodeService().useAsHook();
    const [counter, setCounter] = useState<number>(0);
    const { Text } = Typography;
    const { Search } = Input;

    useEffect(() => {
        if (counter === 10) {
            let seconds = 10;
            const timer = setInterval(() => {
                seconds -= 1;
                setCounter(seconds);
            }, 1000);

            setTimeout(() => {
                clearInterval(timer);
            }, 11 * 1000);

        }
    }, [counter]);

    const reenviar = () => {
        if (counter <= 0) {
            setCounter(10);
            sendCodeService.send({ email });
        }
    }

    return (
        <>
            <Row gutter={[16, 8]}>
                <Col xs={{ span: 24 }}>
                    <h3>{t('forms:validationAccount.enviado-codigo')} <Text keyboard>{formatEmail(email)}</Text></h3>
                    <p style={{ marginBottom: 0 }}>{t('forms:validationAccount.por-favor-verique')}</p>
                </Col>
                <Col xs={{ span: 24 }} className="codigo">
                    <Form.Item
                        name="codigo"
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <Search
                            placeholder={t('forms:validationAccount.codigo')}
                            enterButton={counter > 0 ? t('onboarding:aguarde', {segundos: ("0" + counter).slice(-2)}) 
                            : t('onboarding:reenviar')} style={{ height: 50 }} loading={counter > 0}
                            onSearch={reenviar}
                        />
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


export { ValidationAccountForm };
