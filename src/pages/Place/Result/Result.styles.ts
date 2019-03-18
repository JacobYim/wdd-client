import { Dimensions, StyleSheet } from 'react-native';
import { horizontalSize } from 'src/components/container/PageContainer/PageContainer.styles';
import { color } from 'src/theme';

export const { width, height } = Dimensions.get('window');
export const filterHeight = 49;
export const cardWidth = width * 0.872;

export const views = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  filterWrapper: {
    height: filterHeight,
    paddingHorizontal: horizontalSize,
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
});

export const icons = StyleSheet.create({
  back: {
    width: 18,
    height: 16,
    resizeMode: 'contain',
  },
});
