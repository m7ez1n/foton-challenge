import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Router } from 'react-router-dom';

import Routes from './routes/index';
import GlobalStyle from './styles/global';
import history from './routes/history';

import { ScreenLoader } from './modules/common';

const App = () => {
  return (
    <Router history={history}>
      <React.Suspense fallback={<ScreenLoader />}>
        <Routes />
        <GlobalStyle />
      </React.Suspense>
    </Router>
  );
};

export default hot(App);
