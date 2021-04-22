import React, { FC, useContext, useState } from 'react';
import { useHistory } from "react-router-dom";

import { AuthContext } from 'assets/context/AuthContext';
import { Layout, Menu, Form } from 'antd';
import { UserOutlined, LogoutOutlined, AppstoreOutlined } from '@ant-design/icons';
import { t } from 'i18n';
import "./style.less";
import Logo from 'assets/img/logo-branco.png';
import LogoCurto from 'assets/img/logo-branco-curto.png';

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

    function handleClick(route: string) {
        history.push(route);
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={toggle}>
                <div className="logo">
                    {!collapsed && <img src={Logo} className="logo-longo" alt={'Hunood'} />}
                    {collapsed && <img src={LogoCurto} className="logo-curto" alt={'Hunood'} />}
                </div>
                <Menu theme="dark" mode="inline" >
                    {menus.map((menu, key) => {
                        return (<Menu.Item key={key} icon={menu.icon} onClick={() => handleClick(menu.route)}>
                            {menu.name}
                        </Menu.Item>);

                    })}
                </Menu>
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
                    {children && <Content
                        className="site-layout-background content-layout-dashboard"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        {children}
                    </Content>}
                </Form>
            </Layout>
        </Layout>
    );

}
export { DashboardLayout };