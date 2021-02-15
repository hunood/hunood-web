import React from 'react';
import ReactDOM from 'react-dom';
import RootRouter from './router';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';
import './i18n';
import './style.global.less';

const configProviderProps = {
    locale: ptBR,
    componentSize: 'large'
};

ReactDOM.render(
    <>
        <h1>Olá</h1>
        {/* <ConfigProvider {...configProviderProps as any}>
            <RootRouter />
        </ConfigProvider> */}
    </>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
