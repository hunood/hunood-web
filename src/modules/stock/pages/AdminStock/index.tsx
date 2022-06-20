import React, { FC, useState, useContext } from 'react';
import { Table, Input, Badge } from 'antd';
import { AuthContext } from 'assets/context/AuthContext';
import { AlterStockModal } from 'components/modals';
import { GetAllProductsService, UpdateProductService } from 'services/product';
import { UpdateBatchService } from 'services/batch';
import { Lote, Produto } from 'services/product/GetAllProductsService/interfaces/response';
import { formatCurrency } from 'assets/utils/format';
import { t } from 'i18n';
import moment from 'moment';
import "./style.less";

const AdminStock: FC = () => {

    const { auth } = useContext(AuthContext);

    const [empresas, setProdutos] = useState<Produto[]>([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState({} as Produto);
    const [visible, setVisible] = useState<boolean>(false);
    const [filtro, setFiltro] = useState<string>('');

    const getAllProductsService = new GetAllProductsService().useAsHook();
    const updateProductService = new UpdateProductService().useAsHook();
    const updateBatchService = new UpdateBatchService().useAsHook();

    React.useEffect(() => {
        getAllProductsService.send({ idEmpresa: auth.empresas[0].id });  // eslint-disable-next-line
    }, [visible]);

    getAllProductsService.onSuccess(() => {
        const produtos = getAllProductsService.response?.produtos || [];

        const compareLote = (a: Lote, b: Lote) => {
            if (a.id < b.id)
                return -1;
            if (a.id > b.id)
                return 1;
            return 0;
        }
        const compareProduto = (a: Produto, b: Produto) => {
            if (a.nome < b.nome)
                return -1;
            if (a.nome > b.nome)
                return 1;
            return 0;
        }

        produtos.sort(compareProduto);

        produtos.forEach((prod) => {
            prod.lotes.sort(compareLote)
        });

        setProdutos(produtos);
    });

    const detalharProduto = (produto: Produto) => {
        setProdutoSelecionado(produto);
        setVisible(true);
    }

    const salvarProduto = (produto: Produto) => {
        updateProductService.send(produto);
        setVisible(false)
    }

    const salvarLote = (lote: Lote) => {
        

        updateBatchService.send(lote);
    }

    const recuperarStatus = (produto: Produto) => {
        const temProdutoVencido = produto.lotes.some(p => {
            return p.dataValidade != null && moment(p.dataValidade).isBefore(new Date()) && p.quantidadeProdutos > 0
        });

        if (temProdutoVencido) {
            return <span title="Há produtos vencidos"><Badge status="error" /></span>;
        }
        return<span title="Produtos dentro da validade"><Badge status="success" /></span>
    }

    const dadosTabela = (filtro: string) => {

        return empresas?.map((produto: Produto, key: number) => {
            return {
                key,
                id: produto.id,
                status: recuperarStatus(produto),
                nome: produto.nome,
                perecivel: produto.idTipoProduto === 1 ? "Sim" : "Não",
                precoUnidade: formatCurrency(produto.precoUnidade),
                medida: produto.unidadeMedida,
                quantidade: produto.quantidade,
                codigo: produto.codigo,
                lotes: produto.lotes,
                acao: <a href="Detalhar" onClick={(event) => {
                    event.preventDefault();
                    detalharProduto(produto)
                }}>{t("users:adminUser.detalhar")}</a>
            }
        }).filter((produto) => produto.nome.toLocaleLowerCase().includes(filtro.toLocaleLowerCase().trim() || '')
            || produto.codigo.toLocaleLowerCase().includes(filtro.toLocaleLowerCase().trim() || '')
        );
    }

    const columns = [
        { title: t(""), dataIndex: 'status', key: 'status' },
        { title: t("Identificação"), dataIndex: 'nome', key: 'nome' },
        { title: t("Preço unitário"), dataIndex: 'precoUnidade', key: 'precoUnidade' },
        { title: t("Unidade de medida"), dataIndex: 'medida', key: 'medida' },
        { title: t("Qtd. disponível"), dataIndex: 'quantidade', key: 'quantidade' },
        { title: t("Perecível"), dataIndex: 'perecivel', key: 'perecivel' },
        { title: t("supplier:adminSupplier.detalhar"), dataIndex: 'acao', key: 'acao' }
    ];

    return (
        <>
            <Input placeholder={t("Pesquisa por Nome/Identificação")} onChange={(event) => setFiltro(event.target.value)} />
            <Table
                className="components-table-demo-nested"
                columns={columns}
                pagination={false}
                scroll={{ x: true }}
                dataSource={dadosTabela(filtro)}
            />
            {
                visible && (
                    <AlterStockModal
                        produto={{ ...produtoSelecionado }}
                        visible={visible}
                        onCancel={() => { setVisible(false); }}
                        onSaveProduct={salvarProduto}
                        onSaveBatch={salvarLote}
                    />
                )
            }
        </>
    );

}

export default AdminStock;