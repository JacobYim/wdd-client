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
    paddingVertical: 8,
  },
  boxWrapper: {
    flexDirection: 'row',
    marginHorizontal: -4,
  },
});
