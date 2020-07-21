import React, { useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from '../../components/Button/Button';
import UnderlinePasswordInput from '../../components/textinputs/UnderlinePasswordInput';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';
import Styles, {
  INPUT_BORDER_COLOR,
  INPUT_FOCUSED_BORDER_COLOR,
  INPUT_TEXT_COLOR,
  PLACEHOLDER_TEXT_COLOR,
} from './Register.styles';
import axios from 'axios';
import RoundCheckbox from 'rn-round-checkbox';
import Colors from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';



function Register(props) {
  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [checked, setChecked] = useState(false);

  const [repeatPassword, setRepeatPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setStreet] = useState('');
  const [postcode, setPostcode] = useState('');
  const [place, setPlace] = useState('');

  const [isAuth, setAuth] = useState('false');
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const navigation = useNavigation();

  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  }

  const setTokenFn = async (data) => {
    try {
      await AsyncStorage.setItem('auth', 'true');
      await AsyncStorage.setItem('token', JSON.stringify(data));
      await AsyncStorage.setItem("password", JSON.stringify(password));
    } catch (err) {
      console.log(err);
    }
  };

  const setUserFn = async (data) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  }

  const handleRegister = () => {
    // console.log('working from inside the function...')
    axios
      .post("http://burgery.online/api/auth/register", {
        name: name,
        last_name: lastName,
        phone: phone,
        email: email,
        password: password,
        street: street,
        postcode: postcode,
        place: place,
      })
      .then((res) => {
        // console.log('and here is working too...')
        setToken(res.data.access_token);
        setTokenFn(res.data.access_token)
        // console.log('we are set up the token', res.data.access_token);
        axios
          .post("http://burgery.online/api/auth/me", {
            token: res.data.access_token,
          })
          .then((res) => {
            console.log('the user is almost registered', res.data)

            setUserFn(res.data);
            setUser(res.data);
          })
          .catch((err) => console.log(err));
        // console.log('the user is registered')
        setAuth("true");
        navigation.navigate('Postcode');
      })
      .catch((err) => {
        console.log('this is the error: ', err);
      });
  }

  const registerSubmit = () => {
    if (!email) {
      alert('Gelieve uw e-mail in te vullen!');
      return;
    }

    if (!password) {
      alert('Gelieve uw wachtwoord in te vullen!');
      return;
    }

    if (!repeatPassword || password != repeatPassword) {
      alert('Gelieve uw wachtwoord te herhalen!');
      return;
    }

    if (!name) {
      alert('Gelieve uw naam in te vullen!');
      return;
    }

    if (!lastName) {
      alert('Gelieve uw achternaam in te vullen!');
      return;
    }

    if (!phone) {
      alert('Gelieve uw telefoonnummer in te geven!');
      return;
    }

    if (!postcode) {
      alert('Gelieve uw postcode in te geven!');
      return;
    }

    if (!place) {
      alert('Gelieve de plaatsnaam in te vullen!');
      return;
    }

    if (checked == false) {
      alert('Gelieve de algemene voorwaarden te accepteren!');
      return;
    }
    // console.log('here is working...')
    handleRegister();
  };



  const emailFocus = () => {
    setEmailFocused(true);
    setPhoneFocused(false);
    setPasswordFocused(false);
  };

  const passwordFocus = () => {
    setEmailFocused(false);
    setPhoneFocused(false);
    setPasswordFocused(true);
  };

  const onTogglePress = () => {
    setSecureTextEntry((previousSecureTextEntry) => !previousSecureTextEntry);
  };

  const focusOn = (nextFiled) => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: '#1C1C1C',
      }}>
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'contain',
          backgroundColor: '#1C1C1C',
        }}>
        <SafeAreaView style={Styles.screenContainer}>
          <StatusBar barStyle="light-content" />

          <KeyboardAwareScrollView
            contentContainerStyle={Styles.contentContainerStyle}>
            <View style={Styles.content}>
              <View style={Styles.headerTextContainer}>
                <Text style={Styles.headerText}>NIEUW ACCOUNT</Text>
              </View>
              <View style={Styles.form}>
                <Text style={Styles.fieldInformations}>Voornaam</Text>
                <UnderlineTextInput
                  // onRef={(r) => {
                  //   email = r;
                  // }}
                  onChangeText={(text) => setLastName(text)}
                  // onFocus={emailFocus}
                  // inputFocused={emailFocused}
                  // onSubmitEditing={focusOn(phone)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  keyboardType="default"
                  placeholder=""
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={Styles.inputContainer}
                />
                <Text style={Styles.fieldInformations}>Naam</Text>
                <UnderlineTextInput
                  // onRef={(r) => {
                  //   email = r;
                  // }}
                  onChangeText={(text) => setName(text)}
                  // onFocus={emailFocus}
                  // inputFocused={emailFocused}
                  // onSubmitEditing={focusOn(phone)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  keyboardType="default"
                  placeholder=""
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={Styles.inputContainer}
                />
                <Text style={Styles.fieldInformations}>STRAAT</Text>
                <UnderlineTextInput
                  // onRef={(r) => {
                  //   email = r;
                  // }}
                  onChangeText={(value) => setStreet(value)}
                  // onFocus={emailFocus}
                  // inputFocused={emailFocused}
                  // onSubmitEditing={focusOn(phone)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  keyboardType="default"
                  placeholder=""
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={Styles.inputContainer}
                />
                <Text style={Styles.fieldInformations}>E-MAIL</Text>
                <UnderlineTextInput
                  // onRef={(r) => {
                  //   email = r;
                  // }}
                  onChangeText={(email) => {
                    setEmail(email);
                  }}
                  onFocus={emailFocus}
                  inputFocused={emailFocused}
                  onSubmitEditing={focusOn(phone)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  keyboardType="email-address"
                  placeholder=""
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={Styles.inputContainer}
                />
                <Text style={Styles.fieldInformations}>GSM-NUMMER</Text>
                <UnderlineTextInput
                  // onRef={(r) => {
                  //   email = r;
                  // }}
                  onChangeText={(phone) => { setPhone(phone) }}
                  // onFocus={emailFocus}
                  // inputFocused={emailFocused}
                  // onSubmitEditing={focusOn(phone)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  keyboardType="phone-pad"
                  placeholder=""
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={Styles.inputContainer}
                  inlineImageLeft="../../assets/./img/./Rectangle_7.png"
                />
                <Text style={Styles.fieldInformations}>POSTCODE</Text>
                <UnderlineTextInput
                  // onRef={(r) => {
                  //   email = r;
                  // }}
                  onChangeText={(postcode) => {
                    setPostcode(postcode);
                  }}
                  // onFocus={emailFocus}
                  // inputFocused={emailFocused}
                  // onSubmitEditing={focusOn(phone)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  keyboardType="numeric"
                  placeholder=""
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={Styles.inputContainer}
                />
                <Text style={Styles.fieldInformations}>PLAATS</Text>
                <UnderlineTextInput
                  // onRef={(r) => {
                  //   email = r;
                  // }}
                  onChangeText={(place) => {
                    setPlace(place);
                  }}
                  // onFocus={emailFocus}
                  // inputFocused={emailFocused}
                  // onSubmitEditing={focusOn(phone)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  keyboardType="default"
                  placeholder=""
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={Styles.inputContainer}
                />
                <Text style={Styles.fieldInformations}>WACHTWOORD</Text>
                <UnderlinePasswordInput
                  // onRef={(r) => {
                  //   password = r;
                  // }}
                  onChangeText={(password) => setPassword(password)}
                  onFocus={passwordFocus}
                  inputFocused={passwordFocused}
                  // onSubmitEditing={createAccount}
                  returnKeyType="done"
                  placeholder=""
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  secureTextEntry={secureTextEntry}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  toggleVisible={password.length > 0}
                  toggleText={secureTextEntry ? 'Show' : 'Hide'}
                  inputContainerStyle={Styles.inputContainer}
                  onTogglePress={onTogglePress}
                />
                <Text style={Styles.fieldInformations}>
                  WACHTWOORD HERHALEN
                </Text>
                <UnderlinePasswordInput
                  // onRef={(r) => {
                  //   password = r;
                  // }}
                  onChangeText={(repeatPassword) =>
                    setRepeatPassword(repeatPassword)
                  }
                  onFocus={passwordFocus}
                  inputFocused={passwordFocused}
                  // onSubmitEditing={createAccount}
                  returnKeyType="done"
                  placeholder=""
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  secureTextEntry={secureTextEntry}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  toggleVisible={password.length > 0}
                  toggleText={secureTextEntry ? 'Show' : 'Hide'}
                  inputContainerStyle={Styles.inputContainer}
                  onTogglePress={onTogglePress}
                />
                <View style={Styles.checkboxContainter}>
                  <RoundCheckbox
                    style={Styles.checkbox}
                    size={24}
                    checked={checked}
                    onValueChange={setChecked}
                    backgroundColor={Colors.primaryColor}
                    iconColor={Colors.black}
                  />
                  <Text style={Styles.checkboxtext}>
                    Bij het aanmaken van dit account verklaar ik akkoord met de
                    algemene voorwaarden.
                  </Text>
                </View>
                <View style={Styles.buttonContainer}>
                  <Button
                    buttonStyle={{ backgroundColor: '#F2A83B' }}
                    onPress={registerSubmit}
                    title={'Account aanmaken'}
                    disabled={!checked}
                  />
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ImageBackground>
    </ScrollView>
  );
}

export default Register;
