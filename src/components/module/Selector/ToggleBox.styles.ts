import { StyleSheet } from 'react-native';
import { color, font } from 'src/theme';

export const views = StyleSheet.create({
  box: {
    flex: 1,
    height: 49,
    marginHorizontal: 4,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxActive: {
    borderColor: color.blue,
  },
  boxInactive: {
    borderColor: color.grayEF,
  },
});

export const texts = StyleSheet.create({
  box: {
    fontSize: font.size.medium,
  },
  boxActive: {
    color: color.blue,
  },
  boxInactive: {
    color: color.black33Opacity,
  },
});
