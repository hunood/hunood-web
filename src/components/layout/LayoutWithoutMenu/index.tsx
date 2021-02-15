import React, { FC } from 'react';
import { Layout, Menu } from 'antd';
import './style.less';

const { Header, Content, Footer } = Layout;

interface LayoutWithoutMenuProps {
    footer?: React.ReactNode
}

const LayoutWithoutMenu: FC<LayoutWithoutMenuProps> = ({ children, footer }) => {
    return (
        <>
            <Layout className="layout-100 box">
                <Header className="site-layout-background">
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Content className="content">
                    <div className="site-layout-content">{children}</div>
                </Content>
                {footer && (
                    <Footer className="footer">{footer}</Footer>
                )}
            </Layout>
        </>
    );
}

export default LayoutWithoutMenu;