import { StyleSheet } from 'react-native';
import { color, font } from 'src/theme';

const thumbnailEditSize = 28;

export const views = StyleSheet.create({
  thumbnailWrapper: {
    marginVertical: 40,
    alignItems: 'center',
  },
  edit: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: thumbnailEditSize,
    height: thumbnailEditSize,
    resizeMode: 'contain',
  },
});

export const texts = StyleSheet.create({
  notice: {
    textAlign: 'center',
    color: color.black33Opacity,
    fontSize: font.size.medium,
    marginTop: 20,
    lineHeight: 21,
  },
});
