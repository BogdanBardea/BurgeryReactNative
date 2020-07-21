import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ModalNavigation from './components/ModalNavigation/ModalNavigation';

console.disableYellowBox = true;

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <NavigationContainer>
        <ModalNavigation />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
