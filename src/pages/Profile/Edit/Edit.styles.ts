import { StyleSheet } from 'react-native';

const thumbnailSize = 80;
const thumbnailEditSize = 26;

export const views = StyleSheet.create({
  thumbnailWrapper: {
    marginTop: 30,
    marginBottom: 24,
    alignItems: 'center',
  },
  thumbnail: {
    width: thumbnailSize,
    height: thumbnailSize,
    borderRadius: thumbnailSize / 2,
    resizeMode: 'cover',
  },
});

export const icons = StyleSheet.create({
  edit: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: thumbnailEditSize,
    height: thumbnailEditSize,
    resizeMode: 'contain',
  },
});
