import React, { useState } from 'react';
import { View } from 'react-native';
import Button from '../../../components/Button/Button';
import Colors from '../../../theme/colors';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Styles, {
  INPUT_BACKGROUND_COLOR,
  INPUT_FOCUSED_BORDER_COLOR,
  INPUT_TEXT_COLOR,
  PLACEHOLDER_TEXT_COLOR,
} from './ResetPassword.styles';
import BoxedTextInput from '../../../components/textinputs/BoxedTextInput/BoxedTextInput';
import axios from 'axios';

export default function ResetPassword({ route }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const sendEmailForgot = () => {

    if (!email) {
      alert("Gelieve uw e-mail in te vullen!");
    }
    axios
      .post("http://burgery.online/api/reset_password", {
        email: email,
      })
      .then((res) => {
        navigation.navigate('EmailSent')
      })
      .catch((err) => {
        alert("Er is geen account geregistreerd met deze e-mail!");
      });
  };
  console.log('the email is:', email);

  let { params } = route;
  // TODO fix this hack
  const isFocused = useIsFocused();
  if (isFocused) {
    params.setTitle('Wachtwoord vergeten');
    params.setSubTitle('Vul uw e-mail adres om uw wachtwoord te resetten');
  } else {
    return <View />;
  }
  return (
    <View style={Styles.buttonsGroup}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <BoxedTextInput
          returnKeyType="next"
          onChangeText={(value) => setEmail(value)}
          blurOnSubmit={false}
          keyboardType="email-address"
          placeholder="e-mailadres"
          placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
          inputTextColor={INPUT_TEXT_COLOR}
          borderColor={INPUT_FOCUSED_BORDER_COLOR}
          backgroundColor={INPUT_BACKGROUND_COLOR}
          focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
          inputContainerStyle={Styles.inputContainer}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 34,
        }}>
        <Button
          buttonStyle={{ backgroundColor: Colors.primaryColor }}
          onPress={sendEmailForgot}
          title={'Bevestigen'}
        />
      </View>
    </View>
  );
}
