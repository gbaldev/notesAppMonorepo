import React, {useCallback, useEffect, useState} from 'react';
import InitialScreen from '../../screens/InitialScreen';
import {User, useAuth0} from 'react-native-auth0';
import {StackActions, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import StackRoutes, {StackRoutesList} from '../../navigation/routes';
import NotesProvider from '../../services/NotesService/provider';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface InitialScreenContainerProps {}

const InitialScreenContainer: React.ComponentType<
  InitialScreenContainerProps
> = () => {
  const {authorize, user, isLoading, getCredentials} = useAuth0();
  const [validUser, setValidUser] = useState<User | null>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<StackRoutesList>>();

  const onLogin = useCallback(async () => {
    try {
      const result = await authorize();
      if (result) {
        await AsyncStorage.setItem('token', result.idToken);
        await AsyncStorage.setItem('expiresAt', result.expiresAt.toString());
        NotesProvider.setAuthHeader(`Bearer ${result.idToken}`);
        navigation.navigate(StackRoutes.HOME);
      }
    } catch (e) {
      console.log(e);
    }
  }, [authorize, navigation]);

  const onInit = useCallback(async () => {
    const creds = await getCredentials();
    if (validUser && creds) {
      NotesProvider.setAuthHeader(`Bearer ${creds.idToken}`);
      navigation.dispatch(StackActions.replace(StackRoutes.HOME));
    }
  }, [getCredentials, navigation, validUser]);

  useEffect(() => {
    const validateUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const expiresAt = await AsyncStorage.getItem('expiresAt');
      if (token && expiresAt) {
        const isTokenValid = new Date(Number(expiresAt)) < new Date();
        setValidUser(isTokenValid ? user : null);
      }
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
