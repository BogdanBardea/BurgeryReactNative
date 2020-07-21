import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import Styles from './NewAdress.styles';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../theme/colors';
import Button from '../../../components/Button/Button';
import IconButton from '../../../components/IconButton/IconButton';
import UnderlineTextInput from '../../../components/textinputs/UnderlineTextInput';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {
  INPUT_BORDER_COLOR,
  INPUT_FOCUSED_BORDER_COLOR,
  INPUT_TEXT_COLOR,
  PLACEHOLDER_TEXT_COLOR,
} from '../../Settings/EditProfile/EditProfile.styles';

function NewAdress({ route }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [phone, setPhone] = useState();
  const [street, setStreet] = useState('');
  const [place, setPlace] = useState('');
  const [postcode, setPostcode] = useState()
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSet, setIsSet] = useState(false);


  const getTokenFn = async () => {
    try {
      const getTokenFromAsyncStorage = await AsyncStorage.getItem("token");
      if (getTokenFromAsyncStorage !== null) {
        setToken(JSON.parse(getTokenFromAsyncStorage));
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTokenFn();
  }, [getTokenFn]);

  const updateUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      console.log(JSON.parse(user));
      const currentUser = await JSON.parse(user);
      if (currentUser !== null) {
        setIsSet(true);
        setName(currentUser.name);
        setLastName(currentUser.last_name);
      }
    } catch (err) {
      console.log(err);
    }
    // () => alert('Profiel is succesvol gewijzigd.')
  }


  const setUserFn = async (data) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  }

  const setAddress = () => {
    axios
      .post('http://burgery.online/api/auth/update_me', {
        token: token,
        name: name,
        last_name: lastName,
        email: email,
        street: street,
        phone: phone,
        postcode: postcode,
        place: place,
      })
      .then(res => {
        console.log(res.data.address);
        setUserFn(res.data.user).then(() => navigation.goBack());
      })
      .catch(err => {
        console.log(err);
      });
  };

  const emailChange = (text) => {
    setEmail(text);
  };
  const emailFocus = () => {
    setEmailFocused(true);
    setPhoneFocused(false);
    setPasswordFocused(false);
  };
  const phoneChange = (text) => {
    setPhone(text);
  };
  const phoneFocus = () => {
    setEmailFocused(false);
    setPhoneFocused(true);
    setPasswordFocused(false);
  };

  const focusOn = (nextFiled) => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };

  if (isSet === false) {
    updateUser();
  }

  return (
    <View style={Styles.container}>
      <View style={Styles.card}>
        <View style={Styles.iconContainer}>
          <IconButton
            name="x-circle"
            size={22}
            color={Colors.white}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={{ marginLeft: 19 }}>
          <Text style={Styles.title}>NIEUW ADRES TOEVOEGEN</Text>
        </View>
        <ScrollView style={{
          backgroundColor: '#1C1C1C',
        }}>
          <View style={Styles.form}>
            <Text style={Styles.fieldInformations}>E-MAIL</Text>
            <UnderlineTextInput
              // onRef={(r) => {
              //   email = r;
              // }}
              onChangeText={emailChange}
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
            <Text style={Styles.fieldInformations}>STRAAT EN HUISNUMMER</Text>
            <UnderlineTextInput
              // onRef={(r) => {
              //   email = r;
              // }}
              onChangeText={value => setStreet(value)}
              onFocus={emailFocus}
              inputFocused={emailFocused}
              onSubmitEditing={focusOn(phone)}
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
            <Text style={Styles.fieldInformations}>POSTCODE</Text>
            <UnderlineTextInput
              // onRef={(r) => {
              //   email = r;
              // }}
              onChangeText={value => setPostcode(value)}
              onFocus={emailFocus}
              inputFocused={emailFocused}
              onSubmitEditing={focusOn(phone)}
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
            <Text style={Styles.fieldInformations}>GEMEENTE</Text>
            <UnderlineTextInput
              // onRef={(r) => {
              //   email = r;
              // }}
              onChangeText={value => setPlace(value)}
              onFocus={emailFocus}
              inputFocused={emailFocused}
              onSubmitEditing={focusOn(phone)}
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
          </View>
          <View style={{ height: 27 }} />
          <View style={Styles.buttonContainer}>
            <Button
              color={Colors.primaryColor}
              title="Opslaan als standaard adres"
              onPress={() => navigation.goBack()}
            />
            <View style={{ height: 10 }} />
            <Button color="#7D7D7D" title="Opslaan als nieuw adres" onPress={setAddress} />
          </View>
          <View style={{ height: 200, backgroundColor: 'rgba(28, 28, 28, 0.01)' }} />
        </ScrollView>
      </View>
    </View>
  );
}

export default NewAdress;
