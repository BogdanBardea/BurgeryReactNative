import React from 'react';
import {Platform, StatusBar, StyleSheet} from 'react-native';

function getStatusBarHeight() {
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight;
  }
  return 0;
}

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    top: getStatusBarHeight(),
  },
  headerTextContainer: {
    flex: 4.2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 43,
    textAlign: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 25,
    lineHeight: 30,
    color: '#fff',
    fontFamily: 'serif',
    paddingTop: 75,
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
    lineHeight: 19,
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
  },
  buttonsGroup: {
    flex: 5,
    paddingHorizontal: 32,
    width: '100%',
  },
  vspace5: {
    height: 5,
  },
  vspace17: {
    height: 17,
  },
  vspace32: {
    height: 32,
  },
});

export default styles;
