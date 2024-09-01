import 'react-native-reanimated';
import React from 'react';
import {Auth0Provider} from 'react-native-auth0';
import StackNavigator from './src/navigation/stackNavigator';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './src/constants/QueryClient';
import {RootSiblingParent} from 'react-native-root-siblings';
import {AUTH0_DOMAIN, AUTH0_CLIENT_ID} from '@env';

const App = () => {
  return (
    <RootSiblingParent>
      <QueryClientProvider client={queryClient}>
        <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
          <StackNavigator />
        </Auth0Provider>
      </QueryClientProvider>
    </RootSiblingParent>
  );
};

export default App;
