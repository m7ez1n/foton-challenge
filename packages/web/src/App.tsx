import React from 'react';
import { hot } from 'react-hot-loader/root';

import AuthForm from './modules/auth/AuthForm';
import GlobalStyle from './styles/global';

const App = () => {
  return (
    <>
      <AuthForm />
      <GlobalStyle />
    </>
  );
};

export default hot(App);
