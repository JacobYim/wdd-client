import { StyleSheet } from 'react-native';
import { color } from 'src/theme';

const cardSize = 81;
const deleteSize = 25;
export const views = StyleSheet.create({
  wrapper: {
    width: cardSize,
    height: cardSize,
    borderRadius: 4,
    marginHorizontal: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  fullSize: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  deleteButton: {
    position: 'absolute',
    top: -deleteSize / 2,
    right: -deleteSize / 2,
    width: deleteSize,
    height: deleteSize,
    borderRadius: deleteSize / 2,
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.grayDA,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const icons = StyleSheet.create({
  addImage: {
    width: 28.7,
    height: 23.6,
  },
  delete: {
    width: 9,
    height: 9,
  },
});
