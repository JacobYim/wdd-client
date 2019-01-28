import { StyleSheet } from 'react-native';

const thumbnailSize = 100;

export const views = StyleSheet.create({
  thumbnailWrapper: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
  },
  thumbnailButton: {},
  thumbnail: {
    width: thumbnailSize,
    height: thumbnailSize,
    borderRadius: thumbnailSize / 2,
    resizeMode: 'cover',
  },
});
