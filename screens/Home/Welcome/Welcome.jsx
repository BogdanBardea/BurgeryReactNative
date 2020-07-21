import React, { useState, useEffect } from 'react';
import Button from '../../../components/Button/Button';
import Colors from '../../../theme/colors';
import { View, YellowBox, Platform, Text } from 'react-native';
import Styles from '../HomeStyles';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Facebook from 'expo-facebook';
import * as GoogleSignIn from 'expo-google-sign-in';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import axios from 'axios';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

export default function Welcome({ route }) {
  const navigation = useNavigation();
  // Facebook Login begin
  // const [isLoggedin, setLoggedinStatus] = useState(false);
  // const [userData, setUserData] = useState(null);
  // const [isImageLoading, setImageLoadStatus] = useState(false);

  // const facebookLogIn = async () => {
  //   try {
  //     const {
  //       type,
  //       token,
  //       expires,
  //       permissions,
  //       declinedPermissions,
  //       // number 897285013968583 - need to be changed -https://developers.facebook.com/apps/
  //       // insert display name and contact email
  //       // go to settings > Basic - scroll down and select the platform
  //       // add "rRW++LUjmZZ+58EbN5DVhGAnkX4=" this key hash
  //     } = await Facebook.logInWithReadPermissionsAsync('897285013968583', {
  //       permissions: ['public_profile'],
  //     });
  //     if (type === 'success') {
  //       // Get the user's name using Facebook's Graph API
  //       fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`)
  //         .then(response => response.json())
  //         .then(data => {
  //           setLoggedinStatus(true);
  //           setUserData(data);
  //         })
  //         .catch(e => console.log(e))
  //     } else {
  //       // type === 'cancel'
  //     }
  //   } catch ({ message }) {
  //     alert(`Facebook Login Error: ${message}`);
  //   }
  // }

  // const logoutFacebook = () => {
  //   setLoggedinStatus(false);
  //   setUserData(null);
  //   setImageLoadStatus(false);
  // }

  // // login google begin
  // const [user, setUser] = useState({});

  // const initAsync = async () => {
  //   await GoogleSignIn.initAsync({
  //     clientId: '<YOUR_IOS_CLIENT_ID>',
  //   });
  //   syncUserWithStateAsync();
  // };

  // const syncUserWithStateAsync = async () => {
  //   const user = await GoogleSignIn.signInSilentlyAsync();
  //   setUser({ user });
  // };

  // const signOutAsync = async () => {
  //   await GoogleSignIn.signOutAsync();
  //   setUser({ user: null });
  // };

  // const signInAsync = async () => {
  //   try {
  //     await GoogleSignIn.askForPlayServicesAsync();
  //     const { type, user } = await GoogleSignIn.signInAsync();
  //     if (type === 'success') {
  //       syncUserWithStateAsync();
  //     }
  //   } catch ({ message }) {
  //     alert('login: Error:' + message);
  //   }
  // };

  // init login
  // useEffect(() => {
  //   initAsync();
  // }, [initAsync])

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);

  const setPushNotificationFn = () => {
    axios.post('http://burgery.online/api/add_expo_token', {
      expoPushToken: expoPushToken,
    })
      .then((res) => {
        console.log('notification are :', res);
        // setPushNotification(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
    Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeAllNotificationListeners();
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let pushToken;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Geen token ontvangen voor de pushnotification!');
        return;
      }
      pushToken = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(pushToken);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return pushToken;
  }

  const clearAsyncStorage = async () => {
    await AsyncStorage.clear();
  };

  const isFocused = useIsFocused();
  // TODO fix this hack
  if (isFocused) {
    route.params.setTitle('Welkom bij The Burgery');
    route.params.setSubTitle('Kies hoe u wilt inloggen.');
  } else {
    return <View />;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        buttonStyle={{ backgroundColor: Colors.primaryColor }}
        onPress={() => {
          setPushNotificationFn();
          navigation.navigate('SignIn')
        }}
        title={'Inloggen met e-mailadres'}
      />
      <View style={Styles.vspace17} />

      <Button
        onPress={() => {
          setPushNotificationFn();
          clearAsyncStorage().then(() => console.log('AsyncStorage cleared'));
          navigation.navigate('Postcode');
        }}
        color="#3b5998"
        socialIconName="facebook-square"
        iconColor={Colors.white}
        title={'Inloggen met Facebook'}
      />

      <View style={Styles.vspace17} />

      <Button
        onPress={() => {
          setPushNotificationFn();
          clearAsyncStorage().then(() => console.log('AsyncStorage cleared'));
          navigation.navigate('Postcode');
        }}
        color="#db4437"
        socialIconName="google"
        iconColor={Colors.white}
        title={'Inloggen met Google'}
      />
      <View style={Styles.vspace17} />

      <Button
        buttonStyle={{ backgroundColor: '#7D7D7D' }}
        onPress={() => {
          setPushNotificationFn();
          clearAsyncStorage().then(() => console.log('AsyncStorage cleared'));
          navigation.navigate('Postcode');
        }}
        title={'Bekijk & bestel'}
      />
    </View>
  );
}
