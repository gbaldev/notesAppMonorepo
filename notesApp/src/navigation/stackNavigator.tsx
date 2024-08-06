import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StackRoutes from './routes';
import InitialScreenContainer from '../containers/InitialScreen';
import HomeScreenContainer from '../containers/HomeScreen';
import {navigationRef} from '../services/NotesService/provider';

const Stack = createNativeStackNavigator();

interface StackNavigatorProps {}

const StackNavigator: React.ComponentType<StackNavigatorProps> = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name={StackRoutes.INITIAL}
          component={InitialScreenContainer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={StackRoutes.HOME}
          component={HomeScreenContainer}
          options={{headerShown: false, animation: 'fade_from_bottom'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
