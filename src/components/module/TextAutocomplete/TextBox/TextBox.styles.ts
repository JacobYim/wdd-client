import { StyleSheet } from 'react-native';
import { color } from 'src/theme';

export const views = StyleSheet.create({
  textButton: {
    width: '100%',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: color.grayEF,
  },
});

export const texts = StyleSheet.create({
  value: {
    fontSize: 15,
    color: color.grayB1,
  },
  highlight: {
    color: color.black,
  },
});
