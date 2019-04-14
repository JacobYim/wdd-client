import { Dimensions, StyleSheet } from 'react-native';
import { color, font } from 'src/theme';

const { width } = Dimensions.get('window');
const cardSize = 68;
const space = (width - cardSize * 4) / 5;

export const views = StyleSheet.create({
  buttonContainer: {
    marginTop: space,
    paddingHorizontal: space / 2,
  },
  button: {
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
