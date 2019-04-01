import { StyleSheet } from 'react-native';

export const views = StyleSheet.create({
  topWrapper: {
    alignItems: 'flex-end',
    padding: 20,
  },
  bottomWrapper: {
    marginTop: 'auto',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const icons = StyleSheet.create({
  logo: {
    height: 48,
  },
});
