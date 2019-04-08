import { StyleSheet } from 'react-native';
import { height } from 'src/components/module/TopNavbar/TopNavbar';
import { color } from 'src/theme';

export const views = StyleSheet.create({
  header: {
    height,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: color.grayEF,
  },
});

export const icons = StyleSheet.create({
  logo: {
    width: 160,
    height: 18,
    resizeMode: 'contain',
  },
});
