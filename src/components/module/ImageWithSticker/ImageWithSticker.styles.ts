import { Dimensions, StyleSheet } from 'react-native';
import { color, font } from 'src/theme';

const { width } = Dimensions.get('window');

export const views = StyleSheet.create({
  topWrapper: {
    alignItems: 'flex-end',
    padding: 20,
  },
  bottomWrapper: {
    marginTop: 'auto',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const icons = StyleSheet.create({
  logo: {
    width: width * 0.4,
    height: 48,
    resizeMode: 'contain',
  },
});

export const texts = StyleSheet.create({
  info: {
    marginLeft: 6,
    color: color.white,
    fontSize: font.size.medium,
  },
});
