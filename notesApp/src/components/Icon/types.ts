import {StyleProp, ViewStyle} from 'react-native';

export interface IconProps {
  style?: StyleProp<ViewStyle>;
  size?: number;
  focused?: boolean;
  color?: string;
  horizontal?: boolean;
}
