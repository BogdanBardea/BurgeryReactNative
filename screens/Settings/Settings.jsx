import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EditProfile from './EditProfile/EditProfile';
import MainMenu from './MainMenu/MainMenu';
import {Image} from 'react-native';
import Colors from '../../theme/colors';
import Logo from '../../components/Logo/Logo';

const Stack = createStackNavigator();

function Settings() {
  return (
    <Stack.Navigator
      initialRouteName="MainMenu"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.headerBackground,
          height: 100,
        },
        headerTintColor: Colors.white,
        headerTitleAlign: 'center',
        headerTitle: () => <Logo size={50} />,
      }}>
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="MainMenu" component={MainMenu} />
    </Stack.Navigator>
  );
}

export default Settings;
