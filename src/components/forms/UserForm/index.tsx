import React, { FC, useState } from 'react';
import MaskedInput from 'antd-mask-input';
import { Form, Input, DatePicker, Select, Row, Col } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Generos, TratarComo } from 'typing/enums';
import { ContactForm, Contact, contactOnFinish } from 'components/forms';
import { cpf } from 'cpf-cnpj-validator';
import { t } from 'i18n';
import './style.less'
interface UserFormProps {
    form: FormInstance
}
export interface User {
    cpf: string;
    nome: string;
    dataNascimento: Date;
    genero: keyof typeof Generos;
    generoPersonalizado?: string;
    tratarPor: keyof typeof TratarComo;
    contatos: Contact[]
}

const onFinish = (user: User, callback?: () => void) => {
    contactOnFinish(user.contatos);
    callback && callback();
    console.log(user);
};

const UserForm: FC<UserFormProps> = ({ form }) => {
    const [genero, setGenero] = useState<Generos>();

    const hoje = new Date();
    const limiteIdade = new Date(`${hoje.getFullYear() - 18}/${hoje.getMonth() + 1}/${hoje.getDate() + 1}`);

    const onBlurCpf = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value.length > 0 && !cpf.isValid(event.target.value)) {
            form.setFields([{ name: 'cpf', errors: [t('messages:cpf-invalido')] }])
        }
    }

    React.useEffect(() => { return; });

    return (
        <>
            <h1>{t('forms:user.dados-pessoais')}</h1>
            <Row gutter={[16, 8]}>
                <Col sm={{ span: 8 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('forms:user.cpf')}
                        name="cpf"
                        tooltip={{ title: t('forms:user.cpf-descricao'), icon: <InfoCircleOutlined /> }}
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <MaskedInput mask="111.111.111-11" placeholder="000.000.000-00" onBlur={onBlurCpf} />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                label={t('forms:user.nome')}
                name="nome"
                rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
            >
                <Input />
            </Form.Item>

            <Row gutter={[16, 8]}>
                <Col sm={{ span: 8 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('forms:user.data-nascimento')}
                        name="dataNascimento"
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <DatePicker
                            style={{ width: '100%' }}
                            format="DD/MM/YYYY"
                            placeholder={'dd/mm/aaaa'}
                            showToday={false}
                            disabledDate={d => !d || d.isAfter(limiteIdade)}
                        />
                    </Form.Item>
                </Col>

                <Col sm={{ span: 8 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('forms:user.genero')}
                        name="genero"
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <Select allowClear onChange={(genero) => setGenero(genero as Generos)}>
                            {Object.entries(Generos).map(([value, text]) => {
                                return <Select.Option key={value} value={value}>{text}</Select.Option>;
                            })}
                        </Select>
                    </Form.Item>
                </Col>

                <Col sm={{ span: 8 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('forms:user.tratar-como')}
                        name="tratarPor"
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <Select allowClear>
                            {Object.entries(TratarComo).map(([value, text]) => {
                                return <Select.Option key={value} value={value}>{text}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            {genero === Generos.OUTRO.toUpperCase() && (
                <>
                    <Form.Item
                        label="Gênero personalizado"
                        name="generoPersonalizado"
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <Input />
                    </Form.Item>

                </>
            )}

            <ContactForm telefones={[]} />
        </>
    );
};

export { UserForm, onFinish };
