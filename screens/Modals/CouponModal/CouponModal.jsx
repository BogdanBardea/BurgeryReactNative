import React, { useState } from 'react';
import {
  AsyncStorage,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './CouponModal.style';
import Button from '../../../components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const CouponModal = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [borderColor, setBorderColor] = useState('#F3F3F3');
  const [backgroundColor, setBackgroundColor] = useState('#606060');
  const [detailText, setDetailText] = useState('');
  const [couponCode, setCouponCode] = useState('');

  const setCouponCodeFn = async (data) => {
    try {
      await AsyncStorage.setItem('couponCode', JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  };

  const checkValidity = () => {
    if (couponCode) {
      axios
        .post('http://burgery.online/api/check_coupon', {
          code: couponCode,
        })
        .then((res) => {
          setBorderColor('#66D70D');
          setBackgroundColor('#707A68');
          setDetailText('Je hebt korting!');
          alert('Coupon toegevoegd');
          setCouponCodeFn(res.data.coupon);
          console.log(res.data.coupon);
        })
        .catch((err) => {
          setBorderColor('#9A0404');
          setBackgroundColor('#624949');
          setDetailText('Oeps.. verkeerde code!');
          alert('Oeps.. verkeerde code!');
        });

      return;
    } else {
      alert('Gelieve coupon code in te voeren!');
    }
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <TouchableOpacity
          style={{ ...styles.openButton }}
          onPress={() => navigation.goBack()}>
          <View>
            <Image source={require('../../../assets/CloseButton.png')} />
          </View>
        </TouchableOpacity>
        <View style={styles.titleText}>
          <View>
            <Text style={styles.titleNameText}>COUPON</Text>
          </View>
        </View>
        <View style={styles.couponInputForm}>
          <TextInput
            style={[styles.couponInput, { borderColor, backgroundColor }]}
            placeholder="Vul hier uw coupon code in."
            value={couponCode}
            onChangeText={(text) => setCouponCode(text)}
          />
          {detailText.length !== 0 && (
            <Text style={styles.couponWinText}>{detailText}</Text>
          )}
        </View>
        <View style={styles.buttonsStyleFirst}>
          <Button title={'Valideren'} onPress={checkValidity} />
        </View>
      </View>
    </View>
  );
};

export default CouponModal;
