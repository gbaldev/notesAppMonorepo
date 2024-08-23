import 'react-native-reanimated';
import React from 'react';
import {Auth0Provider} from 'react-native-auth0';
import StackNavigator from './src/navigation/stackNavigator';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './src/constants/QueryClient';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Auth0Provider
        domain={'dev-zlbc32xylykj6yh1.us.auth0.com'}
        clientId={'3Swp6OHMb2757cMViqw1hPHp1j3lAE3t'}>
        <StackNavigator />
      </Auth0Provider>
    </QueryClientProvider>
  );
};

export default App;
