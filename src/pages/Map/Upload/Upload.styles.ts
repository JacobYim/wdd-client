import { StyleSheet } from 'react-native';
import { color, font, size } from 'src/theme';

export const views = StyleSheet.create({
  input: {
    flex: 1,
  },
  listView: {
    paddingHorizontal: size.horizontal - 8,
  },
});

export const texts = StyleSheet.create({
  input: {
    marginTop: 18,
    color: color.black,
    fontSize: font.size.large,
  },
});
