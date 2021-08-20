import { DashboardLayout, PageHeaderLayout } from 'components/layouts';
import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

// Routes
import AdminUsers from './pages/AdminUsers';
import AddUser from './pages/AddUser';

const UsersModule: FC = () => {
  return (
    <>
      <DashboardLayout>
        <Switch>
          <PageHeaderLayout
            tabs={[
              { nome: 'Gestão de usuários', route: '/users' },
              { nome: 'Adicionar', route: '/users/add' }
            ]}
          >
            <Route exact path="/users" component={AdminUsers} />
            <Route exact path="/users/add" component={AddUser} />
          </PageHeaderLayout>
        </Switch>
      </DashboardLayout>
    </>
  );
};

export default UsersModule;