import React from 'react';
import { Switch, Route } from 'react-router-dom';

const SignIn = React.lazy(() => import('../modules/auth/SignIn'));
const SignUp = React.lazy(() => import('../modules/auth/SignUp'));
const Header = React.lazy(() => import('../modules/common/Header'));

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/todo" component={Header} />
    </Switch>
  );
};

export default Routes;
