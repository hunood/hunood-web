import React, { FC } from 'react';
import { Button, DatePicker } from 'antd';
import { t } from 'i18n';

const Login: FC = () => {
    return (
        <>
            <h1>{t('areaAberta:hunood')}</h1>
            <Button type="primary">PRESS MeE</Button>
            <DatePicker placeholder="select date" />
        </>
    );
}

export default Login; 