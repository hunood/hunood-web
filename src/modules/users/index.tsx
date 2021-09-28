import { DashboardLayout, PageHeaderLayout } from 'components/layouts';
import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { t } from 'i18n';

// Pages
import AdminUsers from './pages/AdminUsers';
import AddUser from './pages/AddUser';

export const userPaths = [
  "/users",
  "/users/add"
];

const tabs = [
  { nome: t("users:tabs.gestao-usuarios"), route: '/users' },
  { nome: t("users:tabs.associacao"), route: '/users/add' }
];

const UsersModule: FC = () => {
  return (
    <>
      <Switch>
        <DashboardLayout>
          <PageHeaderLayout tabs={tabs}>
            <Route exact path="/users" component={AdminUsers} />
            <Route exact path="/users/add" component={AddUser} />
          </PageHeaderLayout>
        </DashboardLayout>
      </Switch>
    </>
  );
};

export default UsersModule;
