import React, { FC, useContext, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from 'assets/context/AuthContext';
import { Layout, Menu, Modal } from 'antd';
import { TeamOutlined, LogoutOutlined, AppstoreOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { t } from 'i18n';
import './style.less';

const { confirm } = Modal;
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
    const history = useHistory();
    const { handleLogout } = useContext(AuthContext);

    const collapsedMenu = Boolean(JSON.parse(localStorage.getItem('@CollapsedMenu') || String(window.innerWidth < 500)));
    const [collapsed, setCollapsed] = useState(collapsedMenu);
    const [selectedKeys, setSelectedKeys] = useState(history.location.pathname);

    const toggle = () => {
        localStorage.setItem('@CollapsedMenu', String(!collapsed));
        setCollapsed(!collapsed);
    };

    const navegar = (route: string) => {
        setSelectedKeys(route);
        history.push(route);
    };

    const menus: MenuType[] = useMemo(() => [
        {
            name: 'Dashboard',
            route: '/dashboard',
            icon: <AppstoreOutlined />,
            sub: []
        },
        {
            name: 'Usuários',
            route: '/users',
            icon: <TeamOutlined />,
            sub: []
        }
    ], []);
    
    const confirmarLogout = () => {
        setSelectedKeys('sair');
        confirm({
            title: 'Tem certeza que deseja sair?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Sim',
            cancelText: 'Cancelar',
            content: 'Selecione Sim para sair ou Cancelar para permanecer logado no sistema.',
            autoFocusButton: 'cancel',
            onOk: () => {
                Modal.destroyAll()
                setTimeout(handleLogout, 500);
            },
            onCancel() {
                setSelectedKeys(history.location.pathname)
            }
        });
    }
    
    React.useEffect(() => {
        setSelectedKeys(history.location.pathname);
    }, [history]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={toggle} >
                <div id='side' className={collapsed ? 'curto' : 'longo'}>

                    <div className='box-logo'>
                        <div id='logo' className={collapsed ? 'curto' : 'longo'}></div>
                    </div>

                    <Menu theme='dark' mode='inline' defaultSelectedKeys={[selectedKeys]} selectedKeys={[selectedKeys]}>
                        {menus.map((menu) => {
                            return (<Menu.Item key={menu.route} icon={menu.icon} onClick={() => navegar(menu.route)}>
                                {menu.name}
                            </Menu.Item>);

                        })}
                        <Menu.Item key='sair' onClick={confirmarLogout} icon={<LogoutOutlined />}>
                            {t('onboarding:sair')}
                        </Menu.Item>
                    </Menu>
                </div>
            </Sider>
            <Layout className='site-layout'>
                {children && (
                    <Content className='ant-form ant-form-vertical site-layout-background content'>
                        {/* <PageHeaderLayout tabs={['tab 1', 'tab 2']} onChangeTab={console.log} > */}
                        {children}
                        {/* </PageHeaderLayout > */}

                    </Content>
                )}
            </Layout>
        </Layout>
    );

}
export { DashboardLayout };