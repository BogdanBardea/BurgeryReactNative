import React from 'react';
import Styles from './PostcodeInvalid.styles';
import {ImageBackground, View} from 'react-native';
import IconButton from '../../../components/IconButton/IconButton';
import Colors from '../../../theme/colors';
import {useNavigation} from '@react-navigation/native';

function PostcodeInvalid() {
  const navigation = useNavigation();

  return (
    <View style={Styles.container}>
      <ImageBackground
        style={Styles.card}
        source={require('../../../assets/placeholder.jpg')}>
        <View style={Styles.iconContainer}>
          <IconButton
            name="x-circle"
            size={22}
            color={Colors.white}
            onPress={() => navigation.goBack()}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
export default PostcodeInvalid;
