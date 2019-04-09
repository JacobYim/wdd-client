import { Dimensions, StyleSheet } from 'react-native';
import { color, font, size } from 'src/theme';

export const { width, height } = Dimensions.get('window');
export const filterHeight = 49;
const searchHeight = 38;

export const views = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  filterWrapper: {
    height: filterHeight,
    paddingLeft: size.horizontal,
    backgroundColor: color.grayF9,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: color.grayB1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  show: {
    height: '100%',
    paddingRight: 20,
  },
  carousel: {
    marginBottom: 20,
  },
  reSearch: {
    marginTop: 16,
    alignSelf: 'center',
    height: searchHeight,
    borderWidth: 0.5,
    borderColor: '#0000002e',
    borderRadius: searchHeight / 2,
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: color.white,
  },
});

export const icons = StyleSheet.create({
  back: {
    width: 18,
    height: 16,
    resizeMode: 'contain',
  },
  show: {
    width: 40,
    height: 40,
  },
});

export const texts = StyleSheet.create({
  reSearch: {
    color: color.blue,
    fontSize: font.size.medium,
  },
});
