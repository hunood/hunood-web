import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { DashboardLayout, PageHeaderLayout } from 'components/layouts';
import { t } from 'i18n';

// Pages
import AdminStock from './pages/AdminStock';
import AddStock from './pages/AddStock';

export const stockPaths = [
  "/stock",
  "/stock/add"
];

const tabs = [
  { nome: t("stock:tabs.consultar-inventario"), route: '/stock' },
  { nome: t("stock:tabs.entrada"), route: '/stock/add' }
];

const StockModule: FC = () => {
  return (
    <>
      <Switch>
        <DashboardLayout>
          <PageHeaderLayout tabs={tabs}>
            <Route exact path="/stock" component={AdminStock} />
            <Route exact path="/stock/add" component={AddStock} />
          </PageHeaderLayout>
        </DashboardLayout>
      </Switch>
    </>
  );
};

export default StockModule;
