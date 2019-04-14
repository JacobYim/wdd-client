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
    padding: 45,
    justifyContent: 'space-between',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const icons = StyleSheet.create({
  logo: {
    width: width * 0.416,
    height: width * 0.072,
    resizeMode: 'contain',
  },
  go: {
    width: 90,
    height: 48,
  },
});

export const texts = StyleSheet.create({
  info: {
    marginLeft: 6,
    color: color.white,
    fontSize: font.size.medium,
  },
});
