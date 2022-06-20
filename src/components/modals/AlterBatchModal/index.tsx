import { FC, useMemo, useState } from 'react';
import { Badge, Button, DatePicker, Descriptions, Drawer, Space } from 'antd';
import { useWindowSize } from 'assets/hooks/useWindowResize';
import { Lote } from 'services/product/GetAllProductsService/interfaces/response';
import { t } from 'i18n';
import moment from 'moment';
import './style.less';
import Input from 'antd/lib/input/Input';

export type EventSave = {
    lote: Lote
};

interface AlterBatchModalProps {
    lote: Lote,
    visible: boolean,
    onCancel: () => void,
    onSave: (event: EventSave, lote: Lote) => void,
}

const AlterBatchModal: FC<AlterBatchModalProps> = ({ visible, lote, onCancel, onSave }) => {


    const lote_ = useMemo(() => lote, [lote]);
    const [loteAtualizado, setLoteAtualizado] = useState(lote as Lote);

    const window = useWindowSize();

    const salvar = () => {
        console.log(loteAtualizado)
        // onSave({ produto }, produto);
    };

    const recuperarStatusLote = (lote: Lote) => {
        const temProdutoVencido = lote.dataValidade != null && moment(lote.dataValidade).isBefore(new Date()) && lote.quantidadeProdutos > 0;

        if (temProdutoVencido) {
            return <><Badge status="error" /> <span>Há produtos vencidos.</span></>;
        }
        return <><Badge status="success" /> <span>Não há produtos vencidos.</span></>;
    }

    const defensivaNulo = (nomeCampo: string) => {
        if ((loteAtualizado as any)[nomeCampo]?.trim() === "") {
            setLoteAtualizado(prod => { return { ...prod, [nomeCampo]: (lote_ as any)[nomeCampo] } });
        }
    }

    const atualizaValor = (event: any, nomeCampo: string) => {
        if (nomeCampo === "dataFabricacao" || nomeCampo === "dataValidade") {
            setLoteAtualizado((prod) => { return { ...prod, [nomeCampo]: event } });
            return;
        }
        setLoteAtualizado((prod) => { return { ...prod, [nomeCampo]: event.target.value } });
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
                <Descriptions bordered column={2}>
                    <Descriptions.Item label={t('Identificação único')} span={2}>
                        {loteAtualizado.id}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('Status')} span={2}>
                        {recuperarStatusLote(loteAtualizado)}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('Código')} span={2}>
                        <Input className="alter" value={loteAtualizado.codigo} onChange={(e) => atualizaValor(e, "codigo")} onBlur={() => defensivaNulo("codigo")} />
                    </Descriptions.Item>

                    <Descriptions.Item label={t('Data Fabricação')} span={2}>
                        <DatePicker
                            className="alter"
                            style={{ width: '100%' }}
                            showTime={{ format: 'HH:mm' }}
                            format="DD/MM/YYYY \à\s HH:mm"
                            placeholder={t('Data indeterminada')}
                            showToday={false}
                            value={loteAtualizado.dataFabricacao !== null ? moment(loteAtualizado.dataFabricacao) : null}
                            defaultValue={moment(loteAtualizado.dataFabricacao, 'YYYY-MM-DD')}
                            onChange={(e) => atualizaValor(e, "dataFabricacao")}
                        />
                    </Descriptions.Item>

                    <Descriptions.Item label={t('Data Validade')} span={2}>
                        <DatePicker
                            className="alter"
                            style={{ width: '100%' }}
                            showTime={{ format: 'HH:mm' }}
                            format="DD/MM/YYYY \à\s HH:mm"
                            placeholder={t('Data indeterminada')}
                            showToday={false}
                            value={loteAtualizado.dataValidade !== null ? moment(loteAtualizado.dataValidade) : null}
                            defaultValue={moment(loteAtualizado.dataValidade, 'YYYY-MM-DD')}
                            onChange={(e) => atualizaValor(e, "dataValidade")}
                        />
                    </Descriptions.Item>

                    <Descriptions.Item label={t('Observações')} span={2}>
                        <Input className="alter" value={loteAtualizado.observacoes} onChange={(e) => atualizaValor(e, "observacoes")} />
                    </Descriptions.Item>

                    <Descriptions.Item label={t('Quantidade de produtos')} span={2}>
                        {loteAtualizado.quantidadeProdutos}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    );
};


export { AlterBatchModal };
