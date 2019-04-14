import { StyleSheet } from 'react-native';
import { color, font } from 'src/theme';

export const texts = StyleSheet.create({
  label: {
    color: `${color.black}78`,
    fontSize: font.size.small,
    marginBottom: 12,
  },
});

export const views = StyleSheet.create({
  container: {
    width: '99.8%',
    paddingVertical: 8,
  },
});
