import React, { FC } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row, Select } from 'antd';
import MaskedInput from 'antd-mask-input';
import { TiposTelefone } from 'typing/enums';
import { t } from 'i18n';
import './style.less'

export interface Contact {
    tipoContato: keyof typeof TiposTelefone;
    contato: string
}

interface ContactFormProps {
    telefones: Contact[],
    semTitulo?: boolean
}

const ContactForm: FC<ContactFormProps> = ({ telefones, semTitulo = false }) => {

    React.useEffect(() => { return; });

    return (
        <>
            {!semTitulo && <h1>{t('forms:contact.contatos')}</h1>}
            { telefones.length >= 0 &&
                <Form.List name="contatos" initialValue={telefones} >
                    {(fields, { add, remove }) => (
                        <div  >

                            {fields.map((field, index) => (
                                <Row key={field.key} gutter={[16, 8]}>
                                    <Col sm={24} className="column">
                                        <label className="ant-form-item-required">{t('forms:contact.numero-de-contato', { index: ++index })}</label>
                                    </Col>
                                    <Col sm={10} xs={20}>
                                        <Form.Item shouldUpdate
                                            name={[field.name, "tipoContato"]}
                                            rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                                        >
                                            <Select placeholder={t('forms:contact.tipo-contato')} allowClear>
                                                {Object.entries(TiposTelefone).map(([value, text]) => {
                                                    return <Select.Option key={value} value={value}>{text}</Select.Option>;
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col sm={10} xs={20}>
                                        <Form.Item shouldUpdate
                                            name={[field.name, "contato"]}
                                            rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                                        >
                                            <MaskedInput mask="(00) 0000-00000"  placeholder={t('forms:contact.contato')} />
                                        </Form.Item>
                                    </Col>
                                    <Col flex="none" sm={4} xs={4}>
                                        <MinusCircleOutlined
                                            className="minus-circle"
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    </Col>
                                </Row>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => { add() }} block icon={<PlusOutlined />}>
                                    {t('forms:contact.contato')}
                                </Button>
                            </Form.Item>
                        </div>

                    )}
                </Form.List>
            }
        </>
    );
};


export { ContactForm };
