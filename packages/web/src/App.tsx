import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Router } from 'react-router-dom';

import { createBrowserHistory } from 'history';

import Routes from './routes/index';
import GlobalStyle from './styles/global';

import { ScreenLoader } from './modules/common';

const App = () => {
  const history = createBrowserHistory();
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
