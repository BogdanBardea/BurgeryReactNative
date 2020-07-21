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
    marginRight: 10,
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
    marginBottom: 30,
    marginLeft: 30,
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

  couponInput: {
    backgroundColor: '#606060',
    borderRadius: 5,
    width: 305,
    height: 51,
    borderStyle: 'solid',
    borderColor: '#F3F3F3',
    borderWidth: 1,
    color: 'white',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 19,
    display: 'flex',
    alignItems: 'center',
    padding: 10,
  },

  couponInputForm: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  couponWinText: {
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 24,
    lineHeight: 29,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: -0.3,
    marginTop: 25,
    color: '#F1F1F1',
  },
});

export default styles;
