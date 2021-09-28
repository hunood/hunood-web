import { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Page404 from './pages/Page404';

export const openedAreaPaths = [
  "/login",
  "/404"
];

const OpenedAreaModule: FC = () => {
  return (
    <>
      <Switch>
        <Route exact path={openedAreaPaths[0]} component={Login} />
        <Route exact path={openedAreaPaths[1]} component={Page404} />
        <Redirect exact from="/" to="/login" />
      </Switch>
    </>
  );
};

export default OpenedAreaModule;
