import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Styles from './BoxedPasswordInputStyles';

const BoxedPasswordInput = ({
  onRef = () => {},
  onChangeText,
  onFocus,
  inputFocused,
  onSubmitEditing,
  returnKeyType,
  placeholder,
  placeholderTextColor,
  inputTextColor,
  secureTextEntry = true,
  borderColor,
  backgroundColor,
  focusedBorderColor,
  toggleVisible,
  toggleText,
  onTogglePress,
}) => (
  <View
    style={[
      Styles.container,
      borderColor && {borderColor},
      backgroundColor && {backgroundColor},
      inputFocused && {borderColor: focusedBorderColor},
    ]}>
    <TextInput
      ref={(r) => onRef(r)}
      onChangeText={onChangeText}
      onFocus={onFocus}
      onSubmitEditing={onSubmitEditing}
      returnKeyType={returnKeyType}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      style={[Styles.textInput, inputTextColor && {color: inputTextColor}]}
    />
    <View style={Styles.toggleContainer}>
      {toggleVisible && (
        <TouchableOpacity activeOpacity={0.9} onPress={onTogglePress}>
          <Text
            style={[
              Styles.toggleText,
              inputTextColor && {color: inputTextColor},
            ]}>
            {toggleText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);

export default BoxedPasswordInput;
