import React, { FC, useContext, useState } from 'react';
import { Button, Form, Layout } from 'antd';
import { BatchForm } from 'components/forms/BatchForm';
import { AuthContext } from 'assets/context/AuthContext';
import { AddStockService } from 'services/stock';
import { t } from 'i18n';
import "./style.less";

const { Footer } = Layout;

const EntryExitStock: FC = () => {
    React.useEffect(() => { return; });

    const [form] = Form.useForm();
    const [acao, setAcao] = useState<string>("");

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
                dataValidadeIndeterminada: dados.dataValidadeIndeterminada,
                dataFabricacao: dados.dataFabricacaoIndeterminada,
                dataValidade: dados.dataValidade,
                observacoes: dados.observacoes,
                codigo: dados.codigoLote,
                quantidadeProdutos: dados.quantidade,
            };

            console.log(dados);
            console.log("----");
            // console.log(dados);

            addStockService.send({
                idAutenticacao: auth.id,
                idEmpresa: auth.empresas[0].id,
                idProduto: dados.identificacao,
                tipoAcao: dados.acao.replace("í", "i").toUpperCase(),
                dataAcao: new Date(),
                quantidadeAcao: dados.quantidade,
                lote
            });

            submit_();
        });
    }

    const onFinish = (produto: any) => {
        // addStockService.send({ 
        //     idAutenticacao:  auth.id, 
        //     idEmpresa: auth.empresas[0].id, 
        //     idProduto: produto.identificacao,
        //     idLote: produto.codigoLote,
        //     tipoAcao: produto.acao.replace("í", "i").toUpperCase(),
        //     dataAcao: new Date(),
        //     lote: null
        // });
        console.log(produto)

        lote: {

        }

        //         acao: "Saída"
        // codigoLote: "70add5ad-5084-4d61-8ac4-a6d1c55a2e4d"
        // dataFabricacao: Moment {_isAMomentObject: true, _isUTC: false, _pf: {…}, _locale: Locale, _d: Fri Jun 17 2022 18:37:09 GMT-0300 (Horário Padrão de Brasília), …}
        // dataValidade: Moment {_isAMomentObject: true, _isUTC: false, _pf: {…}, _locale: Locale, _d: Wed Jun 29 2022 18:37:12 GMT-0300 (Horário Padrão de Brasília), …}
        // identificacao: "f9ac8f6d-f357-4628-9e76-e8a485bc1617"
        // observacoes: "2laksdknlaksndlaknsd"
    };

    React.useEffect(() => {
        // const a = form.getFieldValue("acao");
        console.log(acao);
    }, [acao]);

    return (
        <>
            <Form
                name="batch"
                layout="vertical"
                form={form}
                onFinish={onFinish}
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