import React, { FC, useMemo } from 'react';
import { useHistory } from 'react-router';
import { PageHeader, Tabs } from 'antd';
import './style.less';

const { TabPane } = Tabs;

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

    const marginTopChildren = useMemo(() => {
        return titulo ? 130 : subTitulo ? 120 : 80
    }, [titulo, subTitulo]);

    const navegar = (key: string) => {
        if(onChangeTab) {
            onChangeTab({ tab: tabs[Number(key)], index: Number(key) });
        }
        history.push(tabs[Number(key)].route);
    };

    return (
        <>
            <PageHeader
                className="page-header"
                title={titulo || ''}
                subTitle={subTitulo || ''}
                footer={
                    <Tabs defaultActiveKey="0" onChange={navegar}>
                        {tabs.map((tab: Tab, index: number) => {
                            return (
                                <TabPane tab={tab.nome} key={index} />
                            );
                        })}
                    </Tabs>
                }
            >
            </PageHeader>
            <div style={{ margin: '0 20px', marginTop: marginTopChildren }}>
                {children}
            </div>
        </>
    )
};


export { PageHeaderLayout };