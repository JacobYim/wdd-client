import { StyleSheet } from 'react-native';
import { color } from 'src/theme';

const trackUserSize = 60;

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
    bottom: trackUserSize / 3,
    right: trackUserSize / 3,
    width: trackUserSize,
    height: trackUserSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: trackUserSize / 2,
    backgroundColor: color.white,
    shadowColor: color.black,
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 2,
  },
  trackUserIcon: {
    width: trackUserSize * 0.48,
    height: trackUserSize * 0.48,
    resizeMode: 'contain',
  },
});
