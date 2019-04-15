import { Dimensions, StyleSheet } from 'react-native';
import { color, font } from 'src/theme';

const { width } = Dimensions.get('window');

export const views = StyleSheet.create({
  topWrapper: {
    alignItems: 'flex-end',
    padding: 44,
  },
  bottomWrapper: {
    marginTop: 'auto',
    flexDirection: 'row',
    paddingHorizontal: 45,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const icons = StyleSheet.create({
  logo: {
    width: width * 0.309,
    height: width * 0.053,
    resizeMode: 'contain',
  },
  go: {
    width: 90,
    height: 48,
  },
  time: {
    width: 19,
    height: 18,
  },
  distance: {
    width: 14,
    height: 19,
  },
  poo: {
    width: 18,
    height: 17,
  },
  pee: {
    width: 10,
    height: 17,
  },
});

export const texts = StyleSheet.create({
  info: {
    marginLeft: 6,
    color: color.white,
    fontSize: font.size.medium,
  },
  black: {
    color: '#242424',
  },
});
