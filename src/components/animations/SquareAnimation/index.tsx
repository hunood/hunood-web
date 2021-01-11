import { FC } from 'react';
import './style.less';

const SquareAnimation: FC = () => {
    return (
        <>
            <div className="square-animation">
                <ul className="squares">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div >
        </>
    )
}

export default SquareAnimation;