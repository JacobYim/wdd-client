import { Dimensions, StyleSheet } from 'react-native';
import { color, font } from 'src/theme';

const { width, height } = Dimensions.get('window');

const signInHeight = 32;

export const views = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: height * 0.07,
    paddingBottom: 2,
  },
  logo: {
    width: width * 0.54,
    height: height * 0.05,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  signIn: {
    width: width * 0.432,
    height: signInHeight,
    marginTop: 20,
    borderColor: color.blue,
    borderWidth: 1,
    borderRadius: signInHeight / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vr: {
    width: 1,
    height: 12,
    backgroundColor: `${color.black}1A`,
    marginHorizontal: 12,
  },
});

export const texts = StyleSheet.create({
  signIn: {
    color: color.blue,
    fontSize: font.size.medium,
    fontWeight: 'bold',
  },
  bottom: {
    color: color.black33,
    fontSize: font.size.medium,
    fontWeight: '600',
  },
});
