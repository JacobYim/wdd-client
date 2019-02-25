import { StyleSheet } from 'react-native';
import { color } from 'src/theme';

const pinSize = 10;

export const views = StyleSheet.create({
  container: { flex: 1 },
  absolute: StyleSheet.absoluteFillObject,
  pin: {
    width: 36,
    height: 46.6,
    alignItems: 'center',
  },
});

export const icons = StyleSheet.create({
  marker: {
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
  end: {
    backgroundColor: '#7168AB',
  },
  mid: {
    backgroundColor: color.white,
  },
  close: {
    width: 16,
    height: 16,
  },
  pin: {
    width: '100%',
    height: '100%',
  },
  pinType: {
    marginTop: 7.8,
    width: 19.2,
    height: 19.2,
    resizeMode: 'contain',
  },
});
