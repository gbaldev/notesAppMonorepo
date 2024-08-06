import {NativeStackNavigationProp} from '@react-navigation/native-stack';

enum StackRoutes {
  INITIAL = 'INITIAL',
  HOME = 'HOME',
}

export type StackRoutesList = {
  [StackRoutes.INITIAL]: undefined;
  [StackRoutes.HOME]: undefined;
};

export type RootStackNavigationProp<T extends keyof StackRoutesList> =
  NativeStackNavigationProp<StackRoutesList, T>;

export default StackRoutes;
