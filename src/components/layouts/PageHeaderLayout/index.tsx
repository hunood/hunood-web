import React, { FC, useMemo, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { PageHeader, Tabs, Layout, BackTop } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';
import { GlobalContext } from 'assets/context/GlobalContext';
import './style.less';

const { TabPane } = Tabs;
const { Footer } = Layout;

type Tab = {
    nome: string,
    route: string
}

interface PageHeaderLayoutProps {
    tabs: Tab[],
    titulo?: string,
    subTitulo?: string,
    onChangeTab?: (event: { tab: Tab, index: number }) => void;
}

const PageHeaderLayout: FC<PageHeaderLayoutProps> = ({ titulo, subTitulo, tabs, onChangeTab, children }) => {
    React.useEffect(() => { return; });

    const history = useHistory();
    const tab = tabs.map(tab => tab.route).indexOf(history.location.pathname);

    const [tabSelecionada, setTabSelecionada] = useState(tab.toString());
    const { isMenuOpened } = useContext(GlobalContext);

    const marginTopChildren = useMemo(() => {
        return titulo ? 130 : subTitulo ? 120 : 80
    }, [titulo, subTitulo]);

    const navegar = (key: string) => {
        if (onChangeTab) {
            onChangeTab({ tab: tabs[Number(key)], index: Number(key) });
        }
        setTabSelecionada(Number(key).toString());
        history.push(tabs[Number(key)].route);
    };

    return (
        <>
            <PageHeader
                className={`page-header ${isMenuOpened ? "page-header-longo" : "page-header-curto"}`}
                title={titulo || ''}
                subTitle={subTitulo || ''}
                footer={
                    <Tabs
                        defaultActiveKey={tabSelecionada}
                        tabPosition="top"
                        onChange={navegar}
                    >
                        {tabs.map((tab: Tab, index: number) => {
                            return (
                                <TabPane tab={tab.nome} key={index} />
                            );
                        })}
                    </Tabs>
                }
            >
            </PageHeader>
            <div className="page-header-content" style={{ marginTop: marginTopChildren }}>
                {children}
            </div>
            <Footer className="footer-page-header">
                <BackTop className="back-top" visibilityHeight={50}>
                    <div><UpCircleOutlined /></div>
                </BackTop>
            </Footer>
        </>
    )
};

export { PageHeaderLayout };
