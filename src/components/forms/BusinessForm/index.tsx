import React, { FC } from 'react';
import { Form, Input } from 'antd';
import MaskedInput from 'antd-mask-input';
import { InfoCircleOutlined } from '@ant-design/icons';
import { AddressForm } from '../AddressForm';
import { t } from 'i18n';
import './style.less'
import { FormInstance } from 'antd/lib/form';

interface BusinessFormProps {
    form: FormInstance
}
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
    return business;
};

const onFinishFailed = (business: Business, callback?: () => void) => {
    callback && callback();
    return business;
};

const BusinessForm: FC<BusinessFormProps> = ({ form }) => {

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

            <AddressForm form={form}/>
        </>
    );
};

export { BusinessForm, onFinish, onFinishFailed };
