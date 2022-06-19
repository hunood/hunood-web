import React, { FC, useState, useContext } from 'react';
import moment from 'moment';
import { Table, Input } from 'antd';
import { AuthContext } from 'assets/context/AuthContext';
import { GetAllProductsService } from 'services/product';
import { Produto } from 'services/product/GetAllProductsService/interfaces/response';
import { formatCurrency } from 'assets/utils/format';
import { t } from 'i18n';
import "./style.less";

const AdminStock: FC = () => {

    const { auth } = useContext(AuthContext);

    const [empresas, setProdutos] = useState<Produto[]>([]);
    const [filtro, setFiltro] = useState<string>('');
    const getAllProductsService = new GetAllProductsService().useAsHook();

    React.useEffect(() => {
        getAllProductsService.send({ idEmpresa: auth.empresas[0].id });  // eslint-disable-next-line
    }, []);


    getAllProductsService.onSuccess(() => {
        setProdutos(getAllProductsService.response?.produtos || []);
    });

    const dadosTabela = (filtro: string) => {

        return empresas?.map((produto: Produto, key: number) => {
            return {
                key,
                id: produto.id,
                nome: produto.nome,
                perecivel: produto.perecivel ? "Sim" : "Não",
                precoUnidade: formatCurrency(produto.precoUnidade),
                medida: produto.unidadeMedida,
                quantidade: produto.quantidade,
                tangivel: produto.idTipoProduto === 1 ? "Sim" : "Não",
                codigo: produto.codigo,
                lotes: produto.lotes
                // acao: <a href="Detalhar" onClick={(event) => {
                //     event.preventDefault();
                // }}>{t("users:adminUser.detalhar")}</a>
            }
        }).filter((produto) => produto.nome.toLocaleLowerCase().includes(filtro.toLocaleLowerCase().trim() || '')
            || produto.codigo.toLocaleLowerCase().includes(filtro.toLocaleLowerCase().trim() || '')
        );
    }

    const columns = [
        { title: t("Identificação"), dataIndex: 'nome', key: 'nome' },
        { title: t("Preço unitário"), dataIndex: 'precoUnidade', key: 'precoUnidade' },
        { title: t("Unidade de medida"), dataIndex: 'medida', key: 'medida' },
        { title: t("Qtd. disponível"), dataIndex: 'quantidade', key: 'quantidade' },
        { title: t("Perecível"), dataIndex: 'perecivel', key: 'perecivel' },
        { title: t("Tangível"), dataIndex: 'tangivel', key: 'tangivel' },
        // { title: t("supplier:adminSupplier.detalhar"), dataIndex: 'acao', key: 'acao' }
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
                expandable={{
                    expandedRowRender: record => {
                        return <>
                            <p><b>{t("Código do produto")}</b>: {record.codigo} </p>
                            <p><b>{t("Lotes")}</b>: Quantidade {record.lotes.length}</p>

                            {
                                record.lotes.length > 0 && (
                                    <table style={{ minWidth: "100%", tableLayout: "auto" }}>
                                        <thead>
                                            <th className="ant-table-cell" style={{ width: "25%" }}>Código</th>
                                            <th className="ant-table-cell" style={{ width: "25%" }}>Datas</th>
                                            <th className="ant-table-cell" style={{ minWidth: "50%" }}>Observação do lote</th>
                                        </thead>
                                        <tbody>
                                            {
                                                record.lotes.map(lote => {
                                                    return (
                                                        <tr className="ant-table-row ant-table-row-level-0">
                                                            <td className="ant-table-cell" style={{ width: "25%", border: "1px solid #f0f0f0", background: "#fff" }}>
                                                                {lote.codigo || "Não possui"}
                                                            </td>

                                                            <td className="ant-table-cell" style={{ width: "25%", border: "1px solid #f0f0f0", background: "#fff" }}>

                                                                <p>Fabricação <br /> {moment(lote.dataFabricacao).format("DD/MM/YYYY - HH:mm:ss A") || "Não possui"}</p>

                                                                {lote.dataValidadeIndeterminada && <p>Data de validade indeterminada</p>}
                                                                {!lote.dataValidadeIndeterminada && <p>Validade<br />{moment(lote.dataValidade).format("DD/MM/YYYY - HH:mm:ss A") || "Não possui"}</p>}

                                                            </td>

                                                            <td className="ant-table-cell" style={{ minWidth: "50%", border: "1px solid #f0f0f0", background: "#fff" }}>
                                                                {lote.observacoes || "-"}
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                )
                            }
                        </>
                    },
                    rowExpandable: record => !!record.codigo
                }}
            />
        </>
    );

}

export default AdminStock;