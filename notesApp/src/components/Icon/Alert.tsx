import React from 'react';
import Svg, {G, Path, Polygon} from 'react-native-svg';
import {IconProps} from './types';

const Alert: React.FC<IconProps> = ({size = 24, color = '#000000'}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill={color}>
      <G>
        <Polygon points="16,2 0,30 32,30" fill="#E1E5E5" />
        <Polygon points="16,6.031 3.446,28 28.554,28" fill="#FDFFFF" />
        <Polygon
          points="22.625,17.625 18,13 14,13 15,23 16.001,24.001 15,24 15,26 17,28 28.554,28"
          fill="#E1E5E5"
        />
        <Polygon
          points="28,23 22.625,17.625 28.554,28 17,28 19,30 32,30"
          fill="#C4CCCC"
        />
        <Path d="M15,24h2v2h-2V24z M18,13h-4l1,10h2L18,13z" fill="#8D9999" />
      </G>
    </Svg>
  );
};

export default Alert;
