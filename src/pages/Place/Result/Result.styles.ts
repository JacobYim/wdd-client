import { StyleSheet } from 'react-native';
import { horizontalSize } from 'src/components/container/PageContainer/PageContainer.styles';
import { color } from 'src/theme';

export const views = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  filterWrapper: {
    paddingHorizontal: horizontalSize,
    height: 49,
    backgroundColor: color.grayF9,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: color.grayB1,
  },
  range: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const icons = StyleSheet.create({
  back: {
    width: 18,
    height: 16,
    resizeMode: 'contain',
  },
  dropDown: {
    width: 8,
    height: 4,
  },
});

export const fonts = StyleSheet.create({
  range: {
    fontSize: 16,
    color: color.black,
    marginRight: 6,
  },
});
