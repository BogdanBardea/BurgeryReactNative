import {StyleSheet} from 'react-native';
import Colors from '../../../theme/colors';

export const PLACEHOLDER_TEXT_COLOR = 'rgba(255, 255, 255, 0.4)';
export const INPUT_TEXT_COLOR = 'rgba(255, 255, 255, 0.87)';
export const INPUT_BORDER_COLOR = 'rgba(255, 255, 255, 0.2)';
export const INPUT_FOCUSED_BORDER_COLOR = '#F3F3F3';
export const INPUT_BACKGROUND_COLOR = '#606060';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  logoContainer: {
    flex: 3,
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
  inputContainer: {
    marginBottom: 7,
    marginTop: 30,
  },
});
export default styles;
