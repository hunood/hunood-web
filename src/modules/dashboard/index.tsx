import { DashboardLayout } from 'components/layouts';
import { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Routes
import Welcome from './pages/Welcome';
import Employees from './pages/Employees';
import Stock from './pages/Stock';
import { UserForm } from 'components/forms';

const DashboardModule: FC = () => {
  return (
    <>
      <DashboardLayout>
        <Switch>
          <Route exact path="/dashboard" component={Welcome} />
          <Route exact path="/dashboard/employees" component={Employees} />
          <Route exact path="/dashboard/stock" component={Stock} />
          <Route exact path="/dashboard/teste" component={UserForm} />
          <Redirect from="*" to="/" />
        </Switch>
      </DashboardLayout>
    </>
  );
};

export default DashboardModule;