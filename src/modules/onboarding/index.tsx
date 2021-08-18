import { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Routes
import { Onboarding } from './pages/Onboarding';

const OnboardingModule: FC = () => {
  return (
    <>
      <Switch>
        <Route exact path="/onboarding" component={Onboarding} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
};

export default OnboardingModule;