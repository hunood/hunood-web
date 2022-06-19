import React, { FC } from 'react';
import { Col, Form, Input, InputNumber, Row, Select } from 'antd';
import MaskedInput from 'antd-mask-input';
import { InfoCircleOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { removeFormatting } from 'assets/utils/format';
import { Estados } from 'typing/enums';
import { t } from 'i18n';
import './style.less'

import { CepService } from 'services/cep';

interface AddressFormProps {
    form: FormInstance
}
export interface Address {
    cepLogradouro: string;
    nomeLogradouro: string;
    numeroLogradouro: string;
    complementoLogradouro?: string;
    bairroLogradouro: string;
    cidadeLogradouro: string;
    estadoLogradouro: string;
}

const AddressForm: FC<AddressFormProps> = ({ form }) => {
    const cepService = new CepService().useAsHook();

    cepService.onSuccess(() => {
        const response = cepService.response;

        if (response) {
            form.setFieldsValue({
                nomeLogradouro: response.logradouro,
                bairroLogradouro: response.bairro,
                cidadeLogradouro: response.localidade,
                estadoLogradouro: response.uf
            });
        }
    })

    cepService.onError(() => {
        form.setFieldsValue({
            nomeLogradouro: null,
            bairroLogradouro: null,
            cidadeLogradouro: null,
            estadoLogradouro: null,
        });
        
        form.setFields([{
            name: 'cepLogradouro',
            errors: [t('messages:cep-invalido')]
        }])
    })

    const findCEP = (cep: string) => {
        cep = removeFormatting(cep);

        if (cep.length === 8) {
            cepService.send({ cep });
        }
    }

    React.useEffect(() => { return; });

    return (
        <>
            <h1>{t('forms:address.endereco')}</h1>
            <Row gutter={[16, 8]}>
                <Col sm={{ span: 8 }} xs={{ span: 24 }}>

                    <Form.Item
                        label={t('forms:address.CEP')}
                        name="cepLogradouro"
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <MaskedInput mask="00000-000" placeholder='000000-000' onChange={(event) => findCEP(event.target.value)} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[16, 8]}>
                <Col sm={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('forms:address.logradouro')}
                        name="nomeLogradouro"
                        tooltip={{ title: t('forms:address.logradouro-descricao'), icon: <InfoCircleOutlined /> }}
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col sm={{ span: 5 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('forms:address.numero')}
                        name="numeroLogradouro"
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col sm={{ span: 7 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('forms:address.complemento')}
                        name="complementoLogradouro"
                        rules={[{ required: false }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[16, 8]}>
                <Col sm={{ span: 10 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('forms:address.bairro')}
                        name="bairroLogradouro"
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col sm={{ span: 8 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('forms:address.cidade')}
                        name="cidadeLogradouro"
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col sm={{ span: 6 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('forms:address.estado')}
                        name="estadoLogradouro"
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <Select id="address_estadoLogradouro" allowClear>
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


export { AddressForm };
