import { StyleSheet } from 'react-native';
import { color, shadow } from 'src/theme';

const trackUserSize = 56;

export const views = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  map: StyleSheet.absoluteFillObject,
  curMarker: {
    width: 40,
    height: 40,
  },
  trackUserButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: trackUserSize,
    height: trackUserSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: trackUserSize / 2,
    backgroundColor: color.white,
    ...shadow.shallow,
  },
});

export const icons = StyleSheet.create({
  trackUser: {
    width: trackUserSize * 0.42,
    height: trackUserSize * 0.42,
    resizeMode: 'contain',
  },
});
