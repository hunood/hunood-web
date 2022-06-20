import React, { FC, useState, useEffect, useMemo } from 'react';
import { Badge, Button, Descriptions, Divider, Drawer, Form, Space, Switch, Input } from 'antd';
import { useWindowSize } from 'assets/hooks/useWindowResize';
import { Lote, Produto } from 'services/product/GetAllProductsService/interfaces/response';
import { AlterBatchModal } from '../AlterBatchModal';
import { TipoProduto } from 'typing/enums';
import { t } from 'i18n';
import moment from 'moment';
import './style.less';
interface AlterStockModalProps {
    produto: Produto,
    visible: boolean,
    onCancel: () => void,
    onSaveProduct: (produto: Produto) => void,
    onSaveBatch: (lote: Lote) => void,
}

const AlterStockModal: FC<AlterStockModalProps> = ({ visible, produto, onCancel, onSaveProduct, onSaveBatch }) => {

    const [tipoProduto, setTipoProduto] = useState<boolean>(produto.idTipoProduto === 1);
    const [visibleLote, setVisibleLote] = useState<boolean>(false);
    const [lote, setLote] = useState({} as Lote);
    const [lotes, setLotes] = useState(produto.lotes as Lote[]);

    produto.precoUnidade = Number(produto.precoUnidade).toFixed(2) as any
    const [produtoAtualizado, setProdutoAtualizado] = useState(produto as Produto);

    const produto_ = useMemo(() => produto, [produto]);
    const window = useWindowSize();

    useEffect(() => {
        setProdutoAtualizado((prod) => { return { ...prod, idTipoProduto: (tipoProduto ? 1 : 2) } });
    }, [tipoProduto]);

    const salvarProduto = () => {
        onSaveProduct(produtoAtualizado);
    };

    const salvarLote = (lote: Lote) => {
        onSaveBatch(lote);
        setVisibleLote(false);
        setLotes((lotes_) => {
            const lotesMapeados = lotes_.map((lt) => {
                if(lt.id === lote.id) lt = lote
                return lt;
            });
            return lotesMapeados;
        })
    };

    const recuperarStatusLote = (lote: Lote) => {
        const temProdutoVencido = lote.dataValidade != null && moment(lote.dataValidade).isBefore(new Date()) && lote.quantidadeProdutos > 0;

        if (temProdutoVencido) {
            return <span title="Há produtos vencidos"><Badge status="error" /></span>;
        }
        return <span title="Produtos dentro da validade"><Badge status="success" /></span>
    }

    const detalharLote = (lote: Lote) => {
        setLote(lote);
        setVisibleLote(true);
    }

    const defensivaNulo = (nomeCampo: string) => {
        if ((produtoAtualizado as any)[nomeCampo].trim() === "") {
            setProdutoAtualizado(prod => { return { ...prod, [nomeCampo]: (produto_ as any)[nomeCampo] } });
        }
    }

    const atualizaValor = (event: any, nomeCampo: string) => {
        setProdutoAtualizado((prod) => { return { ...prod, [nomeCampo]: event.target.value } });
    }

    return (
        <>
            <Form layout="vertical" hideRequiredMark>
                <Drawer
                    width={window.width < 700 ? "100%" : 700}
                    onClose={onCancel}
                    visible={visible}
                    bodyStyle={{ paddingBottom: 80 }}
                    placement={'right'}
                    extra={
                        <Space>
                            <Button onClick={onCancel}>Cancelar</Button>
                            <Button onClick={salvarProduto} type="primary">Salvar</Button>
                        </Space>
                    }
                >

                    <Descriptions bordered column={2}>
                        <Descriptions.Item label={t('Identificação')} span={2}>
                            <Input className="alter" value={produtoAtualizado.nome} onChange={(e) => atualizaValor(e, "nome")} onBlur={() => defensivaNulo("nome")} />
                        </Descriptions.Item>

                        <Descriptions.Item label={t('Unidade de medida')} span={2}>
                            <Input className="alter" value={produtoAtualizado.unidadeMedida} onChange={(e) => atualizaValor(e, "unidadeMedida")} onBlur={() => defensivaNulo("unidadeMedida")} />
                        </Descriptions.Item>

                        <Descriptions.Item label={t('Preço')} span={2}>
                            <Input className="alter"
                                type="number"
                                prefix={"R$"}
                                step={"0.01"}
                                value={produtoAtualizado.precoUnidade}
                                onChange={(e) => setProdutoAtualizado((l) => {
                                    return { ...l, precoUnidade: Number(e.target.value.toString()) }
                                })}

                                onBlur={() => setProdutoAtualizado((l) => {
                                    return { ...l, precoUnidade: Number(produtoAtualizado.precoUnidade).toFixed(2) } as any
                                })}
                            />
                        </Descriptions.Item>

                        <Descriptions.Item label={t('Categorização')} span={2}>
                            <Input className="alter" value={produtoAtualizado.marca} onChange={(e) => atualizaValor(e, "marca")} onBlur={() => defensivaNulo("marca")} />
                        </Descriptions.Item>

                        <Descriptions.Item label={t('Código')} span={2}>
                            <Input className="alter" value={produtoAtualizado.codigo} onChange={(e) => atualizaValor(e, "codigo")} onBlur={() => defensivaNulo("codigo")} />
                        </Descriptions.Item>

                        <Descriptions.Item label={t('Perecível')} span={2}>
                            {
                                <Switch
                                    style={{ width: "100%", height: 22 }}
                                    checkedChildren={TipoProduto.PERECIVEL}
                                    unCheckedChildren={TipoProduto.IMPERECIVEL}
                                    defaultChecked={tipoProduto}
                                    onChange={(checked: boolean) => { setTipoProduto(checked); }}
                                />
                            }
                        </Descriptions.Item>
                    </Descriptions>

                    <Divider>LOTES</Divider>
                    <div style={{ textAlign: "center", fontSize: 10, marginTop: -20, marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
                        {lotes.length > 0 && (
                            <>
                                <span style={{ marginRight: 20 }}><Badge status="success" /> Produtos dentro da validade</span>
                                <span><Badge status="error" /> Possui produto com validade vencida</span>
                            </>
                        )}
                        {lotes.length === 0 && <span style={{ display: "inline-block", marginTop: 10 }}>Este produto não possui lote.</span>}
                    </div>
                    {
                        lotes.map((lote, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <Descriptions bordered size={"small"} column={2}>
                                        <Descriptions.Item label="Código" span={2}>
                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                                <span>{recuperarStatusLote(lote)}{lote.codigo}</span>
                                                <a href="Detalhar" onClick={(event) => { event.preventDefault(); detalharLote(lote) }}>
                                                    {t("users:adminUser.detalhar")}
                                                </a>
                                            </div>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Fabricação">
                                            {lote.dataFabricacao === null && "Indeterminada"}
                                            {lote.dataFabricacao !== null && moment(lote.dataFabricacao).format("DD/MM/YYYY - HH:mm:ss A")}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Validade">
                                            {lote.dataValidade === null && "Indeterminada"}
                                            {lote.dataValidade !== null && moment(lote.dataValidade).format("DD/MM/YYYY - HH:mm:ss A")}
                                        </Descriptions.Item>
                                    </Descriptions>
                                    <br />
                                </React.Fragment>
                            )
                        })
                    }

                </Drawer>
                {visibleLote && <AlterBatchModal
                    lote={lote}
                    visible={visibleLote}
                    onCancel={() => { setVisibleLote(false); setLote({} as Lote) }}
                    onSave={salvarLote} />}
            </Form>
        </>
    );
};


export { AlterStockModal };
