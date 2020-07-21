import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from '../../../components/Button/Button';
import UnderlinePasswordInput from '../../../components/textinputs/UnderlinePasswordInput';
import UnderlineTextInput from '../../../components/textinputs/UnderlineTextInput';
import AsyncStorage from '@react-native-community/async-storage';
import Styles, {
  INPUT_BORDER_COLOR,
  INPUT_FOCUSED_BORDER_COLOR,
  INPUT_TEXT_COLOR,
  PLACEHOLDER_TEXT_COLOR,
} from './EditProfile.styles';
import axios from 'axios';

function EditProfile(props) {
  const [emailFocused, setEmailFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [phone, setPhone] = useState('');
  const [postcode, setPostcode] = useState('');
  const [place, setPlace] = useState('');
  const [verified, setVerified] = useState(false);
  const [loggeedUser, setLoggedUser] = useState({});
  const [isSet, setIsSet] = useState(false);
  const [token, setToken] = useState('');
  const navigation = useNavigation();

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


  const updateUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      console.log(JSON.parse(user));
      const currentUser = await JSON.parse(user);
      if (currentUser !== null) {
        setLoggedUser(currentUser);
        setIsSet(true);
        setName(currentUser.name);
        setLastName(currentUser.last_name);
        setPlace(currentUser.place);
        setEmail(currentUser.email);
        setPhone(currentUser.phone);
        setPostcode(currentUser.postcode);
        setStreet(currentUser.street);
      }
    } catch (err) {
      console.log(err);
    }
    // () => alert('Profiel is succesvol gewijzigd.')
  }

  const getTokenFn = async () => {
    try {
      const getTokenFromAsyncStorage = await AsyncStorage.getItem("token");
      if (getTokenFromAsyncStorage !== null) {
        setToken(JSON.parse(getTokenFromAsyncStorage));
        // setVerified(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const setUserFn = async (data) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = () => {
    // e.preventDefault();

    if (!name) {
      alert("Gelieve uw naam in te vullen!");
      return;
    }

    if (!lastName) {
      alert("Gelieve uw achternaam in te vullen!");
      return;
    }

    if (!phone) {
      alert("Gelieve uw telefoonnummer in te geven!");
      return;
    }

    if (!street) {
      alert("Gelieve uw straat in te vullen!");
      return;
    }

    if (!postcode) {
      alert("Gelieve uw postcode in te geven!");
      return;
    }

    if (!place) {
      alert("Gelieve de plaatsnaam in te vullen!");
      return;
    }

    // console.log('here is working')
    // console.log('token is: ', token)
    axios
      .post("http://burgery.online/api/auth/update_me", {
        token: token,
        name: name,
        last_name: lastName,
        phone: phone,
        street: street,
        postcode: postcode,
        place: place,
      })
      .then((res) => {
        console.log(res);
        setUser(res.data.user);
        setUserFn(res.data.user);
        alert("Profiel is succesvol gewijzigd.");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      });
  };

  if (isSet === false) {
    updateUser();
  }

  useEffect(() => {
    // updateUser();
    getTokenFn();
  }, [getTokenFn])

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
                <Text style={Styles.headerText}>ACCOUNT BIJWERKEN</Text>
              </View>
              <View style={Styles.form}>
                <Text style={Styles.fieldInformations}>Voornam</Text>
                <UnderlineTextInput
                  // onRef={(r) => {
                  //   email = r;
                  // }}
                  onChangeText={value => setLastName(value)}
                  // onFocus={emailFocus}
                  // inputFocused={emailFocused}
                  // onSubmitEditing={focusOn(phone)}
                  value={lastName}
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
                  onChangeText={value => setName(value)}
                  value={name}
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
                  onChangeText={value => setStreet(value)}
                  value={street}
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
                  onChangeText={value => setEmail(value)}
                  value={email}
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
                  onChangeText={value => setPhone(value)}
                  value={phone}
                  onFocus={emailFocus}
                  inputFocused={emailFocused}
                  onSubmitEditing={focusOn(phone)}
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
                  value={postcode}
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
                  value={place}
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
                <View style={Styles.buttonContainer}>
                  <Button
                    buttonStyle={{ backgroundColor: '#7D7D7D' }}
                    onPress={() => navigation.navigate('ChangePassword')}
                    title={'Wachtwoord wijzigen'}
                  />

                  <View style={Styles.vspace17} />
                  <Button
                    buttonStyle={{ backgroundColor: '#F2A83B' }}
                    onPress={handleSubmit}
                    title={'Opslaan'}
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

export default EditProfile;
