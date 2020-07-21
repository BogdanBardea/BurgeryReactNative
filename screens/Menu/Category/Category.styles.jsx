import React from 'react';
import {StyleSheet} from 'react-native';
import Color from 'color';
import Colors from '../../../theme/colors';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    marginTop: 50,
  },
  card: {
    marginVertical: 6,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 4,
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
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

  cardInterior: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cardOverlay: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: Color(Colors.overlayColor).alpha(0.2),
    overflow: 'hidden',
  },
  cardContainer: {
    backgroundColor: '#323232',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 24,
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },

  cardContentText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.3,
    color: '#A6A6A6',
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
    marginRight: 6,
    textTransform: 'uppercase',
  },
});
export default styles;
