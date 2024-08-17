import React, {useCallback, useEffect, useState} from 'react';
import InitialScreen from '../../screens/InitialScreen';
import {User, useAuth0} from 'react-native-auth0';
import {StackActions, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import StackRoutes, {StackRoutesList} from '../../navigation/routes';
import NotesProvider from '../../services/NotesService/provider';
import {
  getSession,
  isValidToken,
  setSession,
} from '../../constants/LocalStorage';

interface InitialScreenContainerProps {}

const InitialScreenContainer: React.ComponentType<
  InitialScreenContainerProps
> = () => {
  const {authorize, user, isLoading} = useAuth0();
  const [validUser, setValidUser] = useState<User | null>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<StackRoutesList>>();

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
