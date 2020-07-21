import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/Home/Home';
import Register from '../../screens/Register/Register';
import Colors from '../../theme/colors';
import Logo from '../Logo/Logo';
import Menu from '../../screens/Menu/Menu';
import Checkout from '../../screens/Checkout/Checkout';

const Stack = createStackNavigator();

function HomeNavigation() {
  const [isAuth, setIsAuth] = useState('');

  const getTokenFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('auth');
      if (value !== null) {
        setIsAuth(value);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTokenFromStorage()
      .then(() => console.log('Token got'))
      .catch(err => console.log(err));
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={isAuth == 'true' ? 'Menu' : 'Home'}
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.headerBackground,
          height: 100,
        },
        headerTintColor: Colors.white,
        headerTitleAlign: 'center',
        headerTitle: () => <Logo size={50} />,
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{
          headerStyle: {
            backgroundColor: Colors.headerBackground,
            height: 100,
            elevation: 0,
          },
        }}
      />
      <Stack.Screen name="Checkout" component={Checkout} />
    </Stack.Navigator>
  );
}

export default HomeNavigation;
