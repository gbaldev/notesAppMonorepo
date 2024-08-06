import React from 'react';
import AxiosImpl from '../../axios';
import {CommonActions} from '@react-navigation/native';
import StackRoutes from '../../../navigation/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotesProvider = new AxiosImpl();

export const navigationRef = React.createRef<any>();

NotesProvider.setUnauthorizedHandler(async () => {
  await AsyncStorage.setItem('token', '');
  await AsyncStorage.setItem('expiresAt', '');
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: StackRoutes.INITIAL}],
    }),
  );
});

export default NotesProvider;
