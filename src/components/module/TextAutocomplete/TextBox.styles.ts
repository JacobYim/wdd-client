import { StyleSheet } from 'react-native';
import { color } from 'src/theme';

export const views = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    alignSelf: 'flex-start',
  },
});

export const texts = StyleSheet.create({
  value: {
    fontSize: 15,
    color: color.gray66,
  },
  highlight: {
    color: color.blue,
  },
});
