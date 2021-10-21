import React, { FC, useContext } from 'react';
import { Form, Button, Layout } from 'antd';
import { AddSupplierService } from 'services/supplier';
import { Supplier, SupplierForm } from 'components/forms';
import { AuthContext } from 'assets/context/AuthContext';
import { t } from 'i18n';
import "./style.less"

const { Footer } = Layout;

const AddSupplier: FC = () => {
    React.useEffect(() => { return; });

    const { auth } = useContext(AuthContext);
    const [form] = Form.useForm();
    const addSupplierService = new AddSupplierService().useAsHook();

    const onFinish = (fornecedor: Supplier) => {
        addSupplierService.send({ ...fornecedor, idEmpresa: auth.empresas[0].id });
    };

    const resetarForm = () => {
        form.resetFields();
    };

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