import { StyleSheet } from 'react-native';
import { horizontalSize } from 'src/components/container/PageContainer/PageContainer.styles';
import { color } from 'src/theme';

export const texts = StyleSheet.create({
  input: {
    width: '100%',
    // font styles
    color: color.black,
    fontSize: 22,
  },
});

export const views = StyleSheet.create({
  inputWrapper: {
    paddingVertical: 20,
    paddingHorizontal: horizontalSize,
    marginTop: 8,
    marginBottom: 2,
    // border styles
    borderBottomWidth: 1,
    borderColor: color.grayDA,
  },
  autocompleteWrapper: {
    flex: 1,
    paddingHorizontal: horizontalSize,
  },
});

export const icons = StyleSheet.create({
  close: {
    width: 15,
    height: 15,
  },
});
