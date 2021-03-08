import React, { FC, useState } from 'react';
import { Button, Form, Steps, Layout, Menu } from 'antd';
import { t } from 'i18n';
import './style.less';

import {
    UserForm, userOnFinish, userOnFinishFailed,
    BusinessForm, businessOnFinish, businessOnFinishFailed
} from 'components/forms';

const { Step } = Steps;

const steps = [
    {
        title: t('onboarding:dados-pessoais'),
        content: <UserForm />,
        onFinish: userOnFinish,
        onFinishFailed: userOnFinishFailed
    },
    {
        title: t('onboarding:sua-empresa'),
        content: <BusinessForm />,
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

const Onboarding: FC = () => {
    const { Header, Content, Footer } = Layout;
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const done = () => {
        // message.success('Processing complete!');
    }


    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
    };

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


    React.useEffect(() => { return; });

    return (
        <>
            <Form
                {...layout}
                name="user"
                layout="vertical"

                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
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
                        <div className="steps-action">
                            <div className="steps-cursors">
                                <Button className="btn-previous" onClick={() => prev()} disabled={current === 0}>
                                    {t('onboarding:voltar')}
                                </Button>

                                <Button type="primary" htmlType="submit" className="btn-next" disabled={current === steps.length - 1}>
                                    {t('onboarding:proximo')}
                                </Button>
                            </div>

                            <Button type="primary" htmlType="submit" className="btn-start" disabled={current !== steps.length - 1}>
                                {t('onboarding:finalizar')}
                            </Button>
                        </div>
                    </Footer>
                </Layout>
            </Form>
        </>
    );
};

export { Onboarding };