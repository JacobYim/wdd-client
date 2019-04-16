import { StyleSheet } from 'react-native';
import { color, font } from 'src/theme';

export const texts = StyleSheet.create({
  alert: {
    color: color.red,
    fontSize: font.size.small,
    marginTop: 9,
  },
  unit: {
    color: '#242424',
    fontSize: font.size.medium,
  },
});

export const inputs = StyleSheet.create({
  text: {
    flex: 1,
    // font styles
    color: color.black33,
    fontSize: font.size.medium,
  },
  focused: { borderColor: color.blue },
  unFocused: { borderColor: color.grayEF },
});

export const views = StyleSheet.create({
  inputWrapper: {
    height: 49,
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 5,
  },
  focused: { borderColor: color.blue },
  unFocused: { borderColor: color.grayEF },
  unitWrapper: {
    height: '100%',
    paddingRight: 8,
    justifyContent: 'center',
  },
});
