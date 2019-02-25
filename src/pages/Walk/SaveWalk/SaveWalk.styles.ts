import { StyleSheet } from 'react-native';
import { color } from 'src/theme';

const pinSize = 8;

export const views = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  map: StyleSheet.absoluteFillObject,
});

export const icons = StyleSheet.create({
  pin: {
    width: pinSize,
    height: pinSize,
    borderRadius: pinSize / 2,
    elevation: 2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    shadowColor: color.black,
    shadowOpacity: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinInside: {
    width: pinSize - 2,
    height: pinSize - 2,
    borderRadius: (pinSize - 2) / 2,
    backgroundColor: color.blue,
  },
  end: {
    backgroundColor: '#7168AB',
  },
  mid: {
    backgroundColor: color.white,
  },
});
