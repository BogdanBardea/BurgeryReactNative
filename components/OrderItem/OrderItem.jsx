import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import Styles from './OrderItem.styles';

function OrderItem({ orderNumber, orderDate, orderItems, orderStatus }) {
  const navigation = useNavigation();

  function calculatePrice() {
    let sum = 0;
    for (let item of orderItems) {
      sum += (parseFloat(item.product_price) * parseFloat(item.quantity));
    }
    return parseFloat(sum, 10).toFixed(2);
  }

  function loadOrderDetails() {
    navigation.navigate('OrderHistoryDetails', {
      orderNumber,
      orderDate,
      orderItems,
      orderStatus,
    });
  }

  return (
    <View style={Styles.cardContainer}>
      <View style={Styles.cardInterior}>
        <Text style={Styles.cardTitle}>{orderDate}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={Styles.priceText}>&euro;{calculatePrice()}</Text>
          <TouchableOpacity
            style={Styles.borderOrange}
            onPress={loadOrderDetails}>
            <Text style={Styles.priceTextBorder}>BEKIJKEN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default OrderItem;
