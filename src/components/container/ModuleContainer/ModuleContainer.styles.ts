import { StyleSheet } from 'react-native';
import { color, font } from 'src/theme';

export const texts = StyleSheet.create({
  label: {
    color: color.black,
    fontSize: font.size.small,
    marginBottom: 4,
  },
});

export const views = StyleSheet.create({
  container: {
    width: '99.8%',
    paddingVertical: 8,
  },
});
