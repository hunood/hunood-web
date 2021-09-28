import React, { FC, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Result } from 'antd';
import { t } from 'i18n';
import "./style.less";

const Page404: FC = () => {
    const [redirecionar, setRedirecionar] = useState(false);
    const timer = setTimeout(() => {
        setRedirecionar(true);
    }, 6000);

    React.useEffect(() => {
        return () => clearTimeout(timer);
    })

    if (redirecionar) {
        return <Redirect to="/" />;
    }

    return (
        <Result
            status="404"
            title={t("openedArea:page404.pagina-nao-encontrada")}
            subTitle={t("openedArea:page404.msg-pagina-nao-encontrada")}
            extra={<Button type="primary" onClick={() => setRedirecionar(true)}>
                {t("openedArea:page404.ir-para-inicio")}
            </Button>}
        />
    );
};

export default Page404;
