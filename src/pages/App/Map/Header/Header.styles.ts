import { Dimensions, StyleSheet } from 'react-native';
import { color } from 'src/theme';

const { width } = Dimensions.get('window');

export const views = StyleSheet.create({
  container: {
    width,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  inputWrapper: {
    width: '100%',
    height: 48,
    borderRadius: 5,
    backgroundColor: color.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});
