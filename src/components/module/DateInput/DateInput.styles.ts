import { StyleSheet } from 'react-native';
import { color, font } from 'src/theme';

export const views = StyleSheet.create({
  datePicker: {
    // outer size
    width: '100%',
    height: 41,
    // inner size
    alignItems: 'center',
  },
  dateInput: {
    // border styles
    borderWidth: 1,
    borderRadius: 5,
    borderColor: color.grayDA,
    // font styles
    color: color.black33,
    fontSize: font.size.medium,
  },
});

export const texts = StyleSheet.create({
  btnTextConfirm: {
    color: color.blue,
  },
});
