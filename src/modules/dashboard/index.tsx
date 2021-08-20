import { DashboardLayout } from 'components/layouts';
import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

// Routes
import Welcome from './pages/Welcome';

const DashboardModule: FC = () => {
  return (
    <>
      <DashboardLayout>
        <Switch>
          <Route exact path="/dashboard" component={Welcome} />
        </Switch>
      </DashboardLayout>
    </>
  );
};

export default DashboardModule;