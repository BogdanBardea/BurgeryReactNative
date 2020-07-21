import React from 'react';
import {StyleSheet} from 'react-native';
import Colors from '../../../theme/colors';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 24,
  },
  headerTextContainer: {
    flexShrink: 1,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 30,
    marginTop: 20,
  },
  optionContainer: {},
  headerText: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 25,
    lineHeight: 30,
    color: '#FFF',
  },
  buttonStyle: {
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    width: '100%',
    paddingLeft: 20,
  },
});
export default styles;
