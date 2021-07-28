import React, { FC, useContext, useState } from 'react';
import { useHistory } from "react-router-dom";

import { AuthContext } from 'assets/context/AuthContext';
import { Layout, Menu } from 'antd';
import { UserOutlined, LogoutOutlined, AppstoreOutlined } from '@ant-design/icons';
import { t } from 'i18n';
import "./style.less";

const { Header, Sider, Content } = Layout;
const DashboardLayout: FC = ({ children }) => {
    React.useEffect(() => { return; });

    const history = useHistory();
    const { handleLogout } = useContext(AuthContext);

    const collapsedMenu = Boolean(JSON.parse(localStorage.getItem('@CollapsedMenu') || String(window.innerWidth < 500)));
    const [collapsed, setCollapsed] = useState(collapsedMenu);

    const toggle = () => {
        localStorage.setItem('@CollapsedMenu', String(!collapsed));
        setCollapsed(!collapsed);
    };

    const menus = [
        {
            name: 'Estoque',
            route: '/dashboard/stock',
            icon: <AppstoreOutlined />
        },
        {
            name: 'Colaboradores',
            route: '/dashboard/employees',
            icon: <UserOutlined />
        }
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={toggle} >
                <div id="side" className={collapsed ? 'curto' : 'longo'}>

                    <div className="box-logo">
                        <div id="logo" className={collapsed ? 'curto' : 'longo'}></div>
                    </div>

                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[history.location.pathname]}>
                        {menus.map((menu) => {
                            return (<Menu.Item key={menu.route} icon={menu.icon} onClick={() => history.push(menu.route)}>
                                {menu.name}
                            </Menu.Item>);

                        })}
                        <Menu.Item key="sair" onClick={handleLogout} icon={<LogoutOutlined />}>
                            {t('onboarding:sair')}
                        </Menu.Item>
                    </Menu>
                </div>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0, marginBottom: 10, boxShadow: '1px 1px' }} >
                    <Menu theme="light" mode="horizontal" >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                {children && (
                    <Content className="site-layout-background content">
                        {children}
                    </Content>
                )}
            </Layout>
        </Layout>
    );

}
export { DashboardLayout };