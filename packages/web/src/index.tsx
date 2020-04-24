import React from 'react';
import 'regenerator-runtime/runtime';
import 'core-js/stable';
import ReactDOM from 'react-dom';
import App from './App';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

import { Environment } from '@foton-challenge/relay';

const rootEl = document.getElementById('root');

if (rootEl) {
  ReactDOM.render(
    <RelayEnvironmentProvider environment={Environment}>
      <App />
    </RelayEnvironmentProvider>,
    rootEl,
  );
} else {
  throw new Error('wrong rootEl');
}
