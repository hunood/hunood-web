import React, { FC, useMemo, useState, useContext } from 'react';
import MaskedInput from 'antd-mask-input';
import { Form, Input, DatePicker, Select, Row, Col, Radio } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Generos, TratarComo, TipoUsuario } from 'typing/enums';
import { ContactForm, Contact } from 'components/forms';
import { cpf as validatorCPF } from 'cpf-cnpj-validator';
import { AuthContext } from 'assets/context/AuthContext';
import { t } from 'i18n';
import moment from 'moment';
import './style.less';

interface UserFormProps {
    form: FormInstance,
    ehOnboarding?: boolean,
    novoUsuario?: boolean
}

export interface User {
    cpf: string;
    nome: string;
    email?: string;
    dataNascimento: Date;
    genero: keyof typeof Generos;
    generoPersonalizado?: string;
    tratarPor: keyof typeof TratarComo;
    tipoUsuario: keyof typeof TipoUsuario;
    contatos: Contact[]
}

const UserForm: FC<UserFormProps> = ({ form, ehOnboarding = false, novoUsuario = false }) => {
    const { auth } = useContext(AuthContext);

    const [genero, setGenero] = useState<Generos>();
    const [tipoUsuario, setTipoUsuario] = useState(Object.keys(TipoUsuario)[ehOnboarding ? 0 : 1] as TipoUsuario);

    const hoje = new Date();
    const limiteIdade = new Date(`${hoje.getFullYear() - 18}/${hoje.getMonth() + 1}/${hoje.getDate() + 1}`);

    const opcoesTipoUsuario = Object.entries(TipoUsuario).map(([value, label]) => {
        if (ehOnboarding && label.toLocaleLowerCase() !== TipoUsuario.ADMINISTRADOR.toLocaleLowerCase()) {
            return { value, label, disabled: true };
        }
        return { value, label, disabled: false };
    });

    const submit_ = useMemo(() => form.submit, [form]);

    form.submit = () => {
        form.validateFields()
        if (validarInputCpf()) {
            submit_();
        }
    }

    const validarInputCpf = (cpf = form.getFieldValue('cpf') as string) => {
        if (!cpf || cpf.length < 1) {
            form.setFields([{ name: 'cpf', errors: [t('messages:campo-obrigatorio')] }]);
            return false;
        }
        else if (!validatorCPF.isValid(cpf?.replace(/[-._*]/g, "") || '')) {
            form.setFields([{ name: 'cpf', errors: [t('messages:cpf-invalido')] }]);
            return false;
        }
        form.setFields([{ name: 'cpf', errors: [] }]);
        return true;
    };

    return (
        <>
            <Row gutter={[16, 0]}>
                <Col sm={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        name="tipoUsuario"
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                        initialValue={tipoUsuario}
                    >
                        <Radio.Group
                            name="tipoUsuario"
                            defaultValue={tipoUsuario}
                            options={opcoesTipoUsuario}
                            onChange={(event) => setTipoUsuario(event.target.value as TipoUsuario)}
                            optionType="button"
                            buttonStyle="solid"
                        />
                    </Form.Item>
                </Col>

                {ehOnboarding &&
                    <Col sm={{ span: 12 }} xs={{ span: 24 }} style={{ minWidth: 238 }}>
                        <Form.Item>
                            <Input defaultValue={auth.email} id="user-form-email" disabled={true} />
                        </Form.Item>
                    </Col>
                }
            </Row>

            <h1>{t('forms:user.dados-pessoais')}</h1>
            <Row gutter={[16, 8]}>

                <Col sm={{ span: 8 }} xs={{ span: 24 }} style={{ minWidth: 238 }}>
                    <Form.Item
                        label={t('forms:user.cpf')}
                        name="cpf"
                        tooltip={{ title: t('forms:user.cpf-descricao'), icon: <InfoCircleOutlined /> }}
                    >
                        <MaskedInput
                            type="text"
                            mask="000.000.000-00"
                            placeholder="000.000.000-00"
                            onChange={() => validarInputCpf()}
                            disabled={novoUsuario}
                        />
                    </Form.Item>
                </Col>


                {!ehOnboarding && (
                    <Col sm={{ span: 8 }} xs={{ span: 24 }}>
                        <Form.Item
                            name="email"
                            label={t('forms:user.email')}
                            rules={[
                                {
                                    required: true,
                                    message: t('messages:campo-obrigatorio'),
                                },
                                {
                                    type: 'email',
                                    message: t('messages:email-invalido')
                                }
                            ]}
                        >
                            <Input type="email" placeholder={t('forms:user.exemplo-email')} disabled={novoUsuario} />
                        </Form.Item>
                    </Col>
                )}
            </Row>

            {(ehOnboarding || novoUsuario) && (
                <>
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
                                initialValue={moment(limiteIdade, 'YYYY-MM-DD')}
                                rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                            >
                                <DatePicker
                                    style={{ width: '100%' }}
                                    format="DD/MM/YYYY"
                                    placeholder={t('forms:user.dd-mm-aaaa')}
                                    showToday={false}
                                    disabledDate={d => !d || d.isAfter(limiteIdade)}
                                    defaultValue={moment(limiteIdade, 'YYYY-MM-DD')}
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
                                label={t('forms:user.genero-personalizado')}
                                name="generoPersonalizado"
                                rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                            >
                                <Input />
                            </Form.Item>

                        </>
                    )}

                    <ContactForm telefones={[]} />
                </>
            )}
        </>
    );
};

export { UserForm };
