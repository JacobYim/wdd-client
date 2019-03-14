import { Dimensions, StyleSheet } from 'react-native';
import { color, shadow } from 'src/theme';

const pinSize = 10;
const { height } = Dimensions.get('window');

export const views = StyleSheet.create({
  container: { flex: 1 },
  absolute: StyleSheet.absoluteFillObject,
  pin: {
    width: 36,
    height: 46.6,
    alignItems: 'center',
  },
  bottomWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topFilter: {
    zIndex: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.19,
    backgroundColor: color.white,
  },
  bottomFilter: {
    zIndex: 0,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: height * 0.115,
    backgroundColor: color.white,
  },
});

export const icons = StyleSheet.create({
  marker: {
    width: pinSize,
    height: pinSize,
    borderRadius: pinSize / 2,
    ...shadow.deep,
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
