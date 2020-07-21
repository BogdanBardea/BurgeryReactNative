import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Category from './Category/Category';
import Colors from '../../theme/colors';
import { SafeAreaView, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Button from '../../components/Button/Button';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from 'axios';

const Tab = createMaterialTopTabNavigator();

export default function CategoriesA() {
  const navigation = useNavigation();
  const [categoriesFromStorage, setCategoriesFromStorage] = useState([]);
  const [categories, setCategories] = useState([]);
  const isFocused = useIsFocused();
  const [cartSize, setCartSize] = useState(0);

  useEffect(() => {
    if (isFocused === true) {
      AsyncStorage.getItem('cart').then(value => {
        if (value == null) {
          setCartSize(0);
          return;
        }
        const cart = JSON.parse(value);
        let sum = 0;
        for (let item of cart) {
          sum += item.quantity;
        }
        setCartSize(sum);
      });
    }
  }, [isFocused]);

  const setCategoriesToAsyncStorage = async categories => {
    try {
      await AsyncStorage.setItem('categories', JSON.stringify(categories));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = () => {
    axios
      .get('http://burgery.online/api/all_categories')
      .then(res => {
        setCategories(res.data.categories);
        setCategoriesToAsyncStorage(res.data.categories).then(() =>
          console.log('Categories in Menu.jsx set'),
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
    getCategoriesFromStorageFn().then(() =>
      console.log('Categories in Menu.jsx got'),
    );
    // getCartLength();
  }, []);

  const getCategoriesFromStorageFn = async () => {
    try {
      const item = await AsyncStorage.getItem('categories');
      if (item !== null) {
        setCategoriesFromStorage(JSON.parse(item));
      }
    } catch (err) {
      console.log(err);
    }
  };

  function renderCategories() {
    let components = [];
    for (let item of categories) {
      components.push(
        <Tab.Screen
          key={item.id}
          name={item.name}
          component={Category}
          initialParams={{ items: item.items }}
        />,
      );
    }
    return components;
  }

  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        backgroundColor: '#262626',
      }}>
      {categories.length > 0 ? (
        <Tab.Navigator
          tabBarOptions={{
            scrollEnabled: true,
            tabStyle: {
              width: 100,
              height: 40,
            },
            labelStyle: {
              fontWeight: '500',
              fontSize: 15,
              lineHeight: 18,
              letterSpacing: -0.3,
            },
            style: {
              backgroundColor: '#262626',
            },
            activeTintColor: Colors.primaryColor,
            inactiveTintColor: '#ADADAD',
            indicatorStyle: {
              backgroundColor: Colors.primaryColor,
            },
            sceneContainerStyle: {
              backgroundColor: '#1C1C1C',
            },
          }}>
          {renderCategories()}
        </Tab.Navigator>
      ) : (
        <View />
      )}
      <Button
        borderRadius={180}
        title={cartSize.toString()}
        socialIconName="shopping-cart"
        iconColor={Colors.white}
        iconSize={24}
        textStyle={{
          position: 'absolute',
          fontWeight: 'bold',
          fontSize: 20,
          lineHeight: 24,
          letterSpacing: -0.3,
          alignItems: 'center',
          left: 48,
        }}
        buttonStyle={{
          width: 80,
          height: 80,
          position: 'absolute',
          bottom: 18,
          right: 10,
        }}
        onPress={() => navigation.navigate('Checkout')}
      />
    </SafeAreaView>
  );
}
