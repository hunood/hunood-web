import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

// Routes
import { Onboarding } from './pages/Onboarding';

const OnboardingModule: FC = () => {
  return (
    <>
      <Switch>
        <Route exact path="/onboarding" component={Onboarding} />
      </Switch>
    </>
  );
};

export default OnboardingModule;