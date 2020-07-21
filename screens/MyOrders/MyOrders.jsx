import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import Colors from '../../theme/colors';
import Styles from './MyOrders.styles';
import OrderItem from '../../components/OrderItem/OrderItem';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tokenIs, setTokenIs] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    async function getAllData() {
      let getTokenFromAsyncStorage = '';
      try {
        getTokenFromAsyncStorage = JSON.parse(
          await AsyncStorage.getItem('token'),
        );
        if (getTokenFromAsyncStorage !== null) {
          setTokenIs(getTokenFromAsyncStorage);
        } else {
          setTokenIs('');
          return;
        }
      } catch (err) {
        console.log(err);
      }
      console.log('Token: ', getTokenFromAsyncStorage);
      try {
        console.log('Token: ', getTokenFromAsyncStorage);
        let res = await axios.get('http://burgery.online/api/auth/my_orders', {
          params: {
            token: getTokenFromAsyncStorage,
          },
        });
        console.log('my orders type is: ', res.data.orders);
        setOrders(res.data.orders);
        setIsLoaded(true);
      } catch (err) {
        console.log(err);
      }
    }
    if (isFocused === true)
      getAllData().then(() => console.log('Data got on MyOrders.jsx'));
  }, [isFocused]);

  const month = new Array();
  month[0] = 'January';
  month[1] = 'February';
  month[2] = 'March';
  month[3] = 'April';
  month[4] = 'May';
  month[5] = 'June';
  month[6] = 'July';
  month[7] = 'August';
  month[8] = 'September';
  month[9] = 'October';
  month[10] = 'November';
  month[11] = 'December';

  function renderOrders() {
    let objects = [];
    for (let order of orders) {
      objects.push(
        <OrderItem
          key={order.id}
          activeOpacity={0.8}
          orderNumber={order.id}
          orderDate={`${order.created_at.substr(8, 2)} ${
            month[new Date(order.created_at).getMonth()]
          }, ${new Date(order.created_at).getFullYear()}`}
          orderItems={order.products}
          orderStatus={order.status}
        />,
      );
    }
    return objects.reverse();
  }

  function renderYouAreNotLoggedIn() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: Colors.white,
            fontSize: 20,
            lineHeight: 24,
            fontWeight: 'bold',
          }}>
          Geen bestel geschiedenis!
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ width: '100%', height: '100%' }}>
      <View style={Styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="light-content"
        />
        <Text style={Styles.titlePage}>MIJN BESTELLINGEN</Text>
        <ScrollView
          style={{
            backgroundColor: '#1C1C1C',
          }}
          contentContainerStyle={
            tokenIs === '' && {
              height: '100%',
            }
          }>
          {tokenIs === ''
            ? renderYouAreNotLoggedIn()
            : isLoaded === true
            ? renderOrders()
            : console.log('there are no orders')}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default MyOrders;
