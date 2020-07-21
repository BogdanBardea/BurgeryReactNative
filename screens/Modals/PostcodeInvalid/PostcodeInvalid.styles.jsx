import React from 'react';
import {StyleSheet} from 'react-native';
import Colors from 'react-native/Libraries/NewAppScreen/components/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    top: 120,
    marginHorizontal: 15,
    marginBottom: 120,
  },
  card: {
    backgroundColor: '#202020',
    borderRadius: 5,
    width: '100%',
    flex: 1,
    marginBottom: 90,
  },
  iconContainer: {
    alignItems: 'flex-end',
    margin: 15,
    marginBottom: 1,
  },
});

export default styles;
