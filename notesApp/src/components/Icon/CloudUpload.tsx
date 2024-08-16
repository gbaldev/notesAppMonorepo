import React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {IconProps} from './types';

const CloudUpload: React.FC<IconProps> = ({size = 24, color = '#000000'}) => {
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24" fill="none">
      <G id="SVGRepo_bgCarrier" strokeWidth={1.5} />
      <G
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <G id="SVGRepo_iconCarrier">
        <Path
          d="M21.96 13.4199C21.8233 12.3214 21.326 11.2993 20.546 10.5139C19.766 9.72844 18.7474 9.22406 17.65 9.07977C17.1768 7.75468 16.2529 6.63824 15.0399 5.92523C13.8269 5.21223 12.4019 4.94801 11.0139 5.17914C9.62597 5.41026 8.36341 6.12202 7.4469 7.18964C6.53039 8.25726 6.01826 9.61302 6 11.02C4.93913 11.02 3.92172 11.4412 3.17157 12.1913C2.42142 12.9415 2 13.9591 2 15.02C2 16.0808 2.42142 17.0982 3.17157 17.8483C3.92172 18.5985 4.93913 19.02 6 19.02H12"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
        />
        <Path
          d="M18.7793 23V15"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
        />
        <Path
          d="M15.5801 18.2L18.7801 15L21.98 18.2"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
        />
      </G>
    </Svg>
  );
};

export default CloudUpload;
