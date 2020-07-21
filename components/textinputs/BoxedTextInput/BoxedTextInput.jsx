import React from 'react';
import {TextInput, View} from 'react-native';
import Styles from './BoxedTextInputStyles';

const BoxedTextInput = ({
  onRef = () => {},
  onChangeText,
  onFocus,
  inputFocused,
  onSubmitEditing,
  returnKeyType,
  blurOnSubmit,
  onKeyPress,
  keyboardType,
  autoCapitalize = 'none',
  maxLength,
  placeholder,
  placeholderTextColor,
  value,
  inputTextColor,
  secureTextEntry,
  borderColor,
  backgroundColor,
  focusedBorderColor,
  inputContainerStyle,
  inputStyle,
  multiline,
  numberOfLines,
}) => (
  <View
    style={[
      Styles.container,
      borderColor && {borderColor},
      backgroundColor && {backgroundColor},
      inputFocused && {borderColor: focusedBorderColor},
      inputContainerStyle && inputContainerStyle,
    ]}>
    <TextInput
      ref={(r) => onRef(r)}
      onChangeText={onChangeText}
      onFocus={onFocus}
      inputFocused={inputFocused}
      onSubmitEditing={onSubmitEditing}
      returnKeyType={returnKeyType}
      blurOnSubmit={blurOnSubmit}
      onKeyPress={onKeyPress}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      maxLength={maxLength}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      value={value}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
      numberOfLines={numberOfLines}
      style={[
        Styles.textInput,
        inputTextColor && {color: inputTextColor},
        inputStyle,
      ]}
    />
  </View>
);

export default BoxedTextInput;
