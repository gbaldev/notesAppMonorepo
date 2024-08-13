import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import LogOut from './LogOut';
import Add from './Add';
import Edit from './Edit';
import Fire from './Fire';
import Bin from './Bin';
import CloudUpload from './CloudUpload';
import Alert from './Alert';

export const IconMap = {
  logOut: LogOut,
  edit: Edit,
  add: Add,
  fire: Fire,
  bin: Bin,
  cloudUpload: CloudUpload,
  alert: Alert,
};

interface Props {
  style?: StyleProp<ViewStyle>;
  name: keyof typeof IconMap;
  size?: number;
  focused?: boolean;
  color?: string;
  horizontal?: boolean;
}

const Icon: React.FC<Props> = ({
  style,
  name,
  size = 24,
  focused = true,
  color,
  ...props
}) => {
  const IconComponent = IconMap[name];

  return (
    <IconComponent
      style={style}
      size={size}
      focused={focused}
      color={color}
      {...props}
    />
  );
};

export default Icon;
