import React, { FC } from 'react';
import { Button } from 'antd';
import { t } from 'i18n';
import "./style.less";

const Login: FC = () => {
    return (
        <>
            <h1>{t('areaAberta:hunood')}</h1>
            <Button type="primary">PRESS ME</Button>
        </>
    );
}

export default Login; 