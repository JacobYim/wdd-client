import { StyleSheet } from 'react-native';
import { color, font } from 'src/theme';

export const views = StyleSheet.create({
  boxWrapper: {
    flexDirection: 'row',
    marginHorizontal: -4,
  },
});

export const texts = StyleSheet.create({
  alert: {
    color: color.red,
    fontSize: font.size.small,
    marginTop: 9,
  },
});
