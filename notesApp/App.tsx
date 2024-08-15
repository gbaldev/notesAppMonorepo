import React, {useEffect} from 'react';
import {Auth0Provider} from 'react-native-auth0';
import StackNavigator from './src/navigation/stackNavigator';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './src/constants/QueryClient';
import NetInfo from '@react-native-community/netinfo';

const App = () => {
  useEffect(() => {
    NetInfo.addEventListener(event => {
      console.log('Net state changed');
      if (event.isInternetReachable) {
        console.log(
          'fron listener, is recheable?: ',
          event.isInternetReachable,
        );
      } else if (event.isInternetReachable !== null) {
        console.log(
          'fron listener, is recheable?: ',
          event.isInternetReachable,
        );
      }
    });
  }, []);
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
