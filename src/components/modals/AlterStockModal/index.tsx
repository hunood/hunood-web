import { FC, useState } from 'react';
import { Badge, Button, Descriptions, Divider, Drawer, Form, Space, Switch } from 'antd';
import { useWindowSize } from 'assets/hooks/useWindowResize';
import { Lote, Produto } from 'services/product/GetAllProductsService/interfaces/response';
import { formatCurrency } from 'assets/utils/format';
import { TipoProduto } from 'typing/enums';
import { t } from 'i18n';
import moment from 'moment';
import './style.less';

export type EventSave = {
    produto: Produto
};

// export type EventSave = {
//     tipoUsuario: keyof TipoUsuario,
//     usuarioAtivo: boolean
// };

interface AlterStockModalProps {
    produto: Produto,
    visible: boolean,
    onCancel: () => void,
    onSave: (event: EventSave, produto: Produto) => void,
}

const AlterStockModal: FC<AlterStockModalProps> = ({ visible, produto, onCancel, onSave }) => {

    // const { auth } = useContext(AuthContext);
    // const ehMaster = produto.nomeUsuario.toLowerCase() === "master";
    // const proprioUsuario = auth.id === produto.idAutenticacao;

    const [tipoProduto, setTipoProduto] = useState<boolean>(produto.idTipoProduto === 1);
    // const TipoUsuarioInvert = invertEnum<typeof TipoUsuario>(TipoUsuario);
    // const [tipoUsuario, setTipoUsuario] = useState<keyof TipoUsuario>(produto.tipoUsuario);

    const window = useWindowSize();

    const salvar = () => {
        onSave({ produto }, produto);
    };

    const recuperarStatusLote = (lote: Lote) => {
        const temProdutoVencido = lote.dataValidade != null && moment(lote.dataValidade).isBefore(new Date()) && lote.quantidadeProdutos > 0;

        if (temProdutoVencido) {
            return <Badge status="error" />;
        }
        return <Badge status="success" />
    }

    return (
        <>
            <Drawer
                width={window.width < 700 ? "100%" : 700}
                onClose={onCancel}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                placement={'right'}
                extra={
                    <Space>
                        <Button onClick={onCancel}>Cancelar</Button>
                        <Button onClick={salvar} type="primary">Salvar</Button>
                    </Space>
                }
            >
                <Form layout="vertical" hideRequiredMark>
                    <Descriptions bordered column={2}>
                        <Descriptions.Item label={t('Identificação')} span={2}>
                            {produto.nome}
                        </Descriptions.Item>

                        <Descriptions.Item label={t('Unidade de medida')} span={2}>
                            {produto.unidadeMedida}
                        </Descriptions.Item>

                        <Descriptions.Item label={t('Preço')} span={2}>
                            {formatCurrency(produto.precoUnidade)}
                        </Descriptions.Item>

                        <Descriptions.Item label={t('Categorização')} span={2}>
                            {produto.marca}
                        </Descriptions.Item>

                        <Descriptions.Item label={t('Código')} span={2}>
                            {produto.codigo}
                        </Descriptions.Item>

                        <Descriptions.Item label={t('Perecível')} span={2}>
                            {
                                <Switch
                                    style={{ width: "100%", height: 22 }}
                                    checkedChildren={TipoProduto.PERECIVEL}
                                    unCheckedChildren={TipoProduto.IMPERECIVEL}
                                    defaultChecked={tipoProduto}
                                    onChange={(checked: boolean) => {
                                        setTipoProduto(checked);
                                    }}
                                />
                            }
                        </Descriptions.Item>
                    </Descriptions>

                    <Divider>LOTES</Divider>
                    <div style={{ textAlign: "center", fontSize: 10, marginTop: -20, marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
                        {produto.lotes.length > 0 && (
                            <>
                                <span style={{ marginRight: 20 }}><Badge status="success" /> Produtos dentro da validade</span>
                                <span><Badge status="error" /> Possui produto com validade vencida</span>
                            </>
                        )}
                        {produto.lotes.length === 0 && <span style={{display: "inline-block", marginTop: 10}}>Este produto não possui lote.</span>}
                    </div>
                    {
                        produto.lotes.map(lote => {
                            return (
                                <>
                                    <Descriptions bordered size={"small"} column={2}>
                                        <Descriptions.Item label="Código" span={2}>
                                            {recuperarStatusLote(lote)}
                                            {lote.codigo}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Fabricação">
                                            {lote.dataFabricacao === null && "Indeterminada"}
                                            {lote.dataFabricacao !== null && moment(lote.dataFabricacao).format("DD/MM/YYYY - HH:mm:ss A")}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Validade">
                                            {lote.dataFabricacao === null && "Indeterminada"}
                                            {lote.dataFabricacao !== null && moment(lote.dataValidade).format("DD/MM/YYYY - HH:mm:ss A")}
                                        </Descriptions.Item>
                                    </Descriptions>
                                    <br />
                                </>
                            )
                        })
                    }
                </Form>
            </Drawer>
        </>
    );
};


export { AlterStockModal };
