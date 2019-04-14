import { StyleSheet } from 'react-native';
import { color, size } from 'src/theme';

export const texts = StyleSheet.create({
  input: {
    flex: 1,
    // font styles
    color: color.black,
    fontSize: 22,
  },
});

export const views = StyleSheet.create({
  inputWrapper: {
    paddingBottom: 20,
    paddingHorizontal: size.horizontal,
    marginTop: 8,
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
    // border styles
    borderBottomWidth: 1,
    borderColor: color.grayDA,
  },
  autocompleteWrapper: {
    paddingHorizontal: size.horizontal,
  },
});

export const icons = StyleSheet.create({
  close: {
    width: 15,
    height: 15,
  },
  clear: {
    width: 20,
    height: 20,
  },
});
