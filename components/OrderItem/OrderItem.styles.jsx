import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#323232',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: 5,
    marginLeft: 26,
    marginRight: 34,
    marginTop: 24,
    padding: 11,
  },
  cardInterior: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 20,
    display: 'flex',
    alignItems: 'center',
    letterSpacing: -0.3,
    color: '#fff',
  },
  priceText: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 20,
    display: 'flex',
    textAlign: 'right',
    letterSpacing: -0.3,
    color: '#F2A83B',
    justifyContent: 'flex-end',
    marginRight: 20,
  },
  borderOrange: {
    backgroundColor: '#F2A83B',
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 10,
  },
  priceTextBorder: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 20,
    display: 'flex',
    textAlign: 'right',
    letterSpacing: -0.3,
    color: '#FFF',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});

export default styles;
