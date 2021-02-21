import React, { FC, useEffect, useState } from 'react';
import { Button, Layout, Menu } from 'antd';
import { t } from 'i18n';
import './style.less';

const { Header, Content, Footer } = Layout;

interface LayoutOnboardingProps {
    initialStep: number,
    numberOfSteps: number,
    getCurrentStep: (current: number) => void;
}

const LayoutOnboarding: FC<LayoutOnboardingProps> = ({ children, numberOfSteps, getCurrentStep }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        getCurrentStep(current);
        return;
    }, [current, getCurrentStep]);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const done = () => {
        // message.success('Processing complete!');
    }

    return (
        <>
            <Layout className="layout-100 box">
                <Header className="site-layout-background">
                    <Menu theme='light'></Menu>
                </Header>
                <Content className="content">
                    <div className="site-layout-content">{children}</div>
                </Content>
                <Footer className="footer">
                    <div className="steps-action">
                        <div className="steps-cursors">
                            <Button className="btn-previous" onClick={() => prev()} disabled={current === 0}>
                                {t('onboarding:voltar')}
                            </Button>

                            <Button type="primary" className="btn-next" onClick={() => next()} disabled={current === numberOfSteps - 1}>
                                {t('onboarding:proximo')}
                            </Button>
                        </div>

                        <Button type="primary" className="btn-start" onClick={() => done()} disabled={current !== numberOfSteps - 1}>
                            {t('onboarding:finalizar')}
                        </Button>
                    </div>
                </Footer>
            </Layout>
        </>
    );
}

export default LayoutOnboarding;