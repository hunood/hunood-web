import React, { FC } from 'react';
import { Empty } from 'antd';
import "./style.less";

const Welcome: FC = () => {
    React.useEffect(() => { return; });

    return (
        <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={false}
            
        />
    );

}
export default Welcome;