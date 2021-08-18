import React, { FC, useContext, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from 'assets/context/AuthContext';
import { Layout, Menu } from 'antd';
import { UserOutlined, LogoutOutlined, AppstoreOutlined } from '@ant-design/icons';
import { t } from 'i18n';
import './style.less';

const { Sider, Content } = Layout;

type MenuOption = {
    name: string;
    route: string;
    icon: JSX.Element;
};

type MenuType = MenuOption & {
    sub: MenuOption[];
};

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

    const navegar = (route: string) => {
        history.push(route);
    };

    const menus: MenuType[] = useMemo(() => [
        {
            name: 'Resumo',
            route: '/dashboard',
            icon: <AppstoreOutlined />,
            sub: []
        },
        {
            name: 'Estoque',
            route: '/dashboard/stock',
            icon: <AppstoreOutlined />,
            sub: []
        },
        {
            name: 'Colaboradores',
            route: '/dashboard/employees',
            icon: <UserOutlined />,
            sub: []
        },
        {
            name: 'Teste',
            route: '/dashboard/teste',
            icon: <AppstoreOutlined />,
            sub: []
        }
    ], []);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={toggle} >
                <div id='side' className={collapsed ? 'curto' : 'longo'}>

                    <div className='box-logo'>
                        <div id='logo' className={collapsed ? 'curto' : 'longo'}></div>
                    </div>

                    <Menu theme='dark' mode='inline' defaultSelectedKeys={[history.location.pathname]}>
                        {menus.map((menu) => {
                            return (<Menu.Item key={menu.route} icon={menu.icon} onClick={() => navegar(menu.route)}>
                                {menu.name}
                            </Menu.Item>);

                        })}
                        <Menu.Item key='sair' onClick={handleLogout} icon={<LogoutOutlined />}>
                            {t('onboarding:sair')}
                        </Menu.Item>
                    </Menu>
                </div>
            </Sider>
            <Layout className='site-layout'>
                {children && (
                    <Content className='ant-form ant-form-vertical site-layout-background content'>
                        {children}
                    </Content>
                )}
            </Layout>
        </Layout>
    );

}
export { DashboardLayout };