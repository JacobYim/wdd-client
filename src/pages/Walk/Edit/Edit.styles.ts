import { Dimensions, StyleSheet } from 'react-native';
import { color, font } from 'src/theme';

const padding = 20;
const CARDS_IN_SINGLE_ROW = 4;
const { width } = Dimensions.get('window');
const cardSize = 68;
const space =
  (width - padding * 2 - cardSize * CARDS_IN_SINGLE_ROW) /
  (CARDS_IN_SINGLE_ROW - 1);

export const views = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: padding - space / 2,
    paddingVertical: padding / 2,
  },
  button: {
    marginVertical: padding / 2,
    marginHorizontal: space / 2,
    width: cardSize,
    height: cardSize,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const icons = StyleSheet.create({
  save: {
    width: 16,
    height: 18,
  },
  button: {
    height: 28,
    width: 42,
    resizeMode: 'contain',
  },
});

export const texts = StyleSheet.create({
  navbar: {
    color: color.black,
    fontSize: font.size.large,
  },
  clear: {
    color: `${color.black}48`,
  },
});
