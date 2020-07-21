import React from 'react';
import {View} from 'react-native';
import Styles from './Separator.styles';

function Separator({color}) {
  return <View style={[Styles.separator, color && {borderColor: color}]} />;
}

export default Separator;
