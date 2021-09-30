import { FC, useContext } from 'react';
import { Menu, Layout } from 'antd';
import { AuthContext } from 'assets/context/AuthContext';
import { LogoutOutlined } from '@ant-design/icons';
import { t } from 'i18n';
import "./style.less";

const { Header } = Layout;

const SimpleHeaderLayout: FC = ({ children }) => {

    const { handleLogout } = useContext(AuthContext);

    return (
        <Layout className="layout-100 box">
            <Header className="site-layout-background header-logout">
                <Menu theme='dark'>
                    <Menu.Item key="1" onClick={handleLogout}>
                        {t('onboarding:sair')} &nbsp;<LogoutOutlined />
                    </Menu.Item>
                </Menu>
            </Header>
            {children}
        </Layout>
    );
}

export default SimpleHeaderLayout;
