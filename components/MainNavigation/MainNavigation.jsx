import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from '../../screens/Settings/Settings';
import Colors from '../../theme/colors';
import { Feather as Icon } from '@expo/vector-icons';
import HomeNavigation from '../HomeNavigation/HomeNavigation';
import MyOrdersNavigation from '../MyOrdersNavigation/MyOrdersNavigation';

const Tab = createBottomTabNavigator();

function MainNavigation() {

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'HomeNavigation') {
            iconName = 'home';
          } else if (route.name === 'MyOrdersNavigation') {
            iconName = 'menu';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.primaryColor,
        inactiveTintColor: Colors.white,
        showLabel: false,
        keyboardHidesTabBar: true,
        style: {
          backgroundColor: Colors.black,
        },
      }}>
      <Tab.Screen name="HomeNavigation" component={HomeNavigation} />
      <Tab.Screen name="MyOrdersNavigation" component={MyOrdersNavigation} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default MainNavigation;
