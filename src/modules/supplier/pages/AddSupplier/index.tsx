import { Supplier, SupplierForm } from 'components/forms';
import { Form, Button, Layout } from 'antd';
import React, { FC } from 'react';
import "./style.less"
import { t } from 'i18n';

const { Footer } = Layout;

const AddSupplier: FC = () => {

    React.useEffect(() => { return; });

    const [form] = Form.useForm();

    const onFinish = (fornecedor: Supplier) => {
        console.log(fornecedor);
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