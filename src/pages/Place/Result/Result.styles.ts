import { StyleSheet } from 'react-native';
import { horizontalSize } from 'src/components/container/PageContainer/PageContainer.styles';
import { color } from 'src/theme';

export const height = 49;

export const views = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  filterWrapper: {
    height,
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
