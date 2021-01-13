import React, { FC, lazy, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, RouteProps } from 'react-router-dom';

export const base = {
    url: '/'
};

// Imports
const OpenedAreaModule = lazy(() => import('./modules/openedArea'));

const RootRouter = () => (
    <Suspense fallback={
        <BrowserRouter basename={base.url}>
            {/* exibição em carregamento de requisição */}
            <div>Carregando...</div>
        </BrowserRouter>
    }>
        <BrowserRouter basename={base.url}>
            {/* declaração das rotas */}
            <PublicRoute path="/" component={OpenedAreaModule} />
            <Redirect from="*" to="/login" />
        </BrowserRouter>
    </Suspense>
);

export const PublicRoute: FC<RouteProps> = ({ component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (component) {
                    return React.createElement(component, props);
                }
                return <Redirect to="/" />;
            }}
        />
    );
};

export const PrivateRoute: FC<RouteProps> = ({ component, ...rest }) => {
    const token = undefined;

    return (
        <Route
            {...rest}
            render={props => {
                if (token && component) {
                    return React.createElement(component, props);
                }
                return <Redirect to="/" />;
            }}
        />
    );
};

export default RootRouter;
