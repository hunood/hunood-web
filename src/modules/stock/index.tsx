import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { DashboardLayout, PageHeaderLayout } from 'components/layouts';
import { t } from 'i18n';

// Pages
import AdminStock from './pages/AdminStock';
import AddProductStock from './pages/AddProductStock';
import EntryExitStock from './pages/EntryExitStock';

export const stockPaths = [
  "/stock",
  "/stock/entry-exit",
  "/stock/add-product"
];

const tabs = [
  { nome: t("stock:tabs.consultar-estoque"), route: stockPaths[0] },
  { nome: t("stock:tabs.entrada-saida"), route: stockPaths[1] },
  { nome: t("stock:tabs.cadastro-produto"), route: stockPaths[2] }
];

const StockModule: FC = () => {
  return (
    <>
      <Switch>
        <DashboardLayout>
          <PageHeaderLayout tabs={tabs}>
            <Route exact path={stockPaths[0]} component={AdminStock} />
            <Route exact path={stockPaths[1]} component={EntryExitStock} />
            <Route exact path={stockPaths[2]} component={AddProductStock} />
          </PageHeaderLayout>
        </DashboardLayout>
      </Switch>
    </>
  );
};

export default StockModule;
