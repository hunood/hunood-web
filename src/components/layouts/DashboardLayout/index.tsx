import React, { FC, useContext, useState } from 'react';
import { useHistory } from "react-router-dom";

import { AuthContext } from 'assets/context/AuthContext';
import { Layout, Menu, Form } from 'antd';
import { UserOutlined, LogoutOutlined, AppstoreOutlined } from '@ant-design/icons';
import { t } from 'i18n';
import "./style.less";

const { Header, Sider, Content } = Layout;
const DashboardLayout: FC = ({ children }) => {
    React.useEffect(() => { return; });

    const history = useHistory();
    const { handleLogout } = useContext(AuthContext);

    const collapsedMenu = Boolean(JSON.parse(localStorage.getItem('@CollapsedMenu') || 'false'));
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
                <div  id="side" className={collapsed ? 'curto' : 'longo'}>

                <div className="box-logo">
                    <div id="logo" className={collapsed ? 'curto' : 'longo'}></div>
                </div>

                <Menu theme="dark" mode="inline" defaultSelectedKeys={[history.location.pathname]}>
                    {menus.map((menu) => {
                        return (<Menu.Item key={menu.route} icon={menu.icon} onClick={() => history.push(menu.route)}>
                            {menu.name}
                        </Menu.Item>);

                    })}
                </Menu>
                </div>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background header-layout-dashboard">
                    <Menu style={{ float: 'right' }}>
                        <Menu.Item key="1" onClick={handleLogout}>
                            {t('onboarding:sair')} &nbsp;<LogoutOutlined />
                        </Menu.Item>
                    </Menu>
                </Header>
                <Form
                    name="user"
                    layout="vertical"
                    autoComplete="off"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
                    {children && (
                        <Content className="site-layout-background content">
                            {children}
                        </Content>
                    )}
                </Form>
            </Layout>
        </Layout>
    );

}
export { DashboardLayout };