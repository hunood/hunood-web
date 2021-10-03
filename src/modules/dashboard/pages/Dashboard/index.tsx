import React, { FC, useContext } from 'react';
import { Empty } from 'antd';
import { AuthContext } from 'assets/context/AuthContext';
import "./style.less";

const Dashboard: FC = () => {
    React.useEffect(() => { return; });

    const { auth } = useContext(AuthContext);

    return (
        <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={auth.empresas[0].nomeFantasia}

        />
    );

}
export default Dashboard;