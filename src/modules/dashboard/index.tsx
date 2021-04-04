import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

// Routes
import Dashboard from './pages/Dashboard';

const DashboardModule: FC = () => {
  return (
    <>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </>
  );
};

export default DashboardModule;