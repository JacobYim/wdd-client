import { StyleSheet } from 'react-native';

import { color } from 'src/theme';

const thumbnailSize = 100;
const thumbnailEditSize = 28;

export const views = StyleSheet.create({
  thumbnailWrapper: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
  },
  thumbnail: {
    width: thumbnailSize,
    height: thumbnailSize,
    borderRadius: thumbnailSize / 2,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: color.grayEF,
  },
  edit: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: thumbnailEditSize,
    height: thumbnailEditSize,
    resizeMode: 'contain',
  },
});
