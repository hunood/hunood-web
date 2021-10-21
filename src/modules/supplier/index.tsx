import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { DashboardLayout, PageHeaderLayout } from 'components/layouts';
import { t } from 'i18n';

// Pages
import AdminSupplier from './pages/AdminSupplier';
import AddSupplier from './pages/AddSupplier';

export const supplierPaths = [
  "/supplier",
  "/supplier/add"
];

const tabs = [
  { nome: t("supplier:tabs.consultar-fornecedor"), route: supplierPaths[0] },
  { nome: t("supplier:tabs.cadastrar-fornecedor"), route: supplierPaths[1] }
];

const SupplierModule: FC = () => {
  return (
    <>
      <Switch>
        <DashboardLayout>
          <PageHeaderLayout tabs={tabs}>
            <Route exact path={supplierPaths[0]} component={AdminSupplier} />
            <Route exact path={supplierPaths[1]} component={AddSupplier} />
          </PageHeaderLayout>
        </DashboardLayout>
      </Switch>
    </>
  );
};

export default SupplierModule;
