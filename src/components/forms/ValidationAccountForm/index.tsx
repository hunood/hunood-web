import React, { FC, useContext, useEffect, useState } from 'react';
import { Col, Form, Input, Row, Typography } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { SendCodeService } from 'services/onboarding';
import { AlterEmailModal } from 'components/modals';
import { AuthContext } from 'assets/context/AuthContext';
import { t } from 'i18n';
import './style.less'

interface ValidationAccountFormProps {
    form: FormInstance,
    email: string,
    timerResendEmail: number
}
export interface ValidationAccount {
    codigo: string;
    aceite_termos: boolean;
}

const ValidationAccountForm: FC<ValidationAccountFormProps> = ({ email, timerResendEmail }) => {
    React.useEffect(() => { return; });

    const { Text } = Typography;
    const { Search } = Input;

    const { updateAuth, auth } = useContext(AuthContext);
    const sendCodeService = new SendCodeService().useAsHook();

    const timer = 60;
    const timeout = React.useRef<NodeJS.Timeout>();
    const interval= React.useRef<NodeJS.Timeout>();

    const [counter, setCounter] = useState<number>(timerResendEmail);
    const [email_, setEmail] = useState<string>(email || auth.email);
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        if (counter === timer) {
            let seconds = timer;

            interval.current && clearInterval(interval.current);
            timeout.current && clearTimeout(timeout.current);

            interval.current = setInterval(() => {
                seconds -= 1;
                setCounter(seconds);
            }, 1000);

            timeout.current = setTimeout(() => {
                clearInterval(interval.current as NodeJS.Timeout);
            }, (timer + 1) * 1000);

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
        setCounter(timer);
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
                        rules={[
                            { required: true, message: t('messages:campo-obrigatorio') },
                            { max: 6, message: t('messages:maximo-x-caracteres', { quantidade: 6 }) }
                        ]}
                    >
                        <Search
                            maxLength={6}
                            placeholder={t('forms:validationAccount.codigo')}
                            enterButton={counter > 0 ? t('onboarding:aguarde', { segundos: ("0" + counter).slice(-2) })
                                : t('onboarding:reenviar')} style={{ height: 50 }} loading={counter > 0}
                            onSearch={resend}
                            className="btn-reenviar"
                        />
                    </Form.Item>
                </Col>
                {/* <Col xs={{ span: 24 }}>
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
                </Col> */}
            </Row>
        </>
    );
};


export { ValidationAccountForm };
