import { StyleSheet } from 'react-native';

export const views = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  logo: {
    height: 34,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 64,
  },
});

export const texts = StyleSheet.create({
  title: {
    fontSize: 14,
  },
});
