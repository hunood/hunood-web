import React from 'react';
import ReactDOM from 'react-dom';
import RootRouter from './router';
import reportWebVitals from './reportWebVitals';
import './i18n';
import './style.global.less';

ReactDOM.render(<><RootRouter /></>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
