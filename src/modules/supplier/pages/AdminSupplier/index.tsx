import React, { FC, useContext } from 'react';
import { FindByBusinessService } from 'services/supplier';
import { AuthContext } from 'assets/context/AuthContext';
import "./style.less";
import { Table, Input } from 'antd';
import { t } from 'i18n';
import { useState } from 'react';
import { Fornecedor } from 'services/supplier/FindByBusinessService/interfaces/response';
import { TiposTelefone } from 'typing/enums';
import { Contact } from 'components/forms';
import { AlterSupplierModal } from 'components/modals/AlterSupplierModal';

const AdminSupplier: FC = () => {

    const { auth } = useContext(AuthContext);

    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
    const [filtro, setFiltro] = useState<string>('');
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState({} as Fornecedor);
    const [visible, setVisible] = useState<boolean>(false);
    const findByBusinessService = new FindByBusinessService().useAsHook();

    React.useEffect(() => {
        findSupplier()  // eslint-disable-next-line
    }, []);

    const findSupplier = () => {
        findByBusinessService.send({ idEmpresa: auth.empresas[0].id });
    }
    
    findByBusinessService.onSuccess(() => {
        setFornecedores(findByBusinessService.response?.fornecedores || []);
    });
    
    findByBusinessService.onFinish(() => {
        setVisible(false);
    })

    const detalharFornecedor = (fornecedor: Fornecedor) => {
        setFornecedorSelecionado(fornecedor);
        setVisible(true);
    };

    const dadosTabela = (filtro: string) => {

        return fornecedores?.map((fornecedor: Fornecedor, key: number) => {
            return {
                key,
                nomeFantasia: fornecedor.nomeFantasia,
                cnpj: fornecedor.cnpj || "XX.XXX.XXX/XXXX-XX",
                observacoes: fornecedor.observacoes,
                telefone: <>{fornecedor.contatos.map((c: Contact, index: number) =>
                    <p key={index}><b>{TiposTelefone[c.tipoContato]}</b>: {c.contato} </p>
                )}</>,
                acao: <a href="Detalhar" onClick={(event) => {
                    event.preventDefault();
                    detalharFornecedor(fornecedor);
                }}>{t("users:adminUser.detalhar")}</a>
            }
        }).filter((empresa) => empresa.cnpj.includes(filtro.trim() || '') ||
            empresa.nomeFantasia.toLocaleLowerCase().includes(filtro.toLocaleLowerCase().trim() || '')
        );
    }

    const columns = [
        { title: t("supplier:adminSupplier.nome-fantasia"), dataIndex: 'nomeFantasia', key: 'nomeFantasia' },
        { title: t("supplier:adminSupplier.cnpj"), dataIndex: 'cnpj', key: 'cnpj' },
        { title: t("supplier:adminSupplier.telefone"), dataIndex: 'telefone', key: 'telefone' },
        { title: t("supplier:adminSupplier.detalhar"), dataIndex: 'acao', key: 'acao' }
    ];

    return (
        <>
            <Input placeholder={t("supplier:adminSupplier.pesquisa")} onChange={(event) => setFiltro(event.target.value)} />
            <Table
                columns={columns}
                pagination={false}
                scroll={{ x: true }}
                expandable={{
                    expandedRowRender: record => {
                        return <>
                            <p><b>{t("supplier:adminSupplier.observacoes")}</b>: {record.observacoes} </p>
                        </>
                    },
                    rowExpandable: record => !!record.observacoes
                }}
                dataSource={dadosTabela(filtro)}
            />

            {
                visible && (
                    <AlterSupplierModal
                        fornecedor={{ ...fornecedorSelecionado }}
                        visible={visible}
                        onCancel={() => setVisible(false)}
                        onSave={() => findSupplier()}
                    />
                )
            }
        </>
    );

}

export default AdminSupplier;