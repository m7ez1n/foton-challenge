import 'react-native-gesture-handler';

import Routes from './routes';

import React, {Suspense} from 'react';
import {StatusBar, ActivityIndicator} from 'react-native';

import {RelayEnvironmentProvider} from 'relay-hooks';

import environment from './relay/Environment';

import FlashMessage from 'react-native-flash-message';

const App = () => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <FlashMessage position="bottom" floating />
      <Suspense fallback={<ActivityIndicator size="large" color="#fff" />}>
        <Routes />
      </Suspense>
    </RelayEnvironmentProvider>
  );
};

export default App;
