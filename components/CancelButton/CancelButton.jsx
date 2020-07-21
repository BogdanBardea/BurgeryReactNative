// import dependencies
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FontAwesome as FAIcon} from '@expo/vector-icons';

// import components
import {ButtonText} from '../CustomText/CustomText';

// import colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';

// Button Config
const BUTTON_BORDER_RADIUS = 5;
const BUTTON_HEIGHT = 45;
const BUTTON_WIDTH = 266;
const BUTTON_HEIGHT_SM = 40;
const BUTTON_WIDTH_SM = Layout.SCREEN_WIDTH / 2.2;

// Button Styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7D7D7D',
    borderRadius: BUTTON_BORDER_RADIUS,
  },
  defaultContainer: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
  },
  smallContainer: {
    maxWidth: BUTTON_WIDTH_SM,
    height: BUTTON_HEIGHT_SM,
    paddingHorizontal: 16,
  },
  disabled: {
    opacity: 0.72,
  },
  socialIconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: 52,
  },
  outlined: {
    borderWidth: 2,
    borderColor: Colors.primaryColor,
    backgroundColor: 'transparent',
  },
  rounded: {
    borderRadius: BUTTON_HEIGHT / 2,
  },
  title: {
    color: Colors.onPrimaryColor,
  },
  outlinedTitle: {
    color: Colors.primaryColor,
  },
});

// Button
const CancelButton = ({
  onPress,
  disabled,
  activeOpacity = 0.85,
  height,
  buttonStyle,
  textStyle,
  borderRadius,
  borderColor,
  color,
  iconColor,
  socialIconName,
  small,
  title,
  titleColor,
  rounded,
  outlined,
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    activeOpacity={activeOpacity}
    style={[
      styles.container,
      borderRadius && {borderRadius},
      color && {backgroundColor: color},
      styles.defaultContainer,
      height && {height},
      small && styles.smallContainer,
      rounded && styles.rounded,
      outlined && styles.outlined,
      height && rounded && {borderRadius: height / 2},
      borderColor && {borderColor},
      disabled && styles.disabled,
      buttonStyle,
    ]}>
    {socialIconName && (
      <View style={styles.socialIconContainer}>
        <FAIcon name={socialIconName} size={20} color={iconColor} />
      </View>
    )}
    <ButtonText
      style={[
        styles.title,
        outlined && styles.outlinedTitle,
        titleColor && {color: titleColor},
        textStyle,
      ]}>
      {title || 'Button'}
    </ButtonText>
  </TouchableOpacity>
);

export default CancelButton;
