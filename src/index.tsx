import ReactDOM from 'react-dom';
import RootRouter from './router';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import { ConfigProviderProps } from 'antd/es/config-provider';
import 'override';

import ptBR from "antd/es/locale/pt_BR";
import "moment/locale/pt-br";

import './i18n';
import './style.global.less';
import { AuthProvider } from 'assets/context/AuthContext';
import { GlobalProvider } from 'assets/context/GlobalContext';

const configProviderProps: ConfigProviderProps = {
    locale: ptBR,
    componentSize: 'middle'
};

ReactDOM.render(
    <>
        <GlobalProvider>
            <AuthProvider>
                <ConfigProvider {...configProviderProps}>
                    <RootRouter />
                </ConfigProvider>
            </AuthProvider>
        </GlobalProvider>
    </>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
