import React from 'react';
import {StyleSheet} from 'react-native';
import Colors from 'react-native/Libraries/NewAppScreen/components/Colors';
import Layout from '../../../theme/layout';

const styles = StyleSheet.create({
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 29,
    fontStyle: 'normal',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: 'bold',
    color: '#858585',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    top: 120,
    marginHorizontal: 15,
  },
  card: {
    backgroundColor: '#202020',
    borderRadius: 5,
    width: '100%',
  },
  iconContainer: {
    alignItems: 'flex-end',
    margin: 15,
    marginBottom: 1,
  },
  priceText: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: 'bold',
    color: Colors.white,
  },
  priceBorder: {
    borderWidth: 2,
    borderColor: '#BBBBBB',
    borderRadius: 5,
    paddingTop: 11,
    paddingBottom: 5,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 6,
    marginTop: 15,
    marginBottom: 21,
  },
  extraText: {
    color: '#898989',
    fontSize: 14,
    lineHeight: 17,
    marginLeft: 15,
  },
  itemText: {
    color: Colors.white,
    fontSize: 16,
    lineHeight: 19,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 19,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  form: {
    marginHorizontal: Layout.LARGE_PADDING,
  },
  fieldInformations: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    display: 'flex',
    alignItems: 'center',
    color: '#858585',
    marginTop: 16,
    textTransform: 'uppercase',
  },
  inputContainer: {
    marginBottom: 1,
    marginTop: 10,
    height: 28,
    paddingLeft: 0,
  },
});

export default styles;
