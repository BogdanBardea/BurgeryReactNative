import React from 'react';
import {I18nManager, StyleSheet} from 'react-native';
import Colors from '../../../theme/colors';

const isRTL = I18nManager.isRTL;
export const INPUT_HEIGHT = 44;
export const INPUT_WIDTH = '100%';

// UnderlineTextInput Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    width: INPUT_WIDTH,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 0,
    height: INPUT_HEIGHT,
    fontSize: 16,
    color: Colors.primaryText,
    textAlign: isRTL ? 'right' : 'left',
    marginLeft: 13,
  },
});

export default styles;
