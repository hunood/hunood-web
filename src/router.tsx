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
const BusinessModule = lazy(() => import('./modules/business'));
const StockModule = lazy(() => import('./modules/stock'));
const SupplierModule = lazy(() => import('./modules/supplier'));

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
                    <CustomRoute isPrivate path="/business" component={BusinessModule} />
                    <CustomRoute isPrivate path="/stock" component={StockModule} />
                    <CustomRoute isPrivate path="/supplier" component={SupplierModule} />
                    <Route path="*" children={({ location }) => {
                        if (location.pathname.includes('/change') && location.search) {
                            return <Redirect to={location.pathname + location.search} />
                        }
                        return (routerPaths.indexOf(location.pathname || '') === -1) && <Redirect to='/404' />
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
