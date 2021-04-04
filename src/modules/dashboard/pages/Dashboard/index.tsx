import React, { FC } from 'react';
import { Layout } from 'antd';
import "./style.less";

const Dashboard: FC = () => {
    React.useEffect(() => { return; }, []);
    return (
        <>
            <Layout className="layout-center">
                <h1>Dashboard</h1>
            </Layout>
        </>
    );
}

export default Dashboard;
