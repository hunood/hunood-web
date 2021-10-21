import React, { FC } from 'react';
import { Form, Input } from 'antd';
import MaskedInput from 'antd-mask-input';
import { FormInstance } from 'antd/lib/form';
import { InfoCircleOutlined } from '@ant-design/icons';
import { AddressForm, Address, ContactForm, Contact } from 'components/forms';
import { cnpj } from 'cpf-cnpj-validator';
import { t } from 'i18n';
import './style.less'

interface SupplierFormProps {
    form: FormInstance
}
export interface Supplier extends Address {
    cnpj?: string;
    razaoSocial?: string;
    nomeFantasia: string;
    observacoes: string;
    contatos: Contact[]
}

const SupplierForm: FC<SupplierFormProps> = ({ form }) => {

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
                name="razaoSocial"
                tooltip={{ title: t('forms:business.razao-social-descricao'), icon: <InfoCircleOutlined /> }}
                rules={[{ required: false }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={t('forms:business.nome-fantasia')}
                name="nomeFantasia"
                tooltip={{ title: t('forms:business.nome-fantasia-descricao'), icon: <InfoCircleOutlined /> }}
                rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={t('forms:supplier.observacoes')}
                name="observacoes"
                rules={[{ required: false }]}
            >
                <Input.TextArea />
            </Form.Item>

            <AddressForm form={form} />

            <ContactForm telefones={[]}/>
        </>
    );
};

export { SupplierForm };
