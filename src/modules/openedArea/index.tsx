import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

// Routes
import Login from './pages/login';

const AreaAbertaModule: FC = () => {
  return (
    <>
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    </>
  );
};

export default AreaAbertaModule;