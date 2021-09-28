import { FC, lazy, Suspense, useContext } from 'react';
import { BrowserRouter, Redirect, Route, RouteProps } from 'react-router-dom';
import { AuthContext } from 'assets/context/AuthContext';
import { SpinAnimation } from 'components/animations';
import { routerPaths } from 'modules/paths';
import useLoader from 'assets/hooks/useLoader';

export const base = {
    url: '/'
};

const OpenedAreaModule = lazy(() => import('./modules/openedArea'));
const OnboardingModule = lazy(() => import('./modules/onboarding'));
const DashboardModule = lazy(() => import('./modules/dashboard'));
const UsersModule = lazy(() => import('./modules/users'));

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
                    <CustomRoute component={OpenedAreaModule} />
                    <CustomRoute isPrivate path="/onboarding" component={OnboardingModule} />
                    <CustomRoute isPrivate path="/dashboard" component={DashboardModule} />
                    <CustomRoute isPrivate path="/users" component={UsersModule} />
                    <Route path="*" children={({ match }) => {
                        return (routerPaths.indexOf(match?.url || '') === -1) && <Redirect to='/404' />
                    }} />
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
