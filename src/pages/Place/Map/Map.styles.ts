import { Dimensions, StyleSheet } from 'react-native';
import { color, size } from 'src/theme';

export const { width, height } = Dimensions.get('window');
export const filterHeight = 49;

export const views = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  filterWrapper: {
    height: filterHeight,
    paddingHorizontal: size.horizontal,
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
