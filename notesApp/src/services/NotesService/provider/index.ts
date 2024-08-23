import React from 'react';
import {CommonActions} from '@react-navigation/native';
import {clearSession} from '@constants';
import AxiosImpl from '@services/axios';
import StackRoutes from '@navigation/routes';

const NotesProvider = new AxiosImpl();

export const navigationRef = React.createRef<any>();

NotesProvider.setUnauthorizedHandler(async () => {
  await clearSession();
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: StackRoutes.INITIAL}],
    }),
  );
});

export default NotesProvider;
