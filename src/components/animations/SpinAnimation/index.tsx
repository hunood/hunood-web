import { FC } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './style.less';

interface SpinAnimationProps {
    mensagem?: string,
    load?: boolean,
    fullScreen?: boolean
}

const SpinAnimation: FC<SpinAnimationProps> = ({ mensagem = '', load = false, fullScreen = false, children }) => {
    const icon = <LoadingOutlined style={{ fontSize: 26 }} spin />;

    return (
        <>
            {fullScreen ?
                <div className="spin-full">
                    <Spin tip={mensagem} spinning={load} indicator={icon} className="spin">
                        {children}
                    </Spin>
                </div>
                :
                <Spin tip={mensagem} spinning={load} indicator={icon} className="spin">
                    {children}
                </Spin>
            }
        </>
    )
}

export default SpinAnimation;