import React, { FC, useState } from 'react';
import { Steps, Button, message } from 'antd';
import { LayoutWithoutMenu } from 'components/layout';
import './style.less';

const { Step } = Steps;

const steps = [
    {
        title: 'Pessoal',
        description: 'Fale sobre você',
        content: <p>'First-content'</p>,
    },
    {
        title: 'Empresa',
        description: 'Conte-nos sobre seu negócio',
        content: 'Second-content',
    },
    {
        title: 'Conta',
        description: 'Personalize sua conta',
        content: 'Last-content',
    },
];

const Onboarding: FC = () => {
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const done = () => {
        message.success('Processing complete!');
    };

    return (
        <>
            <LayoutWithoutMenu footer={<>
                <div className="steps-action">
                    <div className="steps-cursors">
                        <Button className="btn-previous" onClick={() => prev()} disabled={current === 0}>
                            Voltar
                        </Button>

                        <Button type="primary" className="btn-next" onClick={() => next()} disabled={current === steps.length - 1}>
                            Próximo
                        </Button>
                    </div>

                    <Button type="primary" className="btn-start" onClick={() => done()} disabled={current !== steps.length - 1}>
                        Iniciar
                    </Button>
                </div>
            </>}>
                <>
                    <Steps progressDot direction="horizontal" current={current} className="steps">
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} description={item.description} />
                        ))}
                    </Steps>
                    <div className="steps-content">{steps[current].content}</div>
                </>
            </LayoutWithoutMenu>
        </>
    );
};

export default Onboarding;