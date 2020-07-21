import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    top: 120,
    marginHorizontal: 15,
  },
  modalView: {
    width: '100%',
    margin: 20,
    backgroundColor: '#202020',
    shadowColor: '#000',
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 5,
    paddingBottom: 30,
  },
  openButton: {
    alignItems: 'flex-end',
    marginRight: 5,
    marginBottom: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  priceText: {
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 24,
    lineHeight: 29,
    display: 'flex',
    alignItems: 'flex-end',
    textAlign: 'right',
    letterSpacing: -0.3,
    color: '#F2A83B',
  },

  titleNameText: {
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 24,
    lineHeight: 29,
    display: 'flex',
    alignItems: 'center',
    letterSpacing: -0.3,
    color: '#FFFFFF',
    marginBottom: 10,
  },

  titleText: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
  },

  subTitleNameText: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 17,
    display: 'flex',
    alignItems: 'center',
    letterSpacing: -0.3,
    color: '#BFBFBF',
    marginBottom: 5,
  },
  subTitleNameTextSecond: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 17,
    display: 'flex',
    alignItems: 'center',
    letterSpacing: -0.3,
    color: '#BFBFBF',
    marginBottom: 5,
    marginTop: 36,
  },

  separator: {
    flexShrink: 1,
    width: 325,
    borderBottomWidth: 1,
    borderColor: 'rgba(68, 68, 68, 0.7)',
    marginBottom: 9,
  },

  toppingTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  toppingsText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 17,
    display: 'flex',
    alignItems: 'center',
    letterSpacing: -0.3,
    color: '#FFFFFF',
    marginBottom: 9,
    marginTop: 6,
  },

  toppingPriceText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 17,
    display: 'flex',
    alignItems: 'center',
    letterSpacing: -0.3,
    color: '#FFFFFF',
    marginTop: 9,
  },

  buttonsStyleFirst: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 39,
  },

  buttonsStyleSecond: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    display: 'flex',
  },
});

export default styles;
