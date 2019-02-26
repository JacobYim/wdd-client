import { StyleSheet, Dimensions } from 'react-native';
import { color, font } from 'src/theme';

const { width, height } = Dimensions.get('window');

const signInHeight = 32;

export const views = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: color.white,
  },
  wrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: height * 0.07,
  },
  bgImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  logo: {
    width: width * 0.54,
    height: height * 0.05,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  signIn: {
    width: 162,
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
});

export const texts = StyleSheet.create({
  signIn: {
    color: color.blue,
    fontSize: font.size.medium,
  },
  bottom: {
    color: color.black33,
    fontSize: font.size.medium,
  },
  vr: {
    color: color.black + '1A',
  },
});
