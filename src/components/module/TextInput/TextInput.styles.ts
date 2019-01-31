import { StyleSheet } from 'react-native';
import { color, font } from 'src/theme';

export const texts = StyleSheet.create({
  alert: {
    color: color.red,
    fontSize: font.size.small,
    marginTop: 9,
  },
});

export const inputs = StyleSheet.create({
  text: {
    // outer size
    height: 41,
    // inner size
    alignItems: 'center',
    paddingHorizontal: 12,
    // border styles
    borderWidth: 1,
    borderRadius: 5,
    // font styles
    color: color.black33,
    fontSize: font.size.medium,
  },
  focused: { borderColor: color.blue },
  unFocused: { borderColor: color.grayDA },
});
