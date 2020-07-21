import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import axios from 'axios';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function PushNotification() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [token, setToken] = useState('');
  const [pushNotification, setPushNotification] = useState();

  //  post http://burgery.online/api/my_notifications // all notifications to be showed
  // post http://burgery.online/api/view_notification // viewed == true ? don't show again : show
  // viewed = 0 || 1
  // send id === viewed = 1

  const getTokenFn = async () => {
    try {
      const getTokenFromAsyncStorage = await AsyncStorage.getItem("token")
      if (getTokenFromAsyncStorage !== null) {
        setToken(JSON.parse(getTokenFromAsyncStorage));
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getNotification = async () => {
    axios.post('http://burgery.online/api/my_notifications', {
      token: token,
    })
      .then((res) => {
        console.log('notification are :', res);
        // setPushNotification(res.data)
        setPushNotification(res.data.notifications)
      })
      .catch((err) => {
        console.log(err);
      })
    await sendPushNotification(expoPushToken);
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

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
    </View>
  );
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
async function sendPushNotification(expoPushToken) {
  // here is the message
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    // data: { data: 'goes here' },
  };
  // here is the request
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
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
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
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

  return token;
}

// try to send data to server

export async function registerForPushNotificationsAsync(userId: string) {
  let experienceId = undefined;
  if (!Constants.manifest) {
    // Absence of the manifest means we're in bare workflow
    experienceId = '@username/example';
  }
  const expoPushToken = await Notifications.getExpoPushTokenAsync({
    experienceId,
  });
  await fetch('https://example.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      expoPushToken,
    }),
  });
}