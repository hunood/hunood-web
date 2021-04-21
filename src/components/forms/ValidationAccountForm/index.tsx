import React, { FC, useContext, useEffect, useState } from 'react';
import { Col, Checkbox, Form, Input, Row, Typography } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { SendCodeService } from 'services/onboarding';
import { AlterEmailModal } from 'components/modals';
import { AuthContext } from 'assets/context/AuthContext';
import { t } from 'i18n';
import './style.less'

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

    const { Text } = Typography;
    const { Search } = Input;

    const { updateAuth } = useContext(AuthContext);
    const sendCodeService = new SendCodeService().useAsHook();

    const time = 10;
    const [counter, setCounter] = useState<number>(time);
    const [email_, setEmail] = useState<string>(email);
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        if (counter === time) {
            let seconds = time;
            const timer = setInterval(() => {
                seconds -= 1;
                setCounter(seconds);
            }, 1000);

            setTimeout(() => {
                clearInterval(timer);
            }, (time + 1 )* 1000);

        }
    }, [counter]);

    const resend = () => {
        if (counter <= 0) {
            sendCodeService.send({ email });
        }
    }

    const onChangeEmail = (event: { visible: boolean, email?: string }) => {
        setVisible(event.visible)
        if (event.email) {
            updateAuth({ email: event.email });
            setEmail(event.email)
            sendCodeService.send({ email: event.email });
        }
    };

    sendCodeService.onSuccess(() => {
        setCounter(time);
    });

    sendCodeService.onError(() => {
        setCounter(0);
    });

    const showModal = () => {
        setVisible(true);
    };

    return (
        <>
            {visible && <AlterEmailModal email={email_} onChange={onChangeEmail} visible={visible} />}
            <Row gutter={[16, 8]}>
                <Col xs={{ span: 24 }}>
                    <h3>{t('forms:validationAccount.enviado-codigo')} <Text keyboard>{email_}</Text></h3>
                    <h5 className="naoEhSeuEmail" onClick={showModal}>{t('forms:validationAccount.naoEhseuEmail')}</h5>
                </Col>
                <Col xs={{ span: 24 }}>
                    <p style={{ marginBottom: 0 }}>{t('forms:validationAccount.por-favor-verique')}</p>
                </Col>
                <Col xs={{ span: 24 }} className="codigo">
                    <Form.Item
                        name="codigo"
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <Search
                            placeholder={t('forms:validationAccount.codigo')}
                            enterButton={counter > 0 ? t('onboarding:aguarde', { segundos: ("0" + counter).slice(-2) })
                                : t('onboarding:reenviar')} style={{ height: 50 }} loading={counter > 0}
                            onSearch={resend}
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
