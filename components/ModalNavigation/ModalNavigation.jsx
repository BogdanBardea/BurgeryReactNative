import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainNavigation from '../MainNavigation/MainNavigation';
import OrderHistoryDetails from '../../screens/Modals/OrderHistoryDetails/OrderHistoryDetails';
import NewAdress from '../../screens/Modals/NewAdress/NewAdress';
import MenuOptions from '../../screens/Modals/MenuOptions/MenuOptions';
import CouponModal from '../../screens/Modals/CouponModal/CouponModal';
import ChangePassword from '../../screens/Modals/ChangePassword/ChangePassword';
import PostcodeInvalid from '../../screens/Modals/PostcodeInvalid/PostcodeInvalid';

const Stack = createStackNavigator();

function ModalNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
        headerShown: false,
      }}
      mode="modal"
      initialRouteName="Main">
      <Stack.Screen name="Main" component={MainNavigation} />
      <Stack.Screen
        name="OrderHistoryDetails"
        component={OrderHistoryDetails}
      />
      <Stack.Screen name="NewAdress" component={NewAdress} />
      <Stack.Screen name="MenuOptions" component={MenuOptions} />
      <Stack.Screen name="CouponModal" component={CouponModal} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="PostcodeInvalid" component={PostcodeInvalid} />
    </Stack.Navigator>
  );
}
export default ModalNavigation;
