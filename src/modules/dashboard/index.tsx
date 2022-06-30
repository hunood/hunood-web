import { DashboardLayout, PageHeaderLayout } from 'components/layouts';
import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { t } from 'i18n';

// Pages
import Dashboard from './pages/Dashboard';

export const dashboardPaths = [
  "/dashboard"
];

const tabs = [
  { nome: t("dashboard:tabs.dashboard"), route: dashboardPaths[0] }
];

const DashboardModule: FC = () => {
  return (
    <>
      <Switch>
        <DashboardLayout>
        <PageHeaderLayout tabs={tabs}>
          <Route exact path={dashboardPaths[0]} component={Dashboard} />
          </PageHeaderLayout>
        </DashboardLayout>
      </Switch>
    </>
  );
};

export default DashboardModule;
