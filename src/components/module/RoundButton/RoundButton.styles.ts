import { StyleSheet } from 'react-native';
import { color, font } from 'src/theme';

const btnHeight = 50;

export const views = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
    height: btnHeight,
    borderRadius: btnHeight / 2,
  },
  active: {
    backgroundColor: color.blue,
    elevation: 4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    shadowColor: color.black,
    shadowOpacity: 0.1,
  },
  inactive: {
    backgroundColor: color.grayEF,
  },
});

export const texts = StyleSheet.create({
  label: {
    fontSize: font.size.large,
  },
  active: {
    color: color.white,
  },
  inactive: {
    color: color.grayB1,
  },
});
