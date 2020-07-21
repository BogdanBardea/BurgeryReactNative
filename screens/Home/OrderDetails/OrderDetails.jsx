import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Button from '../../../components/Button/Button';
import Colors from '../../../theme/colors';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Moment from 'moment';

console.disableYellowBox = true;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  logoContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonsGroup: {
    flex: 4,
    alignItems: 'center',
    // paddingHorizontal: 20,
  },
  buttonsGroup2: {
    // flex: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  vspace5: {
    height: 5,
  },
  vspace32: {
    height: 32,
  },
  linkButtonText: {
    color: Colors.onSurface,
    textAlign: 'center',
  },
  headerTextContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 25,
    lineHeight: 30,
    color: '#fff',
    fontFamily: 'serif',
    paddingTop: 75,
  },
  subHeaderText: {
    fontSize: 16,
    lineHeight: 19,
    color: '#fff',
    opacity: 0.8,
  },
  hourActive: {
    backgroundColor: '#F2A83B',
    width: 70,
  },
  hourInactive: {
    backgroundColor: '#000000',
    width: 70,
    borderRadius: 0,
  },
});

export default function WelcomeA({ route }) {
  const [deliveryType, setDeliveryType] = useState(0);
  const [deliveryTime, setDeliveryTime] = useState(0); // 0 is asap
  const [times, setTimes] = useState([]);
  const [delivery, setDelivery] = useState(new Date());
  const navigation = useNavigation();
  const [pickATime, setPickATime] = useState(false);
  const pickTime = value => {
    Moment.locale('en');
    const dateParsed = Moment(value).format('LLLL');
    console.log('date parsed:', dateParsed);
    setDelivery(dateParsed);
  };

  const spawnHours = () => {
    var date = new Date();
    // date is behind with 3 hrs for no reason :(
    // date = new Date(date.getTime() + 180 * 60000);
    // date = new Date(date.getTime() + 30 * 60000);

    if (times.length === 0) {
      if (date.getMinutes() <= 30) {
        var diff = 30 - date.getMinutes();

        date = new Date(date.getTime() + diff * 60000);
        // console.log(times);
        // console.log('da1');

        var date_element = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          value: date,
        };
        date = new Date(date.getTime() + 30 * 60000);
        var new_times = [...times, date_element];
        // console.log(date);
        // console.log('da');
        var date_element = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          value: date,
        };
        date = new Date(date.getTime() + 30 * 60000);
        new_times = [...new_times, date_element];
        // console.log(date);
        // console.log('da');

        var date_element = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          value: date,
        };
        date = new Date(date.getTime() + 30 * 60000);
        new_times = [...new_times, date_element];
        // console.log(date);
        // console.log('da');

        var date_element = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          value: date,
        };
        date = new Date(date.getTime() + 30 * 60000);
        new_times = [...new_times, date_element];
        // console.log(date);
        // console.log('da');

        var date_element = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          value: date,
        };
        date = new Date(date.getTime() + 30 * 60000);
        new_times = [...new_times, date_element];
        // console.log(date);
        // console.log('da');

        var date_element = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          value: date,
        };
        date = new Date(date.getTime() + 30 * 60000);
        new_times = [...new_times, date_element];
        // console.log(date);
        // console.log('da');

        var date_element = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          value: date,
        };
        date = new Date(date.getTime() + 30 * 60000);
        new_times = [...new_times, date_element];
        // console.log(date);
        // console.log('da');

        var date_element = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          value: date,
        };
        date = new Date(date.getTime() + 30 * 60000);
        new_times = [...new_times, date_element];
        // console.log(date);
        // console.log('da');

        setTimes(new_times);
        // setTimes(new_times);
      } else {
        var diff = 60 - date.getMinutes();

        date = new Date(date.getTime() + diff * 60000);
        // console.log(times);
        // console.log('da1');

        var date_element = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          value: date,
        };
        date = new Date(date.getTime() + 30 * 60000);
        var new_times = [...times, date_element];
        // console.log(date);
        // console.log('da');
        var date_element = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          value: date,
        };
        date = new Date(date.getTime() + 30 * 60000);
        new_times = [...new_times, date_element];
        // console.log(date);
        // console.log('da');

        var date_element = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          value: date,
        };
        date = new Date(date.getTime() + 30 * 60000);
        new_times = [...new_times, date_element];
        // console.log(date);
        // console.log('da');

        var date_element = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          value: date,
        };
        date = new Date(date.getTime() + 30 * 60000);
        new_times = [...new_times, date_element];
        // console.log(date);
        // console.log('da');

        var date_element = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          value: date,
        };
        date = new Date(date.getTime() + 30 * 60000);
        new_times = [...new_times, date_element];
        // console.log(date);
        // console.log('da');

        var date_element = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          value: date,
        };
        date = new Date(date.getTime() + 30 * 60000);
        new_times = [...new_times, date_element];
        // console.log(date);
        // console.log('da');

        var date_element = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          value: date,
        };
        date = new Date(date.getTime() + 30 * 60000);
        new_times = [...new_times, date_element];
        // console.log(date);
        // console.log('da');

        var date_element = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          value: date,
        };
        date = new Date(date.getTime() + 30 * 60000);
        new_times = [...new_times, date_element];
        // console.log(date);
        // console.log('da');

        setTimes(new_times);
      }
    }
  };

  // spawnHours();

  const updateAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem('type', JSON.stringify(deliveryType));
      await AsyncStorage.setItem('time', JSON.stringify(delivery));
      await AsyncStorage.setItem('deliveryTime', JSON.stringify(deliveryTime));
      spawnHours();
    } catch (err) {
      console.log(err);
    }
  };
  // update AsyncStorage
  updateAsyncStorage();

  const handleSubmit = () => {
    if (delivery === new Date()) {
      //ok - asap case
    } else {
      if (deliveryTime == 1 && pickATime == false) {
        alert('Gelieve een tijdslot te kiezen!');
        return;
      }
    }
    updateAsyncStorage();
    navigation.navigate('Menu');
  };

  let { params } = route;
  // TODO fix this hack
  const isFocused = useIsFocused();
  if (isFocused) {
    params.setTitle('Kies uw bestelwijze');
    params.setSubTitle('');
  } else {
    return <View />;
  }

  return (
    <View style={styles.buttonsGroup}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          borderRadius: 10,
          backgroundColor: '#464646',
        }}>
        <Button
          buttonStyle={{
            backgroundColor: deliveryType === 0 ? '#F2A83B' : '#464646',
            width: '50%',
          }}
          onPress={() => setDeliveryType(0)}
          title={'LEVERING'}
        />
        <Button
          buttonStyle={{
            backgroundColor: deliveryType === 0 ? '#464646' : '#F2A83B',
            width: '50%',
            zIndex: 1,
          }}
          onPress={() => setDeliveryType(1)}
          title={'AFHAAL'}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 30,
          marginBottom: 20,
          marginHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          backgroundColor: '#464646',
        }}>
        <Button
          buttonStyle={{
            backgroundColor: deliveryTime === 0 ? '#F2A83B' : '#464646',
            width: '50%',
          }}
          onPress={() => setDeliveryTime(0)}
          title={'ZO SNEL MOGELIJK'}
        />
        <Button
          buttonStyle={{
            backgroundColor: deliveryTime === 0 ? '#464646' : '#F2A83B',
            width: '50%',
            zIndex: 1,
          }}
          onPress={() => {
            setDeliveryTime(1);
            spawnHours();
          }}
          title={'LATER VANDAAG'}
        />
      </View>

      <View
        style={{
          marginTop: 20,
          marginLeft: 20,
          height: deliveryTime === 0 ? 0 : 50,
        }}>
        <ScrollView horizontal={true}>
          {times.map((time, index) => {
            return (
              <Button
                key={index}
                onPress={() => {
                  setPickATime(true);
                  pickTime(time.value);
                }}
                buttonStyle={
                  delivery === Moment(time.value).format('LLLL')
                    ? styles.hourActive
                    : styles.hourInactive
                }
                title={
                  time.hour + ':' + (time.minutes === 0 ? '00' : time.minutes)
                }
              />
            );
          })}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 30,
          marginBottom: 20,
          paddingHorizontal: 20,
        }}>
        <Button
          buttonStyle={{ backgroundColor: '#F2A83B' }}
          onPress={handleSubmit}
          title={'Start bestelling'}
        />
      </View>
    </View>
  );
}
