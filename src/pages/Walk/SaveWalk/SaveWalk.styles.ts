import { StyleSheet } from 'react-native';
import { color } from 'src/theme';

const pinSize = 10;

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
    elevation: 4,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 12,
    shadowColor: color.black,
    shadowOpacity: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinInside: {
    width: pinSize - 3,
    height: pinSize - 3,
    borderRadius: (pinSize - 3) / 2,
    backgroundColor: color.blue,
  },
  end: {
    backgroundColor: '#7168AB',
  },
  mid: {
    backgroundColor: color.white,
  },
});
