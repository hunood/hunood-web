import React, { FC, useState } from 'react';
import MaskedInput from 'antd-mask-input';
import { Form, Input, DatePicker, Select, Row, Col } from 'antd';
import { Generos, TratarComo } from 'typing/enums';
import { ContactForm, Contact, contactOnFinish, contactOnFinishFailed } from 'components/forms';
import { t } from 'i18n';
import './style.less'

export interface User extends Contact {
    id?: string;
    cpf: string;
    nome: string;
    data_nascimento: string;
    genero: keyof typeof Generos;
    genero_personalizado?: string;
    tratar_por: keyof typeof TratarComo;
    contact: Contact[]
}

const onFinish = (user: User, callback?: () => void) => {
    contactOnFinish(user.contact);
    user.cpf = user.cpf.replaceAll('_', '').replaceAll('-', '').replaceAll('.', '');
    localStorage.setItem('onboarding-user', JSON.stringify(user));
    console.log(user);
    callback && callback();
};

const onFinishFailed = (user: User, callback?: () => void) => {
    contactOnFinishFailed(user.contact);
    callback && callback();
}

const UserForm: FC = () => {
    const storage = JSON.parse(localStorage.getItem('onboarding-user') || '{}');
    const [genero, setGenero] = useState(storage.genero as Generos);

    React.useEffect(() => { return; });

    return (
        <>
            <h1>{t('forms:dados-pessoais')}</h1>
            <Row gutter={[16, 8]}>
                <Col sm={{ span: 8 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('forms:user.CPF')}
                        name="cpf"
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <MaskedInput mask="111.111.111-11" placeholder="" />
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
                        name="data_nascimento"
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
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
                        name="tratar_como"
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
                        name="genero_personalizado"
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

export { UserForm, onFinish, onFinishFailed };
