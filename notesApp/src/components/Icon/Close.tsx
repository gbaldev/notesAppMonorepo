import React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {IconProps} from './types';

const Close: React.FC<IconProps> = ({size = 24, color = '#000000'}) => {
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24" fill="none">
      <G id="SVGRepo_bgCarrier" stroke-width="0" />
      <G
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <G id="SVGRepo_iconCarrier">
        <Path
          d="M15 9.00004L9 15M15 15L9 9.00004M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
    </Svg>
  );
};

export default Close;
