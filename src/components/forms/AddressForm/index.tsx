import React, { FC } from 'react';
import { Col, Form, Input, InputNumber, Row, Select } from 'antd';
import MaskedInput from 'antd-mask-input';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Estados } from 'typing/enums';
import { t } from 'i18n';
import './style.less'

export interface Address {
    cep_logradouro: string;
    nome_logradouro: string;
    numero_logradouro: string;
    complemento_logradouro?: string;
    bairro_logradouro?: string;
    cidade_logradouro?: string;
    estado_logradouro?: string;
}

const onFinish = (address: Address, callback?: () => void) => {
    console.log(address);
    callback && callback();
};

const onFinishFailed = (address: Address, callback?: () => void) => {
    callback && callback();
};

const AddressForm: FC = () => {
    React.useEffect(() => { return; });

    return (
        <>
            <Row gutter={[16, 8]}>
                <Col sm={{ span: 8 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('forms:address.CEP')}
                        name="cep_logradouro"
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <MaskedInput mask="11111-111" placeholder='' />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[16, 8]}>
                <Col sm={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('forms:address.logradouro')}
                        name="nome_logradouro"
                        tooltip={{ title: t('forms:address.logradouro-descricao'), icon: <InfoCircleOutlined /> }}
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <Input />
                    </Form.Item>

                </Col>
                <Col sm={{ span: 5 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('forms:address.numero')}
                        name="numero_logradouro"
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col sm={{ span: 7 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('forms:address.complemento')}
                        name="complemento_logradouro"
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[16, 8]}>
                <Col sm={{ span: 10 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('forms:address.bairro')}
                        name="bairro_logradouro"
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col sm={{ span: 8 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('forms:address.cidade')}
                        name="cidade_logradouro"
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col sm={{ span: 6 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('forms:address.estado')}
                        name="estado_logradouro"
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <Select allowClear>
                            {Object.entries(Estados).map(([value, text]) => {
                                return <Select.Option key={value} value={value}>{text}</Select.Option>;
                            })}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};


export { AddressForm, onFinish, onFinishFailed };
