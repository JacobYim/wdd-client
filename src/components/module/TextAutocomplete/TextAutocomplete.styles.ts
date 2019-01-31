import { StyleSheet } from 'react-native';
import { color } from 'src/theme';

export const inputs = StyleSheet.create({
  text: {
    // outer size
    width: '100%',
    marginVertical: 8,
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
