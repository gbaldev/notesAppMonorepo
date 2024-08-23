import React, {useCallback, useEffect, useState} from 'react';
import {User, useAuth0} from 'react-native-auth0';
import {StackActions} from '@react-navigation/native';
import {useNavigator} from '@hooks';
import {getSession, isValidToken, setSession} from '@constants';
import {InitialScreen} from '@screens';
import StackRoutes from '@navigation/routes';
import NotesProvider from '@services/NotesService/provider';

interface InitialScreenContainerProps {}

const InitialScreenContainer: React.ComponentType<
  InitialScreenContainerProps
> = () => {
  const {authorize, user, isLoading} = useAuth0();
  const [validUser, setValidUser] = useState<User | null>(null);
  const navigation = useNavigator();

  const onLogin = useCallback(async () => {
    try {
      const result = await authorize();
      if (result) {
        setSession(result.idToken, result.expiresAt);
        navigation.navigate(StackRoutes.HOME);
      }
    } catch (e) {
      console.log(e);
    }
  }, [authorize, navigation]);

  const onInit = useCallback(async () => {
    const validToken = await isValidToken();
    if (validToken) {
      const {idToken} = await getSession();
      NotesProvider.setAuthHeader(`Bearer ${idToken}`);
      navigation.dispatch(StackActions.replace(StackRoutes.HOME));
    }
  }, [navigation]);

  useEffect(() => {
    const validateUser = async () => {
      const isValid = await isValidToken();
      setValidUser(isValid ? user : null);
    };
    validateUser();
  }, [user]);

  return (
    <InitialScreen
      onLogin={onLogin}
      user={validUser}
      isLoading={isLoading}
      onInit={onInit}
    />
  );
};

export default InitialScreenContainer;
