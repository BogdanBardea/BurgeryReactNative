import React from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import Styles from './EmailSent.styles';
import Button from '../../../components/Button/Button';

export default function EmailSent({ route }) {
  const navigation = useNavigation();
  let { params } = route;
  // TODO fix this hack
  const isFocused = useIsFocused();
  if (isFocused) {
    params.setTitle('Geslaagd!');
    params.setSubTitle(
      'Als uw e-mail adres in onze database zit, ontvangt u snel een mail om uw wachtwoord te resetten',
    );
  } else {
    return <View />;
  }

  return (
    <View style={Styles.buttonsGroup}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 50,
          marginBottom: 20,
          paddingHorizontal: 20,
        }}>
        <Button
          buttonStyle={{ backgroundColor: '#F2A83B' }}
          onPress={() => navigation.navigate('SignIn')}
          title={'Nu inloggen'}
        />
      </View>
    </View>
  );
}
