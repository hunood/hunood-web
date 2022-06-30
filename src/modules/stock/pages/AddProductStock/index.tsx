import React, { FC, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from 'assets/context/AuthContext';
import { Form, Button, Layout, Result, Modal } from 'antd';
import { AddProductService } from 'services/product';
import { Product, ProductForm } from 'components/forms';
import { t } from 'i18n';
import "./style.less"

const { Footer } = Layout;

const AddProductStock: FC = () => {
    React.useEffect(() => { return; });

    const { auth } = useContext(AuthContext);
    const [produtoAdicionado, setProdutoAdicionado] = useState({} as Product);
    const [form] = Form.useForm();
    const history = useHistory();
    const addProductService = new AddProductService().useAsHook();

    const onFinish = (produto: Product) => {
        produto.codigoLote = (produto as any).codigoLote2;
        addProductService.send({ ...produto, idEmpresa: auth.empresas[0].id });
    };
    
    addProductService.onSuccess(() => {
        setProdutoAdicionado(addProductService.response as any);
    });

    addProductService.onError(() => {
        const error = addProductService.error;
        Modal.info({
            title: t("product:addProduct.produto-erro"),
            content: error?.message || t("product:addProduct.msg-produto-erro"),
            okText: t("product:addProduct.fechar")
        });
    });
    
    const resetarForm = () => {
        form.resetFields();
    };

    if (produtoAdicionado.nome) {
        return (
            <Result
                status="success"
                title={t("product:addProduct.sucesso-cadastro")}
                subTitle={t("product:addProduct.sucesso-produto-cadastrado", { produto: produtoAdicionado.nome })}
                extra={[
                    <Button type="primary" key="associar" onClick={() => { form.resetFields(); setProdutoAdicionado({} as Product) }}>
                        {t("product:addProduct.novo-cadastro")}
                    </Button>,
                    <Button key="consultar" onClick={() => history.push('/stock')}>
                        {t("product:addProduct.consultar-lista-produtos")}
                    </Button>
                ]}
            />
        )
    }
    
    return (
        <Form
            name="batch"
            layout="vertical"
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
        >
            <ProductForm form={form} />
            <Footer className="addBatch-footer">
                <Button type="primary" htmlType="submit" className="addBatch-btn-add">
                    {t("supplier:addSupplier.cadastrar")}
                </Button>

                <Button htmlType="reset" className="addBatch-btn-add" onClick={resetarForm}>
                    {t("supplier:addSupplier.resetar")}
                </Button>
            </Footer>
        </Form>
    );

}

export default AddProductStock;