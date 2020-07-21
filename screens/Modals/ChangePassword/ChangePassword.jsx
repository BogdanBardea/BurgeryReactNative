import React, { useState, useEffect } from 'react';
import Styles, {
  INPUT_BACKGROUND_COLOR,
  INPUT_FOCUSED_BORDER_COLOR,
  INPUT_TEXT_COLOR,
  PLACEHOLDER_TEXT_COLOR,
} from './ChangePassword.styles';
import { Text, View, ScrollView } from 'react-native';
import IconButton from '../../../components/IconButton/IconButton';
import Colors from '../../../theme/colors';
import Button from '../../../components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import BoxedPasswordInput from '../../../components/textinputs/BoxedPasswordInput/BoxedPasswordInput';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

function ChangePassword() {
  const [emailFocused, setEmailFocused] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [token, setToken] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [isSet, setIsSet] = useState(false);
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [phone, setPhone] = useState('');
  const [postcode, setPostcode] = useState('');
  const [place, setPlace] = useState('');

  const navigation = useNavigation();

  const updateUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      console.log(JSON.parse(user));
      const currentUser = await JSON.parse(user);
      if (currentUser !== null) {
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

  if (isSet === false) {
    updateUser();
  }

  const emailFocus = () => {
    setEmailFocused(true);
    setPasswordFocused(false);
  };

  const passwordFocus = () => {
    setPasswordFocused(true);
    setEmailFocused(false);
  };

  const onTogglePress = () => {
    setSecureTextEntry((previousSecureTextEntry) => !previousSecureTextEntry);
  };

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

  const getPasswordFn = async () => {
    try {
      const passwordValue = await AsyncStorage.getItem('password');
      if (passwordValue !== null) {
        setCurrentPassword(passwordValue);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const setPasswordFn = async (password) => {
    try {
      await AsyncStorage.setItem("password", password);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTokenFn();
    getPasswordFn();
  }, [getTokenFn, getPasswordFn])

  const handleSubmit = () => {

    if (!oldPassword) {
      alert("Please enter the current password");
      return;
    }

    if (oldPassword !== currentPassword) {
      alert("The current password is not valid");
      return;
    }

    if (!newPassword) {
      alert("Please enter the new password");
      return;
    }

    if (!repeatPassword) {
      alert("Please repeat the new password");
      return;
    }

    if (newPassword !== repeatPassword) {
      alert("New password is not matching with repeat password!");
      return;
    }

    axios
      .post("http://burgery.online/api/auth/change_password", {
        token: token,
        password: oldPassword,
        new_password: newPassword,
        repeat_password: repeatPassword,
      })
      .then((res) => {
        console.log(res);
        alert("Profiel is succesvol gewijzigd.");
        setPasswordFn(newPassword);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      });
  };


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
          <Text style={Styles.title}>WACHTWOORD WIJZIGEN</Text>
        </View>
        <ScrollView style={{
          backgroundColor: '#1C1C1C',
        }}>
          <View
            style={{
              marginHorizontal: 20,
              marginVertical: 25,
            }}>
            <BoxedPasswordInput
              // onRef={(r) => {
              //   password = r;
              // }}
              onChangeText={value => setOldPassword(value)}
              onFocus={passwordFocus}
              inputFocused={passwordFocused}
              returnKeyType="done"
              placeholder="Huidig wachtwoord"
              placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
              inputTextColor={INPUT_TEXT_COLOR}
              secureTextEntry={secureTextEntry}
              borderColor={INPUT_FOCUSED_BORDER_COLOR}
              backgroundColor={INPUT_BACKGROUND_COLOR}
              focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
              toggleVisible={oldPassword.length > 0}
              toggleText={secureTextEntry ? 'Show' : 'Hide'}
              onTogglePress={onTogglePress}
            />
            <View style={{ height: 19 }} />
            <BoxedPasswordInput
              // onRef={(r) => {
              //   password = r;
              // }}
              onChangeText={value => setNewPassword(value)}
              onFocus={passwordFocus}
              inputFocused={passwordFocused}
              returnKeyType="done"
              placeholder="Nieuw wachtwoord"
              placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
              inputTextColor={INPUT_TEXT_COLOR}
              secureTextEntry={secureTextEntry}
              borderColor={INPUT_FOCUSED_BORDER_COLOR}
              backgroundColor={INPUT_BACKGROUND_COLOR}
              focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
              toggleVisible={newPassword.length > 0}
              toggleText={secureTextEntry ? 'Show' : 'Hide'}
              onTogglePress={onTogglePress}
            />
            <View style={{ height: 19 }} />
            <BoxedPasswordInput
              // onRef={(r) => {
              //   password = r;
              // }}
              onChangeText={value => setRepeatPassword(value)}
              onFocus={passwordFocus}
              inputFocused={passwordFocused}
              returnKeyType="done"
              placeholder="Nieuw wachtwoord herhalen"
              placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
              inputTextColor={INPUT_TEXT_COLOR}
              secureTextEntry={secureTextEntry}
              borderColor={INPUT_FOCUSED_BORDER_COLOR}
              backgroundColor={INPUT_BACKGROUND_COLOR}
              focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
              toggleVisible={repeatPassword.length > 0}
              toggleText={secureTextEntry ? 'Show' : 'Hide'}
              onTogglePress={onTogglePress}
            />
          </View>
          <View style={Styles.buttonContainer}>
            <Button color={Colors.primaryColor} title="Wachtwoord wijzigen"
              onPress={handleSubmit}
            />
          </View>
          <View style={{ height: 250, backgroundColor: 'rgba(28, 28, 28, 0.01)' }} />
        </ScrollView>
      </View>
    </View>
  );
}

export default ChangePassword;
