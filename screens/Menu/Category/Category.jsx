import React, { useState } from 'react';
import Styles from './Category.styles';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../../theme/colors';
import { useNavigation } from '@react-navigation/native';

function Category({ route }) {
  const navigation = useNavigation();
  const [productItem, setProductItem] = useState({});
  let items = route.params.items;

  function renderTags(tags) {
    let renderedTags = [];
    for (let tag of tags) {
      renderedTags.push(
        <View
          key={tag.id}
          style={{
            borderRadius: 10,
            backgroundColor: tag.color,
            marginRight: 6,
          }}>
          <Text
            style={{
              fontSize: 12,
              letterSpacing: -0.3,
              color: Colors.white,
              fontWeight: 'bold',
              marginVertical: 1,
              marginHorizontal: 8,
              textTransform: 'uppercase',
            }}>
            {tag.name}
          </Text>
        </View>,
      );
    }
    return renderedTags;
  }

  // const productSelected = async (product) => {
  //   setProductItem(product);
  //   await AsyncStorage.setItem('productItem', JSON.stringify(product));
  //   navigation.navigate('MenuOptions')
  // }

  function renderCards() {
    let renderedCards = [];
    items.map(product => {
      renderedCards.push(
        <TouchableOpacity
          style={Styles.cardContainer}
          key={product.id}
          onPress={() => {
            navigation.navigate('MenuOptions', product);
          }}>
          <View style={Styles.cardInterior}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={Styles.cardTitle}>{product.name}</Text>
              {renderTags(product.tags)}
            </View>
            <Text style={Styles.priceText}>€{product.price}</Text>
          </View>
          <Text style={Styles.cardContentText}>{product.description}</Text>
        </TouchableOpacity>,
      );
    });
    return renderedCards;
  }

  return (
    <ScrollView
      style={{
        resizeMode: 'contain',
        backgroundColor: '#1C1C1C',
        flex: 1,
      }}>
      <StatusBar
        backgroundColor={Colors.statusBarColor}
        barStyle="light-content"
      />
      {renderCards()}
    </ScrollView>
  );
}

export default Category;
