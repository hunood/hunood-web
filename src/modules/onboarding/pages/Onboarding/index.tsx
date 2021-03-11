import React, { FC, useState } from 'react';
import { Button, Form, Steps, Layout, Menu } from 'antd';
import { t } from 'i18n';
import './style.less';

import {
    UserForm, userOnFinish, userOnFinishFailed,
    BusinessForm, businessOnFinish, businessOnFinishFailed
} from 'components/forms';

const Onboarding: FC = () => {
    const { Step } = Steps;
    const { Header, Content, Footer } = Layout;
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();

    const steps = [
        {
            title: t('onboarding:dados-pessoais'),
            content: <UserForm form={form} />,
            onFinish: userOnFinish,
            onFinishFailed: userOnFinishFailed
        },
        {
            title: t('onboarding:sua-empresa'),
            content: <BusinessForm form={form} />,
            onFinish: businessOnFinish,
            onFinishFailed: businessOnFinishFailed
        },
        {
            title: t('onboarding:conta-finalizacao'),
            content: '<Conta />',
            onFinish: userOnFinish,
            onFinishFailed: userOnFinishFailed
        },
    ];

    const next = () => {
        setCurrent(current + 1);
    };
    
    const done = () => {
        // message.success('Processing complete!');
    }

    const onFinish = (values: any) => {
        if (current === steps.length - 1) {
            steps[current].onFinish(values, done);
            return;
        }

        steps[current].onFinish(values, next);
    }

    const onFinishFailed = (values: any) => {
        steps[current].onFinishFailed(values);
    }

    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
    };

    React.useEffect(() => { return; });

    return (
        <>
            <Form
                name="user"
                layout="vertical"
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                {...layout}
            >
                <Layout className="layout-100 box">
                    <Header className="site-layout-background">
                        <Menu theme='light'></Menu>
                    </Header>
                    <Content className="content">
                        <div className="steps-content">
                            <Steps direction="horizontal" current={current} className="steps">
                                {steps.map(item => (
                                    <Step key={item.title} title={item.title} />
                                ))}
                            </Steps>
                            {steps[current].content}
                        </div>
                    </Content>
                    <Footer className="footer">
                        <Button type="primary" htmlType="submit" className="btn-steps">
                            {current < steps.length - 1 ? t('onboarding:proximo') : t('onboarding:finalizar')}
                        </Button>
                    </Footer>
                </Layout>
            </Form>
        </>
    );
};

export { Onboarding };