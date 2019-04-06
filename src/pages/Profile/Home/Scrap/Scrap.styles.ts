import { StyleSheet } from 'react-native';
import { size } from 'src/theme';

const thumbnailSize = 56;
export const views = StyleSheet.create({
  container: {
    paddingHorizontal: size.horizontal,
    paddingTop: 11.5,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: thumbnailSize,
    height: thumbnailSize,
    borderRadius: thumbnailSize / 2,
  },
});
