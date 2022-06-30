import React, { FC, useContext, useMemo, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { AppstoreOutlined, ExclamationCircleOutlined, FundOutlined, LogoutOutlined, ShopOutlined, SwapOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout, Menu, Modal } from 'antd';
import { AuthContext } from 'assets/context/AuthContext';
import { GlobalContext } from 'assets/context/GlobalContext';
import { invertEnum } from 'assets/utils/general';
import { TipoUsuario } from 'typing/enums';
import { t } from 'i18n';
import './style.less';

const { confirm } = Modal;
const { Sider, Content } = Layout;

type MenuOption = {
    name: string;
    route: string;
    icon: JSX.Element;
    permissao: typeof TipoUsuario[]
};

type MenuType = MenuOption & {
    sub: MenuOption[];
};

const DashboardLayout: FC = ({ children }) => {
    const history = useHistory();
    const pathname = '/' + history.location.pathname.split('/')[1];
    const [selectedKeys, setSelectedKeys] = useState(pathname);
    const [redirect, setRedirect] = useState(false);

    const { auth, handleLogout } = useContext(AuthContext);
    const { toggleMenuDashboard, isMenuOpened } = useContext(GlobalContext);

    const navegar = (route: string) => {
        setSelectedKeys(route);
        history.push(route);
    };

    const TipoUsuarioInvert = invertEnum<typeof TipoUsuario>(TipoUsuario) as any;

    const menus: MenuType[] = useMemo(() => [
        {
            name: t("dashboard:menu.dashboard"),
            route: '/dashboard',
            icon: <FundOutlined />,
            permissao: [TipoUsuarioInvert.Administrador],
            sub: []
        },
        {
            name: t("dashboard:menu.estoque"),
            route: '/stock',
            icon: <AppstoreOutlined />,
            permissao: [TipoUsuarioInvert.Administrador, TipoUsuarioInvert.Colaborador],
            sub: []
        },
        {
            name: t("dashboard:menu.fornecedor"),
            route: '/supplier',
            icon: <ShopOutlined />,
            permissao: [TipoUsuarioInvert.Administrador],
            sub: []
        },
        {
            name: t("dashboard:menu.usuarios"),
            route: '/users',
            icon: <TeamOutlined />,
            permissao: [TipoUsuarioInvert.Administrador],
            sub: []
        },
        {
            name: t("dashboard:menu.alterar-empresa"),
            route: '/business/select',
            icon: <SwapOutlined />,
            permissao: [TipoUsuarioInvert.Administrador, TipoUsuarioInvert.Colaborador],
            sub: []
        }
    ], [TipoUsuarioInvert]);


    const confirmarLogout = () => {
        setSelectedKeys('sair');
        confirm({
            title: t("dashboard:layout.tem-certeza-sair"),
            icon: <ExclamationCircleOutlined />,
            okText: t("dashboard:layout.sim"),
            cancelText: t("dashboard:layout.cancelar"),
            content: t("dashboard:layout.selecione-sim-sair"),
            autoFocusButton: 'cancel',
            onOk: () => {
                Modal.destroyAll()
                setTimeout(() => handleLogout(), 500);
            },
            onCancel() {
                setSelectedKeys(pathname);
            }
        });
    }

    React.useEffect(() => {
        setSelectedKeys(pathname);

        const temPermissao = menus.find((menu) => menu.route === pathname)?.permissao.includes(auth.empresas[0].tipoUsuario as any);

        if (!temPermissao) {
            setRedirect(true);
        }
    }, [pathname, menus, auth.empresas]);

    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={isMenuOpened} onCollapse={toggleMenuDashboard} >
                <div id='side' className={isMenuOpened ? 'curto' : 'longo'}>

                    <div className='box-logo'>
                        <div id='logo' className={isMenuOpened ? 'curto' : 'longo'}></div>
                    </div>

                    <Menu theme='dark' mode='inline' defaultSelectedKeys={[selectedKeys]} selectedKeys={[selectedKeys]}>
                        {menus.filter((menu) => menu.permissao.includes(auth.empresas[0].tipoUsuario as any)).map((menu) => {
                            return (<Menu.Item key={menu.route} icon={menu.icon} onClick={() => navegar(menu.route)}>
                                {menu.name}
                            </Menu.Item>);

                        })}
                        <Menu.Item key='sair' onClick={confirmarLogout} icon={<LogoutOutlined />}>
                            {t('dashboard:layout.sair')}
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
export default DashboardLayout;