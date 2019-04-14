import { StyleSheet } from 'react-native';
import { color, font } from 'src/theme';

export const views = StyleSheet.create({
  datePicker: {
    // outer size
    width: '100%',
  },
  dateInput: {
    // border styles
    height: 49,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: color.grayEF,
    paddingHorizontal: 12,
  },
});

export const texts = StyleSheet.create({
  btnTextConfirm: {
    color: color.blue,
  },
  dateText: {
    fontSize: font.size.medium,
    alignSelf: 'flex-start',
  },
  value: {
    color: color.black33,
  },
  placeholder: {
    color: color.black33Opacity,
  },
});
