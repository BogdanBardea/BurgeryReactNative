import React, { useState, useRef } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { View, Text, TextInput } from 'react-native';
import Styles from './PostcodeStyle';
import Colors from '../../../theme/colors';
import Button from '../../../components/Button/Button';
import IconButton from '../../../components/IconButton/IconButton';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const CODE_LENGTH = 4;

console.disableYellowBox = true;

export default function Postcode({ route }) {
  const [isFull, setIsFull] = useState(false);
  const textInput = useRef(null);
  const [postcode, setPostcode] = useState('');
  const navigation = useNavigation();

  const { params } = route;

  const [tokenIs, setTokenIs] = useState('');

  const getTokenFn = async () => {
    try {
      const getTokenFromAsyncStorage = await AsyncStorage.getItem('token');
      if (getTokenFromAsyncStorage !== null) {
        setTokenIs(JSON.parse(getTokenFromAsyncStorage));
      }
    } catch (err) {
      console.log(err);
    }
  };
  getTokenFn().then('Token got on postcode!');

  const handleSubmit = () => {
    if (postcode.length < 4) {
      alert('Voer uw postcode in');
    } else {
      // console.log('token is', getTokenFn());
      // console.log('postcode is', postcode);
      axios
        .post('http://burgery.online/api/post_code', {
          token: tokenIs,
          postcode: postcode,
        })
        .then(res => {
          navigation.navigate('OrderDetails');
        })
        .catch(err => {
          console.log(err);
          alert('Sorry, wij leveren hier niet...');
        });
      AsyncStorage.setItem('postcode', JSON.stringify(postcode)).then(() =>
        console.log('Postcode set!'),
      );
    }
  };

  function onTextChanged(text) {
    if (text.length === CODE_LENGTH) {
      setIsFull(true);
    } else {
      setIsFull(false);
    }
    let newCode = text;
    for (let i = newCode.length; i < CODE_LENGTH; i++) {
      newCode += '';
    }
    setPostcode(newCode);
  }

  function renderCells() {
    let cells = [];
    for (let i = 0; i < CODE_LENGTH; i++) {
      cells.push(
        <View style={Styles.digitContainer} key={i}>
          <Text style={Styles.digit}>{postcode[i]}</Text>
        </View>,
      );
    }
    return cells;
  }

  function detailOrConfirm() {
    if (!isFull) {
      return (
        <View style={Styles.infoContainer}>
          <Text style={Styles.infoText}>
            Vul hierboven uw postcode en wij koppelen het met een restaurant in
            uw buurt.
          </Text>
        </View>
      );
    }
    return (
      <View style={Styles.confirmContainer}>
        <Button
          buttonStyle={{ backgroundColor: Colors.primaryColor }}
          title={'Klaar om te bestellen?'}
          onPress={handleSubmit}
        />
      </View>
    );
  }

  function clearButton() {
    if (isFull) {
      return (
        <IconButton
          onPress={() => {
            textInput.current.clear();
            // this has to be called because onChangeText event is only called when input is edited by user
            onTextChanged('');
          }}
          name="x-circle"
          size={20}
          color={Colors.white}
          style={{
            position: 'absolute',
            alignSelf: 'center',
            right: -20,
          }}
        />
      );
    }
  }

  const isFocused = useIsFocused();
  // TODO fix this hack
  if (isFocused) {
    route.params.setTitle('Vul hier uw postcode in');
    route.params.setSubTitle('');
  } else {
    return <View />;
  }

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
      <View style={{ flexShrink: 1, flexDirection: 'row', marginTop: 18 }}>
        <View style={Styles.codeContainer}>
          {renderCells()}
          <TextInput
            ref={textInput}
            caretHidden
            disableFullscreenUI
            autoCompleteType="off"
            keyboardType="numeric"
            spellCheck={false}
            autoCorrect={false}
            blurOnSubmit={false}
            style={Styles.textInput}
            maxLength={CODE_LENGTH}
            clearButtonMode="never"
            autoCapitalize="characters"
            underlineColorAndroid="transparent"
            onChangeText={onTextChanged}
          />
        </View>
        {clearButton()}
      </View>
      {detailOrConfirm()}
    </View>
  );
}
