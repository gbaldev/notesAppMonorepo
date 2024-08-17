import AsyncStorage from '@react-native-async-storage/async-storage';
import NotesProvider from '../services/NotesService/provider';

const itemKey = {
  TOKEN: 'token',
  EXPIRES_AT: 'expiresAt',
};

export const isValidToken = async () => {
  const token = await AsyncStorage.getItem(itemKey.TOKEN);
  const expiresAt = await AsyncStorage.getItem(itemKey.EXPIRES_AT);
  if (token && expiresAt) {
    return new Date(Number(expiresAt)) < new Date();
  }
  return false;
};

export const setSession = (token: string, expiresAt: number) => {
  AsyncStorage.setItem(itemKey.TOKEN, token);
  AsyncStorage.setItem(itemKey.EXPIRES_AT, expiresAt.toString());
  NotesProvider.setAuthHeader(`Bearer ${token}`);
};

export const getSession = async () => {
  const idToken = await AsyncStorage.getItem(itemKey.TOKEN);
  const expiresAt = await AsyncStorage.getItem(itemKey.EXPIRES_AT);

  return {idToken, expiresAt};
};

export const clearSession = async () => {
  await AsyncStorage.setItem(itemKey.TOKEN, '');
  await AsyncStorage.setItem(itemKey.EXPIRES_AT, '');
  NotesProvider.setAuthHeader('');
};
