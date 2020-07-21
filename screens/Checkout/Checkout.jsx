import React, { useEffect, useState } from 'react';
import Styles from './Checkout.styles';
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../theme/colors';
import Separator from '../../components/Separator/Separator';
import Button from '../../components/Button/Button';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import BoxedTextInput from '../../components/textinputs/BoxedTextInput/BoxedTextInput';
import RadioButton from '../../components/RadioButton/RadioButton';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';
import { SwipeListView } from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-community/async-storage';
import {
  INPUT_BORDER_COLOR,
  INPUT_FOCUSED_BORDER_COLOR,
  INPUT_TEXT_COLOR,
  PLACEHOLDER_TEXT_COLOR,
} from '../Settings/EditProfile/EditProfile.styles';
import axios from 'axios';

function Checkout() {
  const [user, setUser] = useState({});
  const [isUser, isSetUser] = useState(false);
  const [paymentOption, setPaymentOption] = useState('0');
  const [deliveryAdress, setDeliveryAddress] = useState(0);
  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState({});
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [postcode, setPostcode] = useState('');
  const [place, setPlace] = useState('');
  const [deliveryType, setDeliveryType] = useState(0);
  const [time, setTime] = useState(); // if 0 = asap / if 1 => pick time interval
  const [deliveryTime, setDeliveryTime] = useState();
  const [userExist, setUserExist] = useState(false);
  const [oldPlace, setOldPlace] = useState('');
  const [oldStreet, setOldStreet] = useState('');
  const [oldPostcode, setOldPostcode] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const isFocused = useIsFocused();

  const getOrderDetails = async () => {
    try {
      const orderType = await AsyncStorage.getItem('type');
      const orderTime = await AsyncStorage.getItem('time');
      const orderDeliveryTime = await AsyncStorage.getItem('deliveryTime');
      if (
        orderDeliveryTime !== null &&
        orderTime !== null &&
        orderType !== null
      ) {
        setDeliveryType(JSON.parse(orderType));
        setTime(JSON.parse(orderTime));
        setDeliveryTime(JSON.parse(orderDeliveryTime));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getTokenFn = async () => {
    try {
      const getTokenFromAsyncStorage = await AsyncStorage.getItem('token');
      if (getTokenFromAsyncStorage !== null) {
        isSetUser(true);
        setToken(JSON.parse(getTokenFromAsyncStorage));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = async () => {
    try {
      const currentUser = JSON.parse(await AsyncStorage.getItem('user'));
      const postcodeFromStorage = JSON.parse(
        await AsyncStorage.getItem('postcode'),
      );
      if (currentUser != null) {
        setUser(currentUser);
        setUserExist(true);
        setName(currentUser.name);
        setLastName(currentUser.last_name);
        setPostcode(postcodeFromStorage);
        setPhone(currentUser.phone);
        setPlace(currentUser.place);
        setStreet(currentUser.street);
        setOldPlace(currentUser.place);
        setOldStreet(currentUser.street);
        setOldPostcode(currentUser.postcode);
      }
    } catch (err) {
      console.log(err);
    }
    console.log('name: ' + name);
    console.log('lastName: ' + lastName);
    console.log('phone: ' + phone);
    console.log('street: ' + street);
    console.log('postcode: ' + postcode);
    console.log('place: ' + place);
  };

  if (userExist === false) {
    getUser().then(console.log('User got on checkout'));
  }
  if (isUser === false) {
    getTokenFn().then(console.log('Token got on checkout'));
  }
  const getCoupon = async () => {
    try {
      const getCouponValue = await AsyncStorage.getItem('couponCode');
      if (getCouponValue != null) {
        setCoupon(JSON.parse(getCouponValue));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTokenFn().then(console.log('Token got on checkout'));
    getCoupon().then(console.log('Coupon got on checkout'));
    getUser().then(console.log('User got on checkout'));
    getOrderDetails().then(console.log('Order Details got on checkout'));
    if (isLoaded === false) {
      populateCart().then(console.log('Cart populated'));
    }
    // setNewState();
  }, [cart]);

  useEffect(() => {
    if (isLoaded === true) {
      populateCart().then(console.log('Cart populated'));
      getUser().then(console.log('User got on checkout'));
    }
  }, [isFocused]);

  async function populateCart() {
    let categoriesPromise = await AsyncStorage.getItem('categories');
    let cartPromise = await AsyncStorage.getItem('cart');
    if (categoriesPromise !== null) {
      setCategories(JSON.parse(categoriesPromise));
    }
    if (cartPromise !== null) {
      setCart(JSON.parse(cartPromise));
      setIsLoaded(true);
    }
    // console.log('Done...', cart)
  }

  const emailChange = text => {
    setEmail(text);
  };
  const emailFocus = () => {
    setEmailFocused(true);
    setPhoneFocused(false);
    setPasswordFocused(false);
  };
  const phoneChange = text => {
    setPhone(text);
  };
  const phoneFocus = () => {
    setEmailFocused(false);
    setPhoneFocused(true);
    setPasswordFocused(false);
  };

  const focusOn = nextFiled => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };

  function renderExtra(item) {
    const { sauces, options } = item;
    return sauces.map((sauce, index) => {
      const details = options.find(element => element.id === sauce);
      return (
        <View style={Styles.itemContainer} key={index}>
          <Text style={Styles.extraText}>- {details.name}</Text>
          <Text style={Styles.extraText}>&euro;{details.price}</Text>
        </View>
      );
    });
  }

  function removeItem(key) {
    setCart(oldCart => {
      let newCart = [...oldCart];
      newCart.splice(key, 1);
      AsyncStorage.setItem('cart', JSON.stringify(newCart))
        .then(() => console.log('New Cart Set'))
        .catch(err => console.log(err));
      return newCart;
    });
  }

  function renderItems() {
    return (
      <SwipeListView
        data={cart}
        keyExtractor={(item, index) => index.toString()} //Ii trebuie string, ca key e numar
        renderItem={(data, rowMap) => (
          <View style={{ height: 70, backgroundColor: '#1C1C1C' }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <View style={Styles.itemContainer}>
                <Text style={Styles.itemText}>
                  {data.item.quantity}x {data.item.name}
                </Text>
                <Text style={Styles.priceText}>&euro;{data.item.price}</Text>
              </View>
              {data.item.sauces != null ? renderExtra(data.item) : <View />}
            </View>
            <Separator color="rgba(255, 255, 255, 0.7)" />
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <TouchableOpacity
            style={{
              height: 70,
              backgroundColor: '#C40B0B',
              width: '100%',
              alignItems: 'center',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingLeft: 15,
            }}
            onPress={() => {
              console.log(data);
              rowMap[data.index].closeRow();
              removeItem(data.index);
            }}>
            <Text
              style={{
                color: Colors.white,
                textAlign: 'center',
                width: 151,
              }}>
              Verwijderen
            </Text>
          </TouchableOpacity>
        )}
        rightOpenValue={-151}
        disableRightSwipe={true}
        closeOnRowPress={true}
      />
    );
  }

  function calculatePrice() {
    let sum = 0;
    for (let item of cart) {
      sum += item.price * item.quantity;
      if (item.sauces != null) {
        for (let i of item.sauces) {
          let sauce = item.options.find(element => element.id === i);
          sum += sauce.price;
        }
      }
    }
    return parseFloat(sum, 10).toFixed(2);
  }

  function calculatePriceWihtDiscount() {
    let price = calculatePrice();
    const discount = coupon.value;
    if (coupon && coupon.min_total) {
      if (coupon.min_total <= price) {
        return coupon.type === 0
          ? (price - discount).toFixed(2)
          : (price - (discount / 100) * price).toFixed(2);
      } else {
        return price;
      }
    } else {
      return price;
    }
  }

  function selectDeliveryAdress() {
    if (!deliveryType && isUser) {
      return (
        <View>
          <View style={Styles.sectionTitle}>
            <Text style={Styles.subTitle}>LEVERING</Text>
          </View>
          <Separator color="rgba(255, 255, 255, 0.7)" />
          <View style={{ marginLeft: 19, marginVertical: 18 }}>
            <RadioButton
              size={25}
              title="Standaard adres"
              subTitle={`${oldStreet} ${oldPostcode}, ${oldPlace}`}
              checked={deliveryAdress === 0}
              onPress={() => setDeliveryAddress(0)}
            />
          </View>
          <Separator color="rgba(255, 255, 255, 0.7)" />
          <View style={{ marginLeft: 19, marginVertical: 18 }}>
            <RadioButton
              size={25}
              title="Nieuw adres toevoegen"
              checked={deliveryAdress === 1}
              onPress={() => {
                navigation.navigate('NewAdress');
                setDeliveryAddress(1);
              }}
            />
          </View>
          <Separator color="rgba(255, 255, 255, 0.7)" />
          <View style={{ height: 30 }} />
        </View>
      );
    }
  }

  function renderForm() {
    if (!isUser) {
      return (
        <View style={Styles.form}>
          <Text style={Styles.fieldInformations}>Voornam</Text>
          <UnderlineTextInput
            onChangeText={value => setLastName(value)}
            returnKeyType="next"
            blurOnSubmit={false}
            keyboardType="default"
            placeholder=""
            placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
            inputTextColor={INPUT_TEXT_COLOR}
            borderColor={INPUT_BORDER_COLOR}
            focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
            inputContainerStyle={Styles.inputContainer}
          />
          <Text style={Styles.fieldInformations}>Naam</Text>
          <UnderlineTextInput
            onChangeText={value => setName(value)}
            returnKeyType="next"
            blurOnSubmit={false}
            keyboardType="default"
            placeholder=""
            placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
            inputTextColor={INPUT_TEXT_COLOR}
            borderColor={INPUT_BORDER_COLOR}
            focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
            inputContainerStyle={Styles.inputContainer}
          />
          <Text style={Styles.fieldInformations}>E-MAIL</Text>
          <UnderlineTextInput
            onChangeText={emailChange}
            returnKeyType="next"
            blurOnSubmit={false}
            keyboardType="email-address"
            placeholder=""
            placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
            inputTextColor={INPUT_TEXT_COLOR}
            borderColor={INPUT_BORDER_COLOR}
            focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
            inputContainerStyle={Styles.inputContainer}
          />
          <Text style={Styles.fieldInformations}>GSM-NUMMER</Text>
          <UnderlineTextInput
            onChangeText={value => setPhone(value)}
            returnKeyType="next"
            blurOnSubmit={false}
            keyboardType="phone-pad"
            placeholder=""
            placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
            inputTextColor={INPUT_TEXT_COLOR}
            borderColor={INPUT_BORDER_COLOR}
            focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
            inputContainerStyle={Styles.inputContainer}
            inlineImageLeft="../../assets/./img/./Rectangle_7.png"
          />
          <View>
            <Text style={Styles.fieldInformations}>STRAAT EN HUISNUMMER</Text>
            <UnderlineTextInput
              onChangeText={value => setStreet(value)}
              returnKeyType="next"
              blurOnSubmit={false}
              keyboardType="default"
              placeholder=""
              placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
              inputTextColor={INPUT_TEXT_COLOR}
              borderColor={INPUT_BORDER_COLOR}
              focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
              inputContainerStyle={Styles.inputContainer}
            />
            <Text style={Styles.fieldInformations}>POSTCODE</Text>
            <UnderlineTextInput
              onChangeText={value => setPostcode(value)}
              returnKeyType="next"
              blurOnSubmit={false}
              keyboardType="numeric"
              placeholder=""
              placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
              inputTextColor={INPUT_TEXT_COLOR}
              borderColor={INPUT_BORDER_COLOR}
              focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
              inputContainerStyle={Styles.inputContainer}
            />
            <Text style={Styles.fieldInformations}>GEMEENTE</Text>
            <UnderlineTextInput
              onChangeText={value => setPlace(value)}
              returnKeyType="next"
              blurOnSubmit={false}
              keyboardType="default"
              placeholder=""
              placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
              inputTextColor={INPUT_TEXT_COLOR}
              borderColor={INPUT_BORDER_COLOR}
              focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
              inputContainerStyle={Styles.inputContainer}
            />
          </View>
          <View style={{ height: 30 }} />
        </View>
      );
    }
  }

  const checkData = () => {
    if (name && lastName && phone && street && postcode && place) {
      return true;
    } else {
      return false;
    }
  };

  function prepareCart(cart) {
    const products = [];
    const sauces = [];
    for (let item of cart) {
      let obj = item;
      products.push(obj);
      if (item.sauces != null) {
        for (let sauce of item.sauces) {
          if (obj !== undefined)
            sauces.push(obj.options.find(element => element.id === sauce));
        }
      }
    }
    return { products, sauces };
  }

  const redirect = async (root, screen) => {
    try {
      await AsyncStorage.removeItem('cart');
      setTimeout(() => {
        navigation.navigate(root, { screen: `${screen}` });
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };

  function sendOrder() {
    // console.log(user);

    if (cart.length == 0) {
      alert('Gelieve eerst producten toe te voegen aan uw winkelwagen!');
    }
    if (!checkData()) {
      alert('Gelieve uw adres gegevens in te vullen!');
      return;
    }

    // adress took from logged in user !!! at least thats what I hope :)
    console.log('#######SEND ORDER INFO############');

    const { products, sauces } = prepareCart(cart);
    console.log('name: ' + name);
    console.log('lastName: ' + lastName);
    console.log('phone: ' + phone);
    console.log('street: ' + street);
    console.log('postcode: ' + postcode);
    console.log('place: ' + place);
    console.log('paymentType: ' + paymentOption);
    console.log('deliveryType: ' + deliveryType);
    console.log('time: ' + deliveryTime);
    console.log('deliveryTime: ' + time);
    console.log('couponId: ', coupon.id);
    console.log('products: ', products);
    console.log('sauces: ', sauces);
    console.log('token: ', token);

    console.log('##################################');

    axios
      .post('http://burgery.online/api/create_order_mobile', {
        // user token
        token: isUser ? token : '',
        // order details
        paymentType: paymentOption,
        deliveryType: deliveryType === 0 ? 2 : deliveryType,
        time: deliveryTime,
        deliveryTime: time,
        // user details
        name: name,
        last_Name: lastName,
        phone: phone,
        street: street,
        postcode: postcode,
        place: place,
        products: products,
        sauces: sauces,
        coupon_id: coupon.id,
      })
      .then(res => {
        // console.log('this is the url: ', res);
        AsyncStorage.setItem(
          'orderWaitingId',
          JSON.stringify(res.data.order_id),
        ).then(() => {
          if (paymentOption == 1) {
            // open payment modal <3
            // setPayUrl(res.data.payment_url);
            // setPaying(1);
            // // alert(res.data.order_id);
            // setPayingId(res.data.order_id);
            // AsyncStorage.setItem('payingId', JSON.stringify(res.data.order_id));
            // AsyncStorage.setItem('paying', JSON.stringify(1));
            Linking.openURL(res.data.payment_url);
            // handleShow();
          } else {
            // AsyncStorage.removeItem('cart');
            alert('Dank u voor uw bestelling!');
          }
          // redirect to thank you page
          redirect('MyOrdersNavigation', 'Delivery').then(
            'Went to Delivery Screen!',
          );
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <ScrollView style={Styles.card}>
      <View style={Styles.sectionTitle}>
        <Text style={Styles.title}>AFREKENEN</Text>
        <Text style={Styles.subTitle}>WINKELWAGEN</Text>
      </View>
      <Separator color="rgba(255, 255, 255, 0.7)" />
      {isLoaded ? renderItems() : console.log('the cart is empty')}
      <View style={Styles.bottomContainer}>
        <Button
          title="COUPON?"
          textStyle={{
            fontSize: 14,
            lineHeight: 17,
            fontWeight: 'bold',
            color: Colors.primaryColor,
          }}
          buttonStyle={{ backgroundColor: 'transparent', width: 96 }}
          onPress={() => navigation.navigate('CouponModal')}
        />
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
            &euro;{calculatePriceWihtDiscount()}
          </Text>
        </View>
      </View>
      <View style={{ marginHorizontal: 19, marginBottom: 24 }}>
        <Text style={Styles.subTitle}>OPMERKING</Text>
        <BoxedTextInput
          backgroundColor={Colors.inputBackground}
          placeholder="Vul hier opmerkingen toe voor uw bestelling. (bv: bel werkt niet)."
          placeholderTextColor="#8B8B8B"
          multiline={true}
          inputContainerStyle={{ marginTop: 0 }}
          inputStyle={{ height: 80, paddingRight: 20 }}
          borderColor="#EEEEEE"
          numberOfLines={4}
        />
      </View>
      {selectDeliveryAdress()}
      {renderForm()}
      <View style={Styles.sectionTitle}>
        <Text style={Styles.subTitle}>BETALING</Text>
      </View>
      <Separator color="rgba(255, 255, 255, 0.7)" />
      <View style={{ marginLeft: 19, marginVertical: 18 }}>
        <RadioButton
          size={25}
          title="Betaling ter plaatse"
          checked={paymentOption === '0'}
          onPress={() => setPaymentOption('0')}
        />
      </View>
      <Separator color="rgba(255, 255, 255, 0.7)" />
      <View style={{ marginLeft: 19, marginVertical: 18 }}>
        <RadioButton
          size={25}
          title="Online betaling"
          checked={paymentOption === '1'}
          onPress={() => setPaymentOption('1')}
        />
      </View>
      <Separator color="rgba(255, 255, 255, 0.7)" />
      <View style={Styles.buttonContainer}>
        <Button
          color={Colors.primaryColor}
          disabled={cart.length === 0}
          title={cart.length === 0 ? 'Winkelwagen is leeg' : 'Nu bestellen'}
          onPress={sendOrder}
        />
      </View>
    </ScrollView>
  );
}

export default Checkout;
