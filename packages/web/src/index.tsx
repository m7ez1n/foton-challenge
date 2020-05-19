import React from 'react';
import 'regenerator-runtime/runtime';
import 'core-js/stable';
import ReactDOM from 'react-dom';

import App from './App';

import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { ToastContainer } from 'react-toastify';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';

import { Environment } from '@foton-challenge/relay';

const rootEl = document.getElementById('root');

if (rootEl) {
  ReactDOM.render(
    <RelayEnvironmentProvider environment={Environment}>
      <App />
      <ToastContainer />
    </RelayEnvironmentProvider>,
    rootEl,
  );
} else {
  throw new Error('wrong rootEl');
}
