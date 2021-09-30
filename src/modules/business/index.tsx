import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

// Pages
import SelectBusiness from './pages/SelectBusiness';

export const businessPaths = [
  "/business/select",
];

const DashboardModule: FC = () => {
  return (
    <>
      <Switch>
        <Route exact path={businessPaths[0]} component={SelectBusiness} />
      </Switch>
    </>
  );
};

export default DashboardModule;
