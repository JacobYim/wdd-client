import { StyleSheet } from 'react-native';
import { color, font, size } from 'src/theme';

export const views = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  boxWrapper: {
    marginTop: 20,
    paddingHorizontal: size.horizontal,
    backgroundColor: color.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: color.grayEF,
  },
});

export const icons = StyleSheet.create({
  back: {
    width: 18,
    height: 16,
    resizeMode: 'contain',
  },
});
