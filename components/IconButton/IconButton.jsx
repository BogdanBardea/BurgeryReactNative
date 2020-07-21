// import dependencies
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Feather as FAIcon} from '@expo/vector-icons';

// import components
import {ButtonText} from '../CustomText/CustomText';

// import colors, layout
import Styles from './IconButton.styles';

// Button
const Button = ({
  onPress,
  disabled,
  activeOpacity = 0.85,
  size,
  buttonStyle,
  color,
  name,
  backgroundColor,
  style,
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    activeOpacity={activeOpacity}
    style={[
      Styles.container,
      backgroundColor && {backgroundColor},
      Styles.defaultContainer,
      disabled && Styles.disabled,
      buttonStyle,
      size && {width: size, height: size},
      style && style,
    ]}>
    <FAIcon name={name} size={size} color={color} />
  </TouchableOpacity>
);

export default Button;
