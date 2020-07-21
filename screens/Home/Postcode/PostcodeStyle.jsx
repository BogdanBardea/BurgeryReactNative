import React from 'react';
import {StyleSheet, I18nManager, Platform} from 'react-native';
import Colors from '../../../theme/colors';

const isRTL = I18nManager.isRTL;

const styles = StyleSheet.create({
  codeContainer: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    width: 50,
    height: 50,
    borderRadius: 180,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.inputBackground,
  },
  digit: {
    fontFamily: Platform.OS === 'ios' ? 'SF Compact Display' : '',
    fontWeight: '900',
    fontSize: 25,
    color: Colors.primaryColor,
  },
  textInput: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.01,
    fontSize: 1,
    ...Platform.select({
      web: {
        width: '100%',
        // Fix iOS Safary aggressive zoom
        fontSize: 16,
      },
    }),
  },
  infoContainer: {
    flex: 1,
    marginTop: 37,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  infoText: {
    color: Colors.primaryText,
    fontWeight: '200',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 42,
  },
  confirmContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
