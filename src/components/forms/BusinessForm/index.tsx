import React, { FC } from 'react';
import { Form, Input } from 'antd';
import MaskedInput from 'antd-mask-input';
import { InfoCircleOutlined } from '@ant-design/icons';
import { AddressForm } from '../AddressForm';
import { t } from 'i18n';
import './style.less'

export interface Business {
    id?: string;
    cnpj: string;
    razao_social: string;
    nome_fantasia: string;
    cep_logradouro: string;
    nome_logradouro: string;
    numero_logradouro: string;
    complemento_logradouro?: string;
    bairro_logradouro?: string;
    cidade_logradouro?: string;
    estado_logradouro?: string;
}

const onFinish = (business: Business, callback?: () => void) => {
    console.log(business);
    callback && callback();
};

const onFinishFailed = (business: Business, callback?: () => void) => {
    callback && callback();
};

const BusinessForm: FC = () => {

    React.useEffect(() => { return; });

    return (
        <>
            <Form.Item
            colon
                label={t('forms:business.CNPJ')}
                name="cnpj"
                rules={[{ required: false }]}
            >
                <MaskedInput mask="11.111.111/1111-11" placeholder='' />
            </Form.Item>

            <Form.Item
                label={t('forms:business.razao-social')}
                name="razao_social"
                tooltip={{ title: t('forms:business.razao-social-descricao'), icon: <InfoCircleOutlined /> }}
                rules={[{ required: false }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={t('forms:business.nome-fantasia')}
                name="nome_fantasia"
                tooltip={{ title: t('forms:business.nome-fantasia-descricao'), icon: <InfoCircleOutlined /> }}
                rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
            >
                <Input />
            </Form.Item>

            <AddressForm />
        </>
    );
};



export { BusinessForm, onFinish, onFinishFailed };
