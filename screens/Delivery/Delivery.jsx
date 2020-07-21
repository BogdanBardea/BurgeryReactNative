import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { SafeAreaView, View, Text } from 'react-native';
import Colors from '../../theme/colors';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { useNavigation, useIsFocused } from '@react-navigation/native';

function Delivery() {
  const [deliveryTime, setDeliveryTime] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    let reCheck = null;
    let orderWaitingId = null;
    const orderWaitingIdFn = async () => {
      try {
        const orderWaitingIdValue = JSON.parse(
          await AsyncStorage.getItem('orderWaitingId'),
        );
        if (orderWaitingIdValue !== null) {
          console.log('id of waiting order is: ', orderWaitingIdValue);
          orderWaitingId = orderWaitingIdValue;
        }
      } catch (err) {
        console.log(err);
      }
    };

    const checkOrder = () => {
      axios
        .post('http://burgery.online/api/get_order_time', {
          order_id: orderWaitingId,
        })
        .then(res => {
          console.log('Order has been checked with id: ', orderWaitingId);
          console.log(res.data);
          if (res.data.delivery_time == 0) {
            setDeliveryTime('');
            setDeliveryDate('');
          } else {
            setDeliveryTime(res.data.delivery_time);
            setDeliveryDate(res.data.delivery_date);
            clearInterval(reCheck);
            reCheck = null;
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    orderWaitingIdFn().then(() => {
      checkOrder();
      reCheck = setInterval(function () {
        checkOrder();
      }, 10000);
    });
    return () => {
      if (reCheck != null) clearInterval(reCheck);
    };
  }, [isFocused]);

  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1C1C1C',
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 40,
        }}>
        <Icon size={100} name="check-circle" color="#F2A83B" />
        <Text
          style={{
            fontWeight: '800',
            fontSize: 24,
            lineHeight: 29,
            letterSpacing: -0.3,
            color: Colors.white,
            textAlign: 'center',
          }}>
          BESTELLING GESLAAGD
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            lineHeight: 19,
            color: '#858585',
            textAlign: 'center',
          }}>
          ONS TEAM DOET ZIJN BEST OM UW BESTELLING BINNEN 30 MINUTEN AF TE
          WERKEN. DE EXACTE TIJD VOOR UW BESTELLING ONTVANGT U VIA E-MAIL EN
          VINDT U HIERONDER TERUG.
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 40,
          width: 233,
          height: 86,
          flexDirection: 'row',
          backgroundColor: Colors.primaryColor,
          marginTop: 90,
          borderRadius: 10,
        }}>
        <Icon name="clock" size={24} color={Colors.white} />
        <View>
          <Text
            style={{
              marginLeft: 10,
              color: Colors.white,
              fontSize: 20,
              lineHeight: 24,
              fontWeight: 'bold',
            }}>
            {deliveryTime ? deliveryTime : 'IN AFWACHTING'}
          </Text>
          {deliveryDate ? (
            <Text
              style={{
                marginLeft: 10,
                color: Colors.white,
                fontSize: 20,
                lineHeight: 24,
                fontWeight: 'bold',
              }}>
              {deliveryDate}
            </Text>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Delivery;
