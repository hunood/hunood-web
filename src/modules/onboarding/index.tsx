import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

// Pages
import { Onboarding } from './pages/Onboarding';

export const onboardingPaths = [
  "/onboarding"
];

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
