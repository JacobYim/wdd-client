import { StyleSheet } from 'react-native';
import { color } from 'src/theme';

export const views = StyleSheet.create({
  agreeAll: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  agreeAllActive: {
    backgroundColor: color.blue,
    borderColor: color.blue,
  },
  agreeAllInactive: {
    borderColor: color.grayDA,
  },
  agreeIcon: {
    position: 'absolute',
    top: -50,
    right: '7.3%',
    width: 58,
    height: 54,
    resizeMode: 'contain',
  },
});

export const texts = StyleSheet.create({
  agreeAll: {
    fontSize: 16,
  },
  agreeAllActive: {
    color: color.white,
  },
  agreeAllInactive: {
    color: color.gray66,
  },
});
