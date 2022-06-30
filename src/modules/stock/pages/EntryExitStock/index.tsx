import React, { FC, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Form, Layout, Result } from 'antd';
import { BatchForm } from 'components/forms/BatchForm';
import { AuthContext } from 'assets/context/AuthContext';
import { AddStockService } from 'services/stock';
import { t } from 'i18n';
import "./style.less";

const { Footer } = Layout;

const EntryExitStock: FC = () => {
    React.useEffect(() => { return; });

    const [form] = Form.useForm();
    const history = useHistory();

    const [acao, setAcao] = useState<string>("");
    const [sucesso, setSucesso] = useState<boolean>(false);

    const { auth } = useContext(AuthContext);
    const addStockService = new AddStockService().useAsHook();

    const resetarForm = () => {
        form.resetFields();
    };

    const submit_ = React.useMemo(() => form.submit, [form]);

    form.submit = () => {
        form.validateFields().then(() => {
            const dados = form.getFieldValue(undefined as any);
            
            const lote = {
                id: dados.ehLoteNovo ? null : dados.codigoLote,
                ehLoteNovo: dados.ehLoteNovo,
                dataFabricacao: dados.dataFabricacao,
                dataValidade: dados.dataValidade,
                observacoes: dados.observacoes,
                codigo: dados.codigoLote,
                quantidadeProdutos: dados.quantidade,
            };
            
            const acao: string = dados.acao.replace("í", "i").toUpperCase();
            const condicaoEntrada = acao === 'ENTRADA' && dados.quantidade > 0;
            const condicaoSaida = acao === 'SAIDA' && dados.quantidade > 0 &&  dados.quantidade <= dados.lote.quantidadeProdutos;

            if(condicaoEntrada || condicaoSaida) {
                addStockService.send({
                    idAutenticacao: auth.id,
                    idEmpresa: auth.empresas[0].id,
                    idProduto: dados.identificacao,
                    tipoAcao: dados.acao.replace("í", "i").toUpperCase(),
                    dataAcao: new Date(),
                    quantidadeAcao: dados.quantidade,
                    lote
                });
            }

            submit_();
        });
    }

    addStockService.onSuccess(() => {
        setSucesso(true);
    });

    if (sucesso) {
        return (
            <Result
                status="success"
                title={t("product:entryExit.sucesso-cadastro")}
                subTitle={t("product:entryExit.sucesso-entrada-saida", { acao })}
                extra={[
                    <Button type="primary" key="associar" onClick={() => { form.resetFields(); setSucesso(false) }}>
                        {t("product:entryExit.nova-entrada-saida")}
                    </Button>,
                    <Button key="consultar" onClick={() => history.push('/stock')}>
                        {t("product:entryExit.consultar-lista-produtos")}
                    </Button>
                ]}
            />
        )
    }

    return (
        <>
            <Form
                name="batch"
                layout="vertical"
                form={form}
                autoComplete="off"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <BatchForm form={form} onClickAcao={setAcao} />
                <Footer className="addBatch-footer">
                    <Button type="primary" htmlType="submit" className="addBatch-btn-add">
                        {acao.toUpperCase() === "SAÍDA" ? t("product:entryExit.saida") : t("product:entryExit.entrada")}
                    </Button>
                    <Button htmlType="reset" className="addBatch-btn-add" onClick={resetarForm}>
                        {t("supplier:addSupplier.resetar")}
                    </Button>
                </Footer>
            </Form>
        </>
    );

}

export default EntryExitStock;