import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './MenuOptions.style';
import Separator from '../../../components/Separator/Separator';
import Button from '../../../components/Button/Button';
import CancelButton from '../../../components/CancelButton/CancelButton';
import { useNavigation } from '@react-navigation/native';
import Styles from '../../Register/Register.styles';
import Colors from '../../../theme/colors';
import RoundCheckbox from 'rn-round-checkbox';
import AsyncStorage from '@react-native-community/async-storage';

const MenuOptions = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(1);
  const [ticked, setTicked] = useState([]);
  const navigation = useNavigation();

  const product = route.params;

  useEffect(() => {
    let renderTicked = [];
    if (product.option_category != null) {
      for (let i in product.option_category.suboptions) {
        renderTicked.push(false);
      }
    }
    setTicked(renderTicked);
  }, []);

  function renderOptionEntries(mandatory, suboptions) {
    let renderedOptions = [];
    let index = 0;
    for (let option of suboptions) {
      renderedOptions.push(
        <View key={option.id}>
          <View style={styles.titleText}>
            <View>
              <Text style={styles.toppingsText}>{option.name}</Text>
            </View>
            <View
              style={{
                height: '100%',
                flexDirection: 'row',
              }}>
              <Text style={styles.toppingPriceText}>€{option.price}</Text>
              <View style={{ marginVertical: 6, marginLeft: 24 }}>
                {mandatory == 0 ? (
                  <RoundCheckbox
                    style={Styles.checkbox}
                    size={18}
                    checked={ticked[option.id]}
                    onValueChange={value =>
                      setTicked(prevTicked => {
                        let copyData = [...prevTicked];
                        copyData[option.id] = value;
                        return copyData;
                      })
                    }
                    backgroundColor={Colors.primaryColor}
                    iconColor={Colors.black}
                  />
                ) : (
                  <TouchableOpacity
                    style={{
                      height: 18,
                      width: 18,
                      backgroundColor:
                        selected == option.id ? Colors.primaryColor : '#A2A2A2',
                      borderRadius: 180,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => setSelected(option.id)}>
                    <View
                      style={{
                        height: 18 / 1.3,
                        width: 18 / 1.3,
                        backgroundColor:
                          selected == option.id
                            ? Colors.primaryColor
                            : '#A2A2A2',
                        borderRadius: 180,
                        borderWidth: 3,
                        borderColor: Colors.black,
                      }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
          <Separator />
        </View>,
      );
      index++;
    }
    return renderedOptions;
  }

  function renderProductOptions() {
    if (product.option_category == null) return;
    return (
      <View>
        <View style={styles.toppingTitle}>
          <View>
            <Text style={styles.subTitleNameText}>
              {product.option_category.name}
            </Text>
          </View>
        </View>
        <Separator />
        {renderOptionEntries(
          product.option_category.mandatory,
          product.option_category.suboptions,
        )}
      </View>
    );
  }

  async function addToCart() {
    let order = {
      category_id: product.category_id,
      id: product.id,
      quantity: 1,
      name: product.name,
      option_category_id: product.option_category_id,
      image: product.image,
      price: product.price,
      description: product.description,
      created_at: product.created_at,
      updated_at: product.updated_at,
      deleted_at: product.deleted_at,
      options: product.options,
      option_category: product.option_category,
      tags: product.tags,
    };
    if (product.option_category != null) {
      if (product.option_category.mandatory) order.sauces = [selected];
      else {
        let sauces = [];
        for (let i in ticked) {
          if (ticked[i]) {
            sauces.push(parseInt(i));
          }
        }
        console.log('Processed sauces: ', sauces);
        if (sauces.length !== 0) order.sauces = sauces;
      }
    }
    console.log('Sauces Added: ', order.sauces);
    let cart = JSON.parse(await AsyncStorage.getItem('cart'));
    if (cart == null) cart = [];
    cart.push(order);
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
    navigation.goBack();
  }

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <TouchableOpacity
          style={{ ...styles.openButton }}
          onPress={() => {
            navigation.goBack();
          }}>
          <View>
            <Image source={require('../../../assets/CloseButton.png')} />
          </View>
        </TouchableOpacity>
        <View style={styles.titleText}>
          <View>
            <Text style={styles.titleNameText}>{product.name}</Text>
          </View>
          <View>
            <Text style={styles.priceText}>€{product.price}</Text>
          </View>
        </View>
        {renderProductOptions()}
        <View style={styles.buttonsStyleFirst}>
          <Button title={'Toevoegen'} onPress={addToCart} />
        </View>
        <View style={styles.buttonsStyleSecond}>
          <CancelButton
            title={'Annuleren'}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </View>
  );
};

export default MenuOptions;
