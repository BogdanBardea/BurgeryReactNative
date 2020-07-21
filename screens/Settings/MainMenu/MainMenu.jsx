import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  CommonActions,
  TabActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import Styles from './MainMenu.styles';
import Button from '../../../components/Button/Button';
import Separator from '../../../components/Separator/Separator';
import Colors from '../../../theme/colors';

function MainMenu() {
  const navigation = useNavigation();
  const [auth, setAuth] = useState('false');
  const isFocused = useIsFocused();

  const clearAsyncStorage = async () => {
    await AsyncStorage.clear();
  };

  async function logOut() {
    try {
      await clearAsyncStorage();
      // navigation.navigate('Welcome');
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
      navigation.dispatch(resetAction);
      let action = TabActions.jumpTo('HomeNavigation');
      navigation.dispatch(action);
      navigation.navigate('Home', { screen: 'Welcome' });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    AsyncStorage.getItem('auth').then(value => setAuth(value));
  }, [isFocused]);

  return (
    <SafeAreaView style={Styles.screenContainer}>
      <StatusBar barStyle="light-content" />
      <View style={Styles.content}>
        <View style={Styles.headerTextContainer}>
          <Text style={Styles.headerText}>INSTELLINGEN</Text>
        </View>
        <View style={Styles.separator} />
        <Button
          height={49}
          buttonStyle={Styles.buttonStyle}
          title="Algemene voorwaarden"
        />
        <Separator />
        {auth == 'true' && (
          <View style={{ width: '100%' }}>
            <Button
              height={49}
              buttonStyle={Styles.buttonStyle}
              title="Account bijwerken"
              onPress={() => navigation.navigate('EditProfile')}
            />
            <Separator />
          </View>
        )}
        <Button
          height={49}
          buttonStyle={Styles.buttonStyle}
          textStyle={{ color: auth == 'true' ? '#A62727' : Colors.white }}
          title={auth == 'true' ? 'Uitloggen' : 'Inloggen'}
          onPress={() =>
            auth == 'true' ? logOut() : navigation.navigate('Welcome')
          }
        />
        <View style={Styles.separator} />
      </View>
    </SafeAreaView>
  );
}

export default MainMenu;
