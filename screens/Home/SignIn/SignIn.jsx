import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Styles, {
  INPUT_BACKGROUND_COLOR,
  INPUT_BORDER_COLOR,
  INPUT_FOCUSED_BORDER_COLOR,
  INPUT_TEXT_COLOR,
  PLACEHOLDER_TEXT_COLOR,
} from './SignInStyles';
import Button from '../../../components/Button/Button';
import BoxedTextInput from '../../../components/textinputs/BoxedTextInput/BoxedTextInput';
import BoxedPasswordInput from '../../../components/textinputs/BoxedPasswordInput/BoxedPasswordInput';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import data from '../../../dataUrl/constants';
import Colors from '../../../theme/colors';

export default function SignIn(props) {
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [isAuth, setAuth] = useState('false');
  const navigation = useNavigation();

  const clearAsyncStorage = async () => {
    await AsyncStorage.clear();
  };

  const setTokenFn = async token => {
    try {
      await AsyncStorage.setItem('auth', 'true');
      await AsyncStorage.setItem('token', JSON.stringify(token));
      await AsyncStorage.setItem('password', password);
    } catch (err) {
      console.log(err);
    }
  };

  const setUserFn = async data => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  };

  const loginSubmit = () => {
    clearAsyncStorage();

    if (email && password) {
      axios
        .post('http://burgery.online/api/auth/login', {
          email,
          password,
        })
        .then(res => {
          setToken(res.data.access_token);
          setTokenFn(res.data.access_token);
          axios
            .post('http://burgery.online/api/auth/me', {
              token: res.data.access_token,
            })
            .then(res => {
              setUser(res.data);
              setUserFn(res.data);
            })
            .catch(err => console.log(err));
          setAuth('true');
          navigation.popToTop();
          navigation.replace('Postcode');
        })
        .catch(res => {
          alert('E-mail/wachtwoord klopt niet!');
        });
    } else {
      if (!email) {
        alert('Gelieve een e-mail in te vullen!');
      }
      if (!password) {
        alert('Gelieve een wachtwoord in te geven!');
      }
    }
  };

  const emailChange = text => {
    setEmail(text);
  };
  const emailFocus = () => {
    setEmailFocused(true);
    setPasswordFocused(false);
  };

  const passwordChange = text => {
    setPassword(text);
  };

  const passwordFocus = () => {
    setPasswordFocused(true);
    setEmailFocused(false);
  };

  const onTogglePress = () => {
    setSecureTextEntry(previousSecureTextEntry => !previousSecureTextEntry);
  };

  const navigateTo = screen => () => {
    navigation.navigate(screen);
  };

  function createAccount() {
    console.log('Account creation');
  }

  let { params } = props.route;
  // TODO fix this hack
  const isFocused = useIsFocused();
  if (isFocused) {
    params.setTitle('Inloggen');
    params.setSubTitle('Login om snel een bestelling te plaatsen');
  } else {
    return <View />;
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={Styles.contentContainerStyle}
      style={{ flex: 0.5 }}>
      <View style={Styles.form}>
        <View style={Styles.content}>
          <BoxedTextInput
            // onRef={(r) => {
            //   email = r;
            // }}
            onChangeText={emailChange}
            onFocus={emailFocus}
            inputFocused={emailFocused}
            //onSubmitEditing={focusOn(phone)}
            returnKeyType="next"
            blurOnSubmit={false}
            keyboardType="email-address"
            placeholder="e-mailadres"
            placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
            inputTextColor={INPUT_TEXT_COLOR}
            borderColor={INPUT_BORDER_COLOR}
            backgroundColor={INPUT_BACKGROUND_COLOR}
            focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
            inputContainerStyle={Styles.inputContainer}
          />
          <BoxedPasswordInput
            // onRef={(r) => {
            //   password = r;
            // }}
            onChangeText={passwordChange}
            onFocus={passwordFocus}
            inputFocused={passwordFocused}
            onSubmitEditing={createAccount}
            returnKeyType="done"
            placeholder="wachtwoord"
            placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
            inputTextColor={INPUT_TEXT_COLOR}
            secureTextEntry={secureTextEntry}
            borderColor={INPUT_BORDER_COLOR}
            backgroundColor={INPUT_BACKGROUND_COLOR}
            focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
            toggleVisible={password.length > 0}
            toggleText={secureTextEntry ? 'Show' : 'Hide'}
            onTogglePress={onTogglePress}
          />
          <Button
            title="Wachtwoord vergeten?"
            buttonStyle={Styles.forgotPassword}
            textStyle={Styles.forgotPasswordText}
            onPress={navigateTo('ResetPassword')}
          />
        </View>
        <View style={Styles.buttonContainer}>
          <Button
            buttonStyle={{ backgroundColor: Colors.primaryColor }}
            onPress={loginSubmit}
            title={'Inloggen'}
          />
          <View style={Styles.vspace17} />

          <Button
            buttonStyle={{ backgroundColor: Colors.secondaryButton }}
            onPress={navigateTo('Register')}
            title={'Registreren'}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
