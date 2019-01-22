import { StyleSheet } from 'react-native';

import { color, font } from 'src/theme';

export const views = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    marginHorizontal: 40,
  },
  topWrapper: {
    marginTop: 20,
    marginHorizontal: 16,
    height: 28,
    display: 'flex',
    alignItems: 'center',
  },
  bottomButton: {
    marginBottom: 24,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  rightButton: {
    marginLeft: 'auto',
  },
});

export const texts = StyleSheet.create({
  top: {
    color: color.black,
    fontSize: font.size.large,
  },
  bottom: {
    color: color.gary55,
    fontSize: font.size.small,
  },
  bottomBold: {
    color: color.black33,
    fontSize: font.size.small,
  },
});
