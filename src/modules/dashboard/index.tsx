import { DashboardLayout } from 'components/layouts';
import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

// Pages
import Dashboard from './pages/Dashboard';

export const dashboardPaths = [
  "/dashboard"
];

const DashboardModule: FC = () => {
  return (
    <>
      <Switch>
        <DashboardLayout>
          <Route exact path={dashboardPaths[0]} component={Dashboard} />
        </DashboardLayout>
      </Switch>
    </>
  );
};

export default DashboardModule;
