import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Colors from '../../theme/colors';

function RadioButton({size, title, subTitle, checked, onPress}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: size,
      }}>
      <TouchableOpacity
        style={{
          height: size,
          width: size,
          backgroundColor: checked ? Colors.primaryColor : '#A2A2A2',
          borderRadius: 180,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={onPress}>
        <View
          style={{
            height: size / 1.3,
            width: size / 1.3,
            backgroundColor: checked ? Colors.primaryColor : '#A2A2A2',
            borderRadius: 180,
            borderWidth: 3,
            borderColor: Colors.black,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          marginLeft: 15,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <Text style={{fontSize: 16, lineHeight: 19, color: Colors.white}}>
          {title}
        </Text>
        {subTitle && (
          <Text style={{fontSize: 14, lineHeight: 17, color: '#878787'}}>
            {subTitle}
          </Text>
        )}
      </View>
    </View>
  );
}

export default RadioButton;
