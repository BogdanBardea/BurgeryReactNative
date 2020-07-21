// Button Config
import Layout from '../../theme/layout';
import {StyleSheet} from 'react-native';
import Colors from '../../theme/colors';

const BUTTON_BORDER_RADIUS = 5;
const BUTTON_HEIGHT = 20;
const BUTTON_WIDTH = 20;
const BUTTON_HEIGHT_SM = 40;
const BUTTON_WIDTH_SM = Layout.SCREEN_WIDTH / 2.2;

// Button Styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Colors.primaryColor,
    // borderRadius: BUTTON_BORDER_RADIUS,
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

export default styles;
