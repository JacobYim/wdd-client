import { Dimensions, StyleSheet } from 'react-native';
import { height as navHeight } from 'src/components/module/TopNavbar/TopNavbar';
import { color, size } from 'src/theme';

const dogItemSpace = 10;
const { height } = Dimensions.get('window');

export const views = StyleSheet.create({
  header: {
    height: navHeight,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: color.grayEF,
  },
  dogsWrapper: {
    borderBottomWidth: 1,
    borderColor: color.grayEF,
  },
  dogsListWrapper: {
    paddingHorizontal: size.horizontal - dogItemSpace,
  },
  dogItem: {
    paddingVertical: 16,
    paddingHorizontal: dogItemSpace,
  },
  emptyListMargin: {
    marginTop: height * 0.18,
  },
});

export const icons = StyleSheet.create({
  logo: {
    width: 160,
    height: 18,
    resizeMode: 'contain',
  },
});
