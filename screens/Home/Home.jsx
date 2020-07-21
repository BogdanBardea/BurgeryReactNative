import React, { useEffect, useState } from 'react';
import Styles from './HomeStyles';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import Logo from '../../components/Logo/Logo';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './Welcome/Welcome';
import SignIn from './SignIn/SignIn';
import Postcode from './Postcode/Postcode';
import ResetPassword from './ResetPassword/ResetPassword';
import EmailSent from './EmailSent/EmailSent';
import OrderDetails from './OrderDetails/OrderDetails';
import Delivery from '../Delivery/Delivery';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();
// const AuthStack = createStackNavigator({
//   Home: Home
// });

export default function Home() {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');

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
    getTokenFromStorage();
  }, [getTokenFromStorage]);

  useEffect(() => {
    if (isAuth == 'true') navigation.replace('Postcode');
  }, [isAuth]);

  return (
    <ImageBackground
      source={require('../../assets/bg.png')}
      style={{
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
      }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.5)"
        />
        <View style={Styles.logoContainer}>
          <Logo size={100} />
        </View>
        <View style={Styles.headerTextContainer}>
          <Text style={Styles.headerText}>{title}</Text>
          <Text style={Styles.subHeaderText}>{subTitle}</Text>
        </View>
        <View style={Styles.buttonsGroup}>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
              cardOverlayEnabled: false,
              cardStyle: { backgroundColor: 'transparent' },
              // header: ({scene, previous, navigation}) => {
              //   const {options} = scene.descriptor;
              //   const title = options.title;
              //   const subTitle = options.subTitle;
              //   return (
              //     <View style={Styles.headerTextContainer}>
              //       <Text style={Styles.headerText}>{title}</Text>
              //       <Text style={Styles.subHeaderText}>{subTitle}</Text>
              //     </View>
              //   );
              // },
            }}>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{
                headerShown: false,
              }}
              initialParams={{
                setTitle,
                setSubTitle,
              }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
              initialParams={{
                setTitle,
                setSubTitle,
              }}
            />
            <Stack.Screen
              name="Postcode"
              component={Postcode}
              options={{ headerShown: false }}
              initialParams={{
                setTitle,
                setSubTitle,
              }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{ headerShown: false }}
              initialParams={{
                setTitle,
                setSubTitle,
              }}
            />
            <Stack.Screen
              name="EmailSent"
              component={EmailSent}
              options={{ headerShown: false }}
              initialParams={{
                setTitle,
                setSubTitle,
              }}
            />
            <Stack.Screen
              name="OrderDetails"
              component={OrderDetails}
              options={{ headerShown: false }}
              initialParams={{
                setTitle,
                setSubTitle,
              }}
            />
          </Stack.Navigator>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
