import { StyleSheet } from 'react-native';
import { horizontalSize } from 'src/components/container/PageContainer/PageContainer.styles';
import { color, font } from 'src/theme';

export const views = StyleSheet.create({
  input: {
    flex: 1,
  },
  listView: {
    paddingHorizontal: horizontalSize - 8,
  },
});

export const texts = StyleSheet.create({
  input: {
    marginTop: 20,
    color: color.black,
    fontSize: font.size.large,
  },
});
