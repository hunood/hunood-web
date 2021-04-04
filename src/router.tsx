import { AuthContext } from 'assets/context/AuthContext';
import useLoader from 'assets/hooks/useLoader';
import { SpinAnimation } from 'components/animations';
import React, { FC, lazy, Suspense, useContext } from 'react';
import { BrowserRouter, Redirect, Route, RouteProps } from 'react-router-dom';

export const base = {
    url: '/'
};

const OpenedAreaModule = lazy(() => import('./modules/openedArea'));
const OnboardingModule = lazy(() => import('./modules/onboarding'));
const DashboardModule = lazy(() => import('./modules/dashboard'));


const RootRouter: FC = () => {
    const { isLoading } = useLoader();

    return (
        <Suspense fallback={
            <BrowserRouter basename={base.url}>
                <SpinAnimation mensagem="Carregando..." fullScreen />
            </BrowserRouter>
        }>
            <BrowserRouter basename={base.url}>
                <SpinAnimation load={isLoading}>
                    <CustomRoute isPrivate path="/dashboard" component={DashboardModule} />
                    <CustomRoute isPrivate path="/onboarding" component={OnboardingModule} />
                    <CustomRoute path="/" component={OpenedAreaModule} />
                </SpinAnimation>
            </BrowserRouter>
        </Suspense>
    )
};

export const CustomRoute: FC<RouteProps & { isPrivate?: boolean }> = ({ isPrivate, ...rest }) => {
    const { authenticated } = useContext(AuthContext);

    if (isPrivate && !authenticated) {
        return <Redirect to="/login" />
    }

    return <Route {...rest} />;
};

export default RootRouter;
