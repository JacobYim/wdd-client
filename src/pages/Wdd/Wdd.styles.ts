import { StyleSheet } from 'react-native';
import { height } from 'src/components/module/TopNavbar/TopNavbar';
import { color, size } from 'src/theme';

const dogItemSpace = 10;

export const views = StyleSheet.create({
  header: {
    height,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: color.grayEF,
  },
  dogsWrapper: {
    borderBottomWidth: 1,
    borderColor: color.grayEF,
    alignItems: 'center',
  },
  dogsListWrapper: {
    paddingHorizontal: size.horizontal - dogItemSpace,
  },
  dogItem: {
    paddingVertical: 16,
    paddingHorizontal: dogItemSpace,
  },
});

export const icons = StyleSheet.create({
  logo: {
    width: 160,
    height: 18,
    resizeMode: 'contain',
  },
});
