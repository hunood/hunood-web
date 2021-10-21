import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { DashboardLayout, PageHeaderLayout } from 'components/layouts';
import { t } from 'i18n';

// Pages
import AdminUsers from './pages/AdminUsers';
import AddUser from './pages/AddUser';

export const userPaths = [
  "/users",
  "/users/add"
];

const tabs = [
  { nome: t("users:tabs.gestao-usuarios"), route: userPaths[0] },
  { nome: t("users:tabs.associacao"), route: userPaths[1] }
];

const UsersModule: FC = () => {
  return (
    <>
      <Switch>
        <DashboardLayout>
          <PageHeaderLayout tabs={tabs}>
            <Route exact path={userPaths[0]} component={AdminUsers} />
            <Route exact path={userPaths[1]} component={AddUser} />
          </PageHeaderLayout>
        </DashboardLayout>
      </Switch>
    </>
  );
};

export default UsersModule;
