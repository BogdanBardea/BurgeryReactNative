import {Platform, StyleSheet} from 'react-native';
import Layout from '../../../theme/layout';
import Colors from '../../../theme/colors';

export const AVATAR_SIZE = 100;
export const IOS = Platform.OS === 'ios';
export const CAMERA_ICON = IOS ? 'ios-camera' : 'md-camera';
export const PLACEHOLDER_TEXT_COLOR = 'rgba(0, 0, 0, 0.4)';
export const INPUT_TEXT_COLOR = 'rgba(255, 255, 255, 0.87)';
export const INPUT_BORDER_COLOR = '#F3F3F3';
export const INPUT_FOCUSED_BORDER_COLOR = '#fff';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  contentContainerStyle: {
    flex: 1,
    marginTop: 25,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  form: {
    paddingHorizontal: Layout.LARGE_PADDING,
  },
  inputContainer: {
    marginBottom: 1,
    marginTop: 10,
    height: 28,
    paddingLeft: 0,
  },
  vSpacer: {
    height: 16,
  },
  vspace17: {
    height: 17,
  },

  fieldInformations: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    display: 'flex',
    alignItems: 'center',
    color: '#858585',
    marginTop: 16,
    textTransform: 'uppercase',
  },

  buttonContainer: {
    paddingVertical: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonsGroup: {
    paddingTop: 23,
  },
  separator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 64,
    height: 1,
    backgroundColor: INPUT_BORDER_COLOR,
  },

  orText: {
    top: -2,
    paddingHorizontal: 8,
    color: PLACEHOLDER_TEXT_COLOR,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  termsContainer: {
    flexDirection: 'row',
  },
  footerText: {
    fontWeight: '300',
    fontSize: 13,
    color: Colors.primaryText,
  },
  footerLink: {
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 10,
  },

  checkboxtext: {
    fontStyle: 'normal',
    fontWeight: '200',
    fontSize: 12,
    lineHeight: 14,
    display: 'flex',
    color: '#FFFFFF',
  },

  checkbox: {
    display: 'flex',
  },

  checkboxContainter: {
    display: 'flex',
    flexDirection: 'row',
  },

  headerText: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 25,
    lineHeight: 30,
    color: '#FFF',
  },
  subHeaderText: {
    fontSize: 16,
    lineHeight: 19,
    color: '#fff',
    opacity: 0.8,
  },
});

export default styles;
