import React, { FC } from 'react';
import { Form, Button, Layout } from 'antd';
import { UserForm } from 'components/forms';
import "./style.less";
import useMenuDashboard from 'assets/hooks/useMenuDashboard';

const { Footer } = Layout;

const AddUser: FC = () => {
    React.useEffect(() => { return; });

    const { isMenuOpened, toggleMenuDashboard } = useMenuDashboard()

    console.log(isMenuOpened);
    const [form] = Form.useForm();

    return (
        <>
            <Form
                name="user"
                layout="vertical"
                form={form}
                // onFinish={onFinish}
                autoComplete="off"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <UserForm form={form} />
                <Footer className="footer">
                    <Button type="primary" htmlType="submit" className="btn-steps">
                        {'Adcionar'}
                    </Button>
                </Footer>
            </Form>
        </>
    );

}
export default AddUser;