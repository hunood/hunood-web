import React, { FC, useContext, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from 'assets/context/AuthContext';
import { GlobalContext } from 'assets/context/GlobalContext';
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
    const { toggleMenuDashboard, isMenuOpened } = useContext(GlobalContext);

    const [selectedKeys, setSelectedKeys] = useState(history.location.pathname);

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
            <Sider collapsible collapsed={isMenuOpened} onCollapse={toggleMenuDashboard} >
                <div id='side' className={isMenuOpened ? 'curto' : 'longo'}>

                    <div className='box-logo'>
                        <div id='logo' className={isMenuOpened ? 'curto' : 'longo'}></div>
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
                        {children}
                    </Content>
                )}
            </Layout>
        </Layout>
    );

}
export { DashboardLayout };