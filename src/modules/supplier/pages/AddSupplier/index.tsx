import React, { FC, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { Form, Button, Layout, Modal, Result } from 'antd';
import { AddSupplierService } from 'services/supplier';
import { Supplier, SupplierForm } from 'components/forms';
import { AuthContext } from 'assets/context/AuthContext';
import { t } from 'i18n';
import "./style.less"

const { Footer } = Layout;

const AddSupplier: FC = () => {
    React.useEffect(() => { return; });

    const { auth } = useContext(AuthContext);
    const [exibirSucesso, setExibirSucesso] = useState(false);
    const [dadosFornecedor, setDadosFornecedor] = useState({} as Supplier);
    const [form] = Form.useForm();
    const history = useHistory();
    const addSupplierService = new AddSupplierService().useAsHook();

    const onFinish = (fornecedor: Supplier) => {
        addSupplierService.send({ ...fornecedor, idEmpresa: auth.empresas[0].id });
        setDadosFornecedor(fornecedor);
    };

    addSupplierService.onSuccess(() => {
        setExibirSucesso(true);
    });

    addSupplierService.onError(() => {
        Modal.info({
            title: t("suppler:addSupplier.fornecedor-erro"),
            content: t("suppler:addSupplier.msg-fornecedor-erro"),
            okText: t("suppler:addSupplier.fechar")
        });
    })


    const resetarForm = () => {
        form.resetFields();
    };

    if (exibirSucesso) {
        return (
            <Result
                status="success"
                title={t("supplier:addSupplier.sucesso-cadastro")}
                subTitle={t("supplier:addSupplier.sucesso-fornecedor-cadastrado", { fornecedor: dadosFornecedor.nomeFantasia })}
                extra={[
                    <Button type="primary" key="associar" onClick={() => { form.resetFields(); setExibirSucesso(false) }}>
                        {t("supplier:addSupplier.novo-cadastro")}
                    </Button>,
                    <Button key="consultar" onClick={() => history.push('/supplier')}>
                        {t("supplier:addSupplier.consultar-lista-fornecedores")}
                    </Button>
                ]}
            />
        )
    }

    return (
        <Form
            name="supplier"
            layout="vertical"
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
        >
            <SupplierForm form={form} />
            <Footer className="addSupplier-footer">
                <Button type="primary" htmlType="submit" className="addSupplier-btn-add">
                    {t("supplier:addSupplier.cadastrar")}
                </Button>

                <Button htmlType="reset" className="addSupplier-btn-add" onClick={resetarForm}>
                    {t("supplier:addSupplier.resetar")}
                </Button>
            </Footer>
        </Form>
    );

}

export default AddSupplier;