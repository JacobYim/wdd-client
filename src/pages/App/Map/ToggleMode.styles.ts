import { StyleSheet } from 'react-native';
import { color } from 'src/theme';

const toggleHeight = 40;

export const width = {
  container: 168,
  background: 88,
};

export const views = StyleSheet.create({
  container: {
    width: width.container,
    height: toggleHeight,
    borderRadius: toggleHeight / 2,
    backgroundColor: color.white,
    flexDirection: 'row',
    shadowColor: color.black,
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 2,
  },
  animateBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: width.background,
    backgroundColor: color.blue,
    height: toggleHeight,
    borderRadius: toggleHeight / 2,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const texts = StyleSheet.create({
  label: { fontSize: 16 },
  labelFocus: { color: color.white },
  labelBlur: { color: color.black },
});
