import React, { FC, useMemo, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { PageHeader, Tabs, Layout } from 'antd';
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
    const history = useHistory();

    const [tabSelecionada, setTabSelecionada] = useState("0");
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

    React.useEffect(() => {
        const tab = tabs.map(tab => tab.route).indexOf(history.location.pathname);
        setTabSelecionada(tab.toString());
    }, [history.location.pathname, tabs]);

    return (
        <>
            <PageHeader
                className={`page-header ${isMenuOpened ? "page-header-longo" : "page-header-curto"}`}
                title={titulo || ''}
                subTitle={subTitulo || ''}
                footer={
                    <Tabs
                        activeKey={tabSelecionada}
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
            <Footer className="footer-page-header" />
        </>
    )
};

export default PageHeaderLayout;
