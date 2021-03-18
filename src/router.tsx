import { AuthProvider, AuthContext } from 'assets/context/AuthContext';
import React, { FC, lazy, Suspense, useContext } from 'react';
import { BrowserRouter, Redirect, Route, RouteProps } from 'react-router-dom';

export const base = {
    url: '/'
};

const OpenedAreaModule = lazy(() => import('./modules/openedArea'));
const OnboardingModule = lazy(() => import('./modules/onboarding'));

const RootRouter = () => (
    <Suspense fallback={
        <BrowserRouter basename={base.url}>
            <div>Carregando...</div>
        </BrowserRouter>
    }>
        <BrowserRouter basename={base.url}>
            <AuthProvider>
                <CustomRoute isPrivate path="/onboarding" component={OnboardingModule} />
                <CustomRoute path="/" component={OpenedAreaModule} />
            </AuthProvider>
        </BrowserRouter>
    </Suspense>
);

export const CustomRoute: FC<RouteProps & { isPrivate?: boolean }> = ({ isPrivate, ...rest }) => {
    const { authenticated } = useContext(AuthContext);

    if (isPrivate && !authenticated) {
        return <Redirect to="/login" />
    }

    return <Route {...rest} />;
};

export default RootRouter;
