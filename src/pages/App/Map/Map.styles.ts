import { StyleSheet } from 'react-native';
import { color } from 'src/theme';

const toggleHeight = 40;

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
  toggleWrapper: {
    width: '44.5%',
    height: toggleHeight,
    borderRadius: toggleHeight / 2,
    backgroundColor: color.white,
    shadowColor: color.black,
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 2,
  },
});
