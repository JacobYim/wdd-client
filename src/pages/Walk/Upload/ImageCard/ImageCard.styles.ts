import { StyleSheet } from 'react-native';
import { color } from 'src/theme';

const cardSize = 81;
const deleteSize = 25;
export const views = StyleSheet.create({
  wrapper: {
    paddingTop: deleteSize / 2,
    marginHorizontal: 8,
  },
  imageCard: {
    width: cardSize,
    height: cardSize,
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
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
