import React, { FC, useState } from 'react';
import { Steps } from 'antd';
import { LayoutWithoutMenu } from 'components/layout';
import { t } from 'i18n';
import './style.less';

const { Step } = Steps;

const steps = [
    {
        title: t('onboarding:dados-pessoais'),
        content: 'First-content',
    },
    {
        title: t('onboarding:sua-empresa'),
        content: 'Second-content',
    },
    {
        title: t('onboarding:conta-finalizacao'),
        content: 'Last-content',
    },
];

const Onboarding: FC = () => {
    const [current, setCurrent] = useState(0);

    return (
        <>
            <LayoutWithoutMenu initialStep={0} numberOfSteps={3} getCurrentStep={setCurrent}>
                <>
                    <Steps direction="horizontal" current={current} className="steps">
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                    <div className="steps-content">{steps[current].content}</div>
                </>
            </LayoutWithoutMenu>
        </>
    );
};

export default Onboarding;