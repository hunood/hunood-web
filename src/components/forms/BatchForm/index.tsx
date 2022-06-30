import React, { FC, useContext, useState, useRef } from 'react';
import { DatePicker, Form, Input, InputNumber, Row, Col, Select, Radio, Switch, Divider, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { AuthContext } from 'assets/context/AuthContext';
import { gerarDeCodigo } from 'assets/utils/general';
import { Acao } from 'typing/enums';
import { t } from 'i18n';
import './style.less'

import { GetAllProductsService } from 'services/product';
import { Lote, Produto } from 'services/product/GetAllProductsService/interfaces/response';
import moment from 'moment';

const { Option } = Select;

interface ContentOptionCodigoProps {
    titulo: string;
    codigo: string;
}

const ContentOptionCodigo: FC<ContentOptionCodigoProps> = ({ titulo, codigo }) => {
    return (
        <React.Fragment>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <span>{titulo}</span>
                <span style={{ fontSize: "0.85em", textTransform: "capitalize" }}><code>[{codigo.trim()}]</code></span>
            </div>
        </React.Fragment>
    )
}

interface BatchFormProps {
    form: FormInstance;
    onClickAcao?: React.Dispatch<React.SetStateAction<string>>;
    ehInclusaoProduto?: boolean;
}

export interface Batch {
    identificacao: string,
    dataFabricacao?: Date | null;
    dataValidade?: Date | null;
    observacoes?: string;
    codigoLote: string;
    quantidade: number;
}

const BatchForm: FC<BatchFormProps> = ({ form, onClickAcao, ehInclusaoProduto = false }) => {

    const { auth } = useContext(AuthContext);
    const getAllProductsService = new GetAllProductsService().useAsHook();

    const [acao, setAcao] = useState<string>(Acao.ENTRADA);
    const [lotes, setLotes] = useState<Lote[]>([]);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [idProduto, setIdProduto] = useState<string>("");
    const [idLote, setIdLote] = useState<string>("");
    const [novoLote, setNovoLote] = useState<string>("");
    const [quantidade, setQuantidade] = useState<number>(0);
    const [ehLoteNovo, setEhLoteNovo] = useState<boolean>(false);
    const [dtFabIndeterminada, setDtFabIndeterminada] = useState<boolean>(false);
    const [dtValIndeterminada, setDtValIndeterminada] = useState<boolean>(false);
    const [dtFabricacao, setDtFabricacao] = useState<Date>();

    const refInputLote = useRef<any>(null);

    const optionsAcao = [
        { label: Acao.ENTRADA, value: true },
        { label: Acao.SAIDA, value: false }
    ];

    React.useEffect(() => {
        !ehInclusaoProduto && getAllProductsService.send({ idEmpresa: auth.empresas[0].id });
        return;
    }, [ehInclusaoProduto, auth.empresas]); // eslint-disable-line

    React.useEffect(() => {
        form.setFieldsValue({ dataValidade: null });
        return;
    }, [dtFabricacao]); // eslint-disable-line

    React.useEffect(() => {
        if (idProduto) {
            setLotes((lotesAnteriores) => {
                const lotes = produtos.find(p => p.id === idProduto)?.lotes;
                return lotes ? lotes : lotesAnteriores;
            });
        }
        else {
            form.setFieldsValue({ codigoLote: null })
            setLotes([]);
        }
        return;
    }, [idProduto]); // eslint-disable-line

    React.useEffect(() => {
        if (lotes.length > 0) {
            const existeLote = lotes.find(l => l.id === idLote);
            const qtd = acao === "Entrada" ? Infinity : existeLote?.quantidadeProdutos || 0.01;
            setQuantidade(qtd);
            setEhLoteNovo(!existeLote);
        }
    }, [idLote]); // eslint-disable-line

    React.useEffect(() => {
        if (onClickAcao) {
            onClickAcao(acao);
        }
        const existeLote = lotes.find(l => l.id === idLote);
        const qtd = acao === "Entrada" ? Infinity : existeLote?.quantidadeProdutos || 0.01;
        setQuantidade(qtd);
    }, [acao]); // eslint-disable-line

    getAllProductsService.onSuccess(() => {
        const produtos = getAllProductsService.response?.produtos;
        setProdutos(produtos as Produto[]);
    });

    const submit_ = React.useMemo(() => form.submit, [form]);

    form.submit = () => {
        form.validateFields().then(() => {
            const dados = form.getFieldValue(undefined as any);

            const lote = lotes.find(l => l.id === (dados.codigoLote || dados.codigoLote2)) || {} as Lote;
            const ehLoteNovo = !lote.id;

            const loteNovo = {
                id: null,
                dataFabricacao: dados.dataFabricacao || null,
                dataValidade: dados.dataValidade || null,
                observacoes: dados.observacoes,
                codigo: dados.codigoLote || dados.codigoLote2,
                quantidadeProdutos: dados.quantidade,
            };

            const retorno = ehLoteNovo ? { lote: loteNovo } : { lote: { id: lote.id } };
            form.setFieldsValue({ ...retorno, ehLoteNovo });
            submit_();
        });
    }

    const adicionarLote = () => {
        const lote = refInputLote.current.input.value;
        setLotes((lotes: Lote[]) => {
            if (lote.trim()) {
                setNovoLote("");
                refInputLote.current!.focus({ cursor: 'start' });
                return [...lotes, ({ id: null, codigo: lote } as unknown as Lote)];
            }
            return lotes;
        });
    };

    const gerarTituloOption = (lote: Lote) => {
        return lote.codigo || "Lote sem identificador";
    }

    const recuperarQuantidadeProdutos = (lote: Lote) => {
        const produtoSelecionado = produtos.find(p => p.id === idProduto);
        return lote.id === null ? "Novo" : `${lote.quantidadeProdutos} ${produtoSelecionado?.unidadeMedida}`;
    }

    return (
        <>
            <h1>{t('forms:batch.lote')}</h1>
            {!ehInclusaoProduto &&
                <>
                    <Row gutter={[16, 0]}>
                        <Col sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Form.Item
                                label={t('forms:batch.identificacao')}
                                name="identificacao"
                            >
                                <Select
                                    showSearch
                                    allowClear
                                    placeholder="Produto"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => {
                                        const produto = ((option!.children as any)?.props?.titulo)?.toLowerCase() || "";
                                        const codigo = ((option!.children as any)?.props?.codigo)?.toLowerCase() || "";
                                        return produto.includes(input.toLowerCase()) || codigo.includes(input.toLocaleLowerCase());
                                    }}
                                    onChange={(e: string) => { setIdProduto(e) }}
                                >
                                    {
                                        produtos.map((produto: Produto) => {
                                            return (
                                                <Option key={produto.id} value={produto.id} style={{ borderBottom: "1px solid #e7e7e7" }}>
                                                    <ContentOptionCodigo titulo={produto.nome} codigo={produto.codigo} />
                                                </Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Form.Item
                                label={t('product:entryExit.lote')}
                                name="codigoLote"
                                rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                                tooltip={{ title: t("product:entryExit.loteDescricao") }}
                            >
                                <Select
                                    allowClear
                                    placeholder={t('product:entryExit.selecioneLote')}
                                    disabled={!idProduto}
                                    onChange={(e: string) => { setIdLote(e) }}
                                    dropdownRender={menu => (
                                        <>
                                            {menu}
                                            <Divider style={{ margin: '8px 0' }} />
                                            <Space align="center" style={{ padding: '0 8px 4px' }}>
                                                <Input placeholder={t('product:entryExit.adicioneLote')} ref={refInputLote} value={novoLote} onChange={(e) => setNovoLote(e.target.value)} />
                                                <Typography.Link onClick={adicionarLote} style={{ whiteSpace: 'nowrap' }}>
                                                    <PlusOutlined />&nbsp;Novo
                                                </Typography.Link>
                                            </Space>
                                        </>
                                    )}
                                >
                                    {
                                        lotes.map((lote: Lote, index: number) => {
                                            return (
                                                <>
                                                    <Option key={index} value={lote.id || lote.codigo} style={{ borderBottom: "1px solid #e7e7e7" }}>
                                                        <ContentOptionCodigo
                                                            titulo={gerarTituloOption(lote)}
                                                            codigo={`${recuperarQuantidadeProdutos(lote)}`}
                                                        />
                                                    </Option>
                                                </>
                                            )

                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 0]}>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} >
                            <Form.Item
                                label={t('product:entryExit.acao')}
                                name="acao"
                                initialValue={optionsAcao[0].label}
                                tooltip={{ title: ('product:entryExit.entrada') }}
                            >
                                <Radio.Group
                                    name="acao"
                                    options={[optionsAcao[0].label, optionsAcao[1].label]}
                                    optionType="button"
                                    buttonStyle="solid"
                                    onChange={(e) => setAcao(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} >
                            <Form.Item
                                label={t('product:addProduct.quantidade')}
                                name="quantidade"
                                initialValue={0}
                                rules={[{ required: true, message: t('messages:campo-obrigatorio') }]}
                            >
                                <InputNumber min={0} max={quantidade} style={{ width: '100%' }} step={0.01} decimalSeparator={','} />
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            }

            {((ehLoteNovo && idLote && acao === Acao.ENTRADA) || ehInclusaoProduto) &&
                <>
                    {!ehInclusaoProduto && <h1>{t('forms:batch.infoAdicionaisLote')}</h1>}
                    <Row gutter={[16, 0]}>
                        {/* Data de Fabricação */}
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 5 }} xl={{ span: 4 }}>
                            <Form.Item label={t('Fab. indeterminada')} >
                                <Switch
                                    style={{ width: "100%", height: 22 }}
                                    onChange={(checked: boolean) => {
                                        setDtFabIndeterminada(checked);
                                        form.setFieldsValue({ dataFabricacao: null });
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 7 }} xl={{ span: 8 }}>
                            <Form.Item
                                label={t('forms:batch.data-fabricacao')}
                                name="dataFabricacao"
                                rules={[{ required: !dtFabIndeterminada, message: t('messages:campo-obrigatorio') }]}
                            >
                                <DatePicker
                                    allowClear
                                    style={{ width: '100%' }}
                                    showTime={{ format: 'HH:mm' }}
                                    format="DD/MM/YYYY \à\s HH:mm"
                                    placeholder={t('forms:user.dd-mm-aaaa')}
                                    showToday={true}
                                    disabled={dtFabIndeterminada}
                                    disabledDate={date => !date || date.isAfter(moment().toDate())}
                                    onChange={(date) => setDtFabricacao(moment(date).toDate())}
                                />
                            </Form.Item>
                        </Col>

                        {/* Data de Validade */}
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 5 }} xl={{ span: 4 }}>
                            <Form.Item label={t('Val. indeterminada')} >
                                <Switch
                                    style={{ width: "100%", height: 22 }}
                                    onChange={(checked: boolean) => {
                                        setDtValIndeterminada(checked);
                                        form.setFieldsValue({ dataValidade: null });
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 7 }} xl={{ span: 8 }}>
                            <Form.Item
                                label={t('forms:batch.data-validade')}
                                name="dataValidade"
                                rules={[{ required: !dtValIndeterminada, message: t('messages:campo-obrigatorio') }]}
                            >
                                <DatePicker
                                    allowClear
                                    style={{ width: '100%' }}
                                    showTime={{ format: 'HH:mm' }}
                                    format="DD/MM/YYYY \à\s HH:mm"
                                    placeholder={t('forms:user.dd-mm-aaaa')}
                                    showToday={true}
                                    disabled={dtValIndeterminada}
                                    disabledDate={date => !date || date.isBefore(dtFabricacao || moment().subtract(2, "days").toDate())}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 0]}>
                        <Col sm={{ span: 12 }} xs={{ span: 24 }}>
                            <Form.Item
                                label={t('forms:batch.observacoes')}
                                name="observacoes"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        {ehInclusaoProduto &&
                            <Col sm={{ span: 12 }} xs={{ span: 24 }}>
                                <Form.Item
                                    label={t('forms:batch.codigoLote')}
                                    name="codigoLote2"
                                    initialValue={gerarDeCodigo()}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        }
                    </Row>
                </>
            }
        </>
    );
};

export { BatchForm };
