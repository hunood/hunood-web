import { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Routes
import Login from './pages/Login';

const OpenedAreaModule: FC = () => {
  return (
    <>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Redirect exact from="/" to="/login" />
      </Switch>
    </>
  );
};

export default OpenedAreaModule;