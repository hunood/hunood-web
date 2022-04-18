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

const AdminSupplier: FC = () => {

    const { auth } = useContext(AuthContext);

    const [empresas, setEmpresas] = useState<Fornecedor[]>([]);
    const [filtro, setFiltro] = useState<string>('');
    const findByBusinessService = new FindByBusinessService().useAsHook();

    React.useEffect(() => {
        findByBusinessService.send({ idEmpresa: auth.empresas[0].id });  // eslint-disable-next-line
    }, []);


    findByBusinessService.onSuccess(() => {
        setEmpresas(findByBusinessService.response?.fornecedores || []);
    });

    const dadosTabela = (filtro: string) => {

        return empresas?.map((empresa: Fornecedor, key: number) => {
            return {
                key,
                nomeFantasia: empresa.nomeFantasia,
                cnpj: empresa.cnpj || "XX.XXX.XXX/XXXX-XX",
                observacoes: empresa.observacoes,
                telefone: <>{empresa.contatos.map((c: Contact, index: number) =>
                    <p key={index}><b>{TiposTelefone[c.tipoContato]}</b>: {c.contato} </p>
                )}</>,
                acao: <a href="Detalhar" onClick={(event) => {
                    event.preventDefault();
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
        </>
    );

}

export default AdminSupplier;