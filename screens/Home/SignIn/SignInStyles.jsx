import React from 'react';
import {StyleSheet} from 'react-native';
import Colors from '../../../theme/colors';
import Layout from '../../../theme/layout';

export const PLACEHOLDER_TEXT_COLOR = 'rgba(255, 255, 255, 0.4)';
export const INPUT_TEXT_COLOR = 'rgba(255, 255, 255, 0.87)';
export const INPUT_BORDER_COLOR = 'rgba(255, 255, 255, 0.2)';
export const INPUT_FOCUSED_BORDER_COLOR = '#F3F3F3';
export const INPUT_BACKGROUND_COLOR = '#606060';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainerStyle: {flex: 1},
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    flex: 1,
    paddingHorizontal: Layout.LARGE_PADDING,
  },
  inputContainer: {marginBottom: 7},
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  forgotPassword: {
    backgroundColor: 'transparent',
    height: 15,
    width: 130,
    paddingVertical: 17,
  },
  forgotPasswordText: {
    fontSize: 12,
    lineHeight: 15,
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
  buttonsGroup: {
    paddingTop: 23,
  },
  vSpacer: {
    height: 15,
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
  vspace17: {
    height: 17,
  },
});
export default styles;
