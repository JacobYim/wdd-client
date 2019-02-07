import { StyleSheet } from 'react-native';

export const views = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: StyleSheet.absoluteFillObject,
  curMarker: {
    width: 40,
    height: 40,
  },
});
