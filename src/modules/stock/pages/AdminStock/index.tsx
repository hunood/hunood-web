import React, { FC, useState, useContext } from 'react';
import { Table, Input, Badge } from 'antd';
import { AuthContext } from 'assets/context/AuthContext';
import { AlterStockModal } from 'components/modals';
import { GetAllProductsService } from 'services/product';
import { Produto } from 'services/product/GetAllProductsService/interfaces/response';
import { formatCurrency } from 'assets/utils/format';
import { t } from 'i18n';
import "./style.less";
import moment from 'moment';

const AdminStock: FC = () => {

    const { auth } = useContext(AuthContext);

    const [empresas, setProdutos] = useState<Produto[]>([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState({} as Produto);
    const [visible, setVisible] = useState<boolean>(false);
    const [filtro, setFiltro] = useState<string>('');
    const getAllProductsService = new GetAllProductsService().useAsHook();

    React.useEffect(() => {
        getAllProductsService.send({ idEmpresa: auth.empresas[0].id });  // eslint-disable-next-line
    }, []);


    getAllProductsService.onSuccess(() => {
        setProdutos(getAllProductsService.response?.produtos || []);
    });

    const detalharProduto = (produto: Produto) => {
        setProdutoSelecionado(produto);
        setVisible(true);
    }

    const salvar = () => {

    }

    const recuperarStatus = (produto: Produto) => {
        const temProdutoVencido = produto.lotes.some(p =>{
            return p.dataValidade != null && moment(p.dataValidade).isBefore(new Date()) && p.quantidadeProdutos > 0
        });

        if (temProdutoVencido) {
            return <Badge status="error" />;
        }
        return <Badge status="success" />
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
                        onSave={salvar}
                    />
                )
            }
        </>
    );

}

export default AdminStock;