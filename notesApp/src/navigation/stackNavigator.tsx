import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from '@services/NotesService/provider';
import {HomeScreenContainer, InitialScreenContainer} from '@containers';
import StackRoutes from './routes';

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
