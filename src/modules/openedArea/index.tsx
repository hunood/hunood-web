import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

// Routes
import Login from './pages/Login';

const OpenedAreaModule: FC = () => {
  return (
    <>
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    </>
  );
};

export default OpenedAreaModule;