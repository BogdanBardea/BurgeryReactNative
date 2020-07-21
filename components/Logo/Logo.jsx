import React from 'react';
import Styles from './LogoStyles';
import {Image} from 'react-native';

function Logo({logoStyle, size}) {
  return (
    <Image
      source={require('../../assets/logo.png')}
      style={[
        Styles.smallImg,
        size === 'medium' && Styles.mediumImg,
        size === 'large' && Styles.largeImg,
        typeof size === 'number' && {width: size, height: size},
        logoStyle && logoStyle,
      ]}
      resizeMode="contain"
    />
  );
}
export default Logo;
