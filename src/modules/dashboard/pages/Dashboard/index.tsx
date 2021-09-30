import React, { FC } from 'react';
import { Empty } from 'antd';
import "./style.less";

const Dashboard: FC = () => {
    React.useEffect(() => { return; });

    return (
        <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={false}
            
        />
    );

}
export default Dashboard;