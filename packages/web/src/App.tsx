import React from 'react';
import { hot } from 'react-hot-loader/root';

import GlobalStyle from './styles/global';

const App = () => {
  return (
    <>
      <h1>Hello Foton</h1>
      <GlobalStyle />
    </>
  );
};

export default hot(App);
