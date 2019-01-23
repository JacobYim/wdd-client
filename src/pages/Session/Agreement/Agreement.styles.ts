import { StyleSheet } from 'react-native';
import { font, color } from 'src/theme';

export const views = StyleSheet.create({
  shortcut: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  shortcutActive: {
    backgroundColor: color.blue,
    borderColor: color.blue,
  },
  shortcutInactive: {
    borderColor: color.grayDA,
  },
});

export const texts = StyleSheet.create({
  shortcut: {
    fontSize: 16,
  },
  shortcutActive: {
    color: color.white,
  },
  shortcutInactive: {
    color: color.gray66,
  },
});
