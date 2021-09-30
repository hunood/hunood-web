import { DashboardLayout } from 'components/layouts';
import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

// Pages
import Dashboard from './pages/Dashboard';
import SelectBusiness from './pages/SelectBusiness';

export const dashboardPaths = [
  "/dashboard",
  "/entering"
];

const DashboardModule: FC = () => {
  return (
    <>
      <Switch>
        <Route exact path="/entering" component={SelectBusiness} />
        <DashboardLayout>
          <Route exact path="/dashboard" component={Dashboard} />
        </DashboardLayout>
      </Switch>
    </>
  );
};

export default DashboardModule;
