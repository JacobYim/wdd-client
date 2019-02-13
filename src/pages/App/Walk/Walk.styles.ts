import { StyleSheet } from 'react-native';
import { color, font } from 'src/theme';

export const views = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  dashboard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const fonts = StyleSheet.create({
  walkTime: {
    color: color.blue,
    fontSize: 68,
    fontFamily: font.family.NanumSquareExtraBold,
  },
});
