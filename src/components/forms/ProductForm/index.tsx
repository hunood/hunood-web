import React, { FC, useState, useRef } from 'react';
import { Form, Row, Col, Select, Divider, Input, InputNumber, Typography, Space, Radio } from 'antd';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { gerarDeCodigo } from 'assets/utils/general';
import { Batch, BatchForm } from '../BatchForm';
import { t } from 'i18n';
import './style.less'

const { Option } = Select;

interface ProductFormProps {
    form: FormInstance
}

export interface Product extends Batch {
    idFornecedor: string;
    idTipoProduto: number;
    nome: string;
    unidadeMedida: string;
    precoUnidade: number;
    marca: string;
    codigo: string;
    perecivel: boolean;
}

const ProductForm: FC<ProductFormProps> = ({ form }) => {

    React.useEffect(() => { return; });

    const refInputMedida = useRef<any>(null);
    const [quantidade, setQuantidade] = useState(0);
    const [medidas, setMedidas] = useState([
        'Unidades',
        'Kilos',
        'Gramas',
        'Miligramas',
        'Litros',
        'Mililitros',
        'Metros',
        'Centímetros',
        'Milímetros'
    ]);

    const adicionarMedida = () => {
        const medida = refInputMedida.current.input.value;
        setMedidas((medidas: string[]) => {
            if (medida.trim()) {
                refInputMedida.current.state.value = "";
                refInputMedida.current!.focus({ cursor: 'start' });
                return [...medidas, medida];
            }
            return medidas;
        });
    };


    const optionsPerecivel = [
        { label: 'Sim', value: true },
        { label: 'Não', value: false }
    ];

    const optionsTipoProduto = [
        { label: 'Tangível', value: 1 },
        { label: 'Intangível', value: 2 }
    ];

    const submit_ = React.useMemo(() => form.submit, [form]);

    form.submit = () => {
        form.validateFields().then(() => {
            const dados = form.getFieldValue(undefined as any);
            let { idTipoProduto, perecivel, marca = "" } = dados;
            idTipoProduto = idTipoProduto === "Tangível" ? 1 : 2;
            perecivel = perecivel === "Sim" ? true : false;
            form.setFieldsValue({ ...dados, ...{ idTipoProduto, perecivel, marca } });
            submit_();
        });
    }

    return (
        <>
            <Row gutter={[16, 0]}>
                <Col sm={{ span: 24 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('product:addProduct.nome')}
                        name="nome"
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[16, 0]}>
                <Col sm={{ span: 8 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('product:addProduct.quantidade')}
                        name="quantidade"
                        initialValue={0}
                        rules={[{ required: true, message: t('product:addProduct.quantidade') }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} step={0.01} decimalSeparator={','} value={quantidade}
                            onChange={(e) => setQuantidade(Number(e))} />
                    </Form.Item>
                </Col>
                <Col sm={{ span: 8 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('product:addProduct.unidade-medida')}
                        name="unidadeMedida"
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <Select
                            placeholder={t('product:addProduct.unidade-medida')}
                            dropdownRender={menu => (
                                <>
                                    {menu}
                                    <Divider style={{ margin: '8px 0' }} />
                                    <Space align="center" style={{ padding: '0 8px 4px' }}>
                                        <Input placeholder={t('product:addProduct.unidade-medida-novo')} ref={refInputMedida} />
                                        <Typography.Link onClick={adicionarMedida} style={{ whiteSpace: 'nowrap' }}>
                                            <PlusOutlined /> Novo
                                        </Typography.Link>
                                    </Space>
                                </>
                            )}
                        >
                            {medidas.map((item: string, index: number) => (
                                <Option key={index} value={item}>{item}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col sm={{ span: 8 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('product:addProduct.preco-unidade')}
                        name="precoUnidade"
                        rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} step={0.01} decimalSeparator={','} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[16, 0]}>
                <Col sm={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('product:addProduct.marca')}
                        tooltip={t('product:addProduct.observacao-marca')}
                        name="marca"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col sm={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('product:addProduct.codigo')}
                        name="codigo"
                        initialValue={gerarDeCodigo()}
                        tooltip={t('product:addProduct.observacao-codigo')}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[16, 0]}>
                

                <Col sm={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('product:addProduct.perecivel')}
                        name="perecivel"
                        initialValue={optionsPerecivel[0].label}
                        tooltip={{ title: t('product:addProduct.perecivel-descricao'), icon: <InfoCircleOutlined /> }}
                    >
                        <Radio.Group
                            name="perecivel"
                            options={[optionsPerecivel[0].label, optionsPerecivel[1].label]}
                            optionType="button"
                            buttonStyle="solid"
                        />
                    </Form.Item>
                </Col>
                <Col sm={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                        label={t('product:addProduct.tangivel')}
                        name="idTipoProduto"
                        initialValue={optionsTipoProduto[0].label}
                        tooltip={{ title: t('product:addProduct.tangivel-descricao'), icon: <InfoCircleOutlined /> }}
                    >
                        <Radio.Group
                            name="idTipoProduto"
                            options={[optionsTipoProduto[0].label, optionsTipoProduto[1].label]}
                            optionType="button"
                            buttonStyle="solid"
                        />
                    </Form.Item>
                </Col>
            </Row>

            {quantidade > 0 && <BatchForm form={form} ehInclusaoProduto />}

        </>
    );
};

export { ProductForm };
