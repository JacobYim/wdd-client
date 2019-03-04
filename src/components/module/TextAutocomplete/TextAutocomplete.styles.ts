import { StyleSheet } from 'react-native';
import { color } from 'src/theme';

export const texts = StyleSheet.create({
  input: {
    // outer size
    width: '100%',
    marginTop: 15,
    marginBottom: 10,
    // inner size
    paddingVertical: 12,
    // border styles
    borderBottomWidth: 1,
    borderColor: color.blue,
    // font styles
    color: color.black,
    fontSize: 16,
  },
});

export const views = StyleSheet.create({
  autocompleteWrapper: {
    flex: 1,
  },
});
