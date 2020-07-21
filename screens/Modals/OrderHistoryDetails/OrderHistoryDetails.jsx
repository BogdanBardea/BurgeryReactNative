import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Styles from './OrderHistoryDetails.styles';
import Separator from '../../../components/Separator/Separator';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../theme/colors';
import Button from '../../../components/Button/Button';
import IconButton from '../../../components/IconButton/IconButton';
import AsyncStorage from '@react-native-community/async-storage';

function OrderHistoryDetails({ route }) {
  const navigation = useNavigation();
  const [unavailable, setUnavailable] = useState(true);
  const { orderDate, orderItems } = route.params;

  useEffect(() => {
    for (let item of orderItems) {
      if (item.product_id !== 0) {
        setUnavailable(false);
        return;
      }
    }
  }, []);
  console.log(orderItems);
  function renderExtra(text) {
    if (text.length > 0) {
      return <Text style={Styles.extraText}>- {text}</Text>;
    }
  }

  function renderItems() {
    let items = [];
    let index = 0;
    for (let item of orderItems) {
      items.push(
        <View key={index} style={{ height: 60 }}>
          <View style={Styles.itemContainer}>
            <View>
              <Text style={Styles.itemText}>
                {item.quantity}x {item.product_name}
              </Text>
              {/* {renderExtra(item.extra)} */}
            </View>
            <Text style={Styles.priceText}>
              &euro;{parseFloat(item.product_price) * parseFloat(item.quantity)}
            </Text>
          </View>
          <Separator />
        </View>,
      );
      index++;
    }
    return items;
  }

  function calculatePrice() {
    let sum = 0;
    for (let item of orderItems) {
      sum += parseFloat(item.product_price) * parseFloat(item.quantity);
    }
    return parseFloat(sum, 10).toFixed(2);
  }

  function reorder() {
    const newCart = orderItems
      .map(item => ({
        ...item,
        name: item.product_name,
        price: item.product_price,
        id: item.product_id,
      }))
      .filter(item => item.id !== 0);
    AsyncStorage.setItem('cart', JSON.stringify(newCart)).then(
      navigation.navigate('HomeNavigation', { screen: 'Checkout' }),
    );
  }

  return (
    <View style={Styles.container}>
      <View style={Styles.card}>
        <View style={Styles.iconContainer}>
          <IconButton
            name="x-circle"
            size={22}
            color={Colors.white}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={{ marginLeft: 19 }}>
          <Text style={Styles.title}>BESTELLING {orderDate}</Text>
          <Text style={Styles.subTitle}>BESTELDE ITEMS</Text>
        </View>
        <Separator />
        {renderItems()}
        <View style={Styles.totalContainer}>
          <Text
            style={[
              Styles.priceText,
              {
                marginRight: 15,
              },
            ]}>
            SUBTOTAAL:
          </Text>
          <Text style={[Styles.priceText, Styles.priceBorder]}>
            &euro;{calculatePrice()}
          </Text>
        </View>
        <View style={Styles.buttonContainer}>
          <Button
            disabled={unavailable}
            color={Colors.primaryColor}
            title={unavailable ? 'Producten niet beschikbaar' : 'Herbestellen'}
            onPress={reorder}
          />
        </View>
      </View>
    </View>
  );
}

export default OrderHistoryDetails;
