import { StyleSheet } from 'react-native';
import { color, font } from 'src/theme';

export const texts = StyleSheet.create({
  label: {
    color: color.black,
    fontSize: font.size.small,
    marginBottom: 4,
  },
  alert: {
    color: color.red,
    fontSize: font.size.small,
    marginTop: 9,
  },
});

export const inputs = StyleSheet.create({
  text: {
    // outer size
    flex: 1,
    height: 41,
    // inner size
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: 12,
    // border styles
    borderWidth: 1,
    borderRadius: 5,
    // font styles
    color: color.blackLight,
    fontSize: font.size.medium,
  },
  focused: { borderColor: color.blue },
  unFocused: { borderColor: color.gray },
});

export const views = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 8,
    paddingBottom: 8,
  },
});
