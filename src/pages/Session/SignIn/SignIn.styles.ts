import { StyleSheet } from 'react-native';
import { color, font } from 'src/theme';

export const views = StyleSheet.create({
  forgotPassword: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
});

export const texts = StyleSheet.create({
  forgotPassword: {
    color: color.black33Opacity,
    fontSize: font.size.medium,
  },
});
