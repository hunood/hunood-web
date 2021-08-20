import React, { FC, useMemo } from 'react';
import { PageHeader, Tabs } from 'antd';
import './style.less';

const { TabPane } = Tabs;

interface PageHeaderLayoutProps {
    titulo?: string,
    subTitulo?: string,
    tabs: string[],
    onChangeTab: (event: { tab: string, index: number }) => void;
}

const PageHeaderLayout: FC<PageHeaderLayoutProps> = ({ titulo, subTitulo, tabs, onChangeTab, children }) => {
    React.useEffect(() => { return; });

    const marginTopChildren = useMemo(() => {
        return titulo ? 120 : subTitulo ? 110 : 80
    }, [titulo, subTitulo]);

    return (
        <>
            <PageHeader
                className="site-page-header-responsive"
                title={titulo || ''}
                subTitle={subTitulo || ''}
                footer={
                    <Tabs defaultActiveKey="0" onChange={(key) => onChangeTab({ tab: tabs[Number(key)], index: Number(key) })}>
                        {tabs.map((tab: string, index: number) => {
                            return (
                                <TabPane tab={tab} key={index} />
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