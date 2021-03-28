import React, { FC } from 'react';
import { Form, Input } from 'antd';
import MaskedInput from 'antd-mask-input';
import { FormInstance } from 'antd/lib/form';
import { InfoCircleOutlined } from '@ant-design/icons';
import { AddressForm, Address, addressOnFinish } from 'components/forms';
import { cnpj } from 'cpf-cnpj-validator';
import { t } from 'i18n';
import './style.less'

interface BusinessFormProps {
    form: FormInstance
}
export interface Business {
    id?: string;
    cnpj?: string;
    razao_social?: string;
    nome_fantasia: string;
    address: Address[]
}

const onFinish = (business: Business, callback?: () => void) => {
    addressOnFinish(business.address)
    callback && callback();
    console.log(business);
};

const BusinessForm: FC<BusinessFormProps> = ({ form }) => {

    const onBlurCnpj = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value.length > 0 && !cnpj.isValid(event.target.value)) {
            form.setFields([{ name: 'cnpj', errors: [t('messages:cnpj-invalido')] }])
        }
    }

    React.useEffect(() => { return; });

    return (
        <>
            <Form.Item
                colon
                label={t('forms:business.CNPJ')}
                name="cnpj"
                rules={[{ required: false }]}
            >
                <MaskedInput mask="11.111.111/1111-11" placeholder='00.000.000/0000-00' onBlur={onBlurCnpj} />
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

            <AddressForm form={form} />
        </>
    );
};

export { BusinessForm, onFinish };
