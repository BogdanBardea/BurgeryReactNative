import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../../theme/colors';
import Logo from '../Logo/Logo';
import MyOrders from '../../screens/MyOrders/MyOrders';
import Delivery from '../../screens/Delivery/Delivery';
import { HeaderBackButton } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

function HomeNavigation() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="MyOrders"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.headerBackground,
          height: 100,
        },
        headerTintColor: Colors.white,
        headerTitleAlign: 'center',
        headerTitle: () => <Logo size={50} />,
      }}>
      <Stack.Screen name="MyOrders" component={MyOrders} />
      <Stack.Screen
        name="Delivery"
        component={Delivery}
        options={{
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                if (navigation.canGoBack()) navigation.pop();
                navigation.replace('MyOrders');
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigation;
