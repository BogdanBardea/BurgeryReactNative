import React from 'react';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import Colors from '../../theme/colors';

function getStatusBarHeight() {
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight;
  }
  return 0;
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: Colors.headerBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    top: getStatusBarHeight() / 2,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  titlePage: {
    fontWeight: 'bold',
    fontSize: 25,
    lineHeight: 30,
    color: '#fff',
    marginTop: 30,
    marginLeft: 21,
  },
});

export default styles;
