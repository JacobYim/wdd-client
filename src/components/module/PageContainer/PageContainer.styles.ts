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
    height: 26,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomText: {
    marginBottom: 24,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  bottomBox: {
    width: '100%',
    height: '7.3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxEnable: {
    backgroundColor: color.blue,
  },
  boxDisable: {
    backgroundColor: color.grayEF,
  },
  rightButton: {
    marginLeft: 'auto',
  },
  titleWrapper: {
    marginVertical: 40,
  },
});

export const texts = StyleSheet.create({
  top: {
    color: color.blackOpacity,
    fontSize: font.size.large,
  },
  bottomText: {
    color: color.gary55,
    fontSize: font.size.small,
  },
  bottomBold: {
    color: color.black33,
    fontSize: font.size.small,
  },
  bottomBox: {
    fontSize: font.size.large,
  },
  boxEnable: {
    color: color.white,
  },
  boxDisable: {
    color: color.grayB1,
  },
  title: {
    fontSize: font.size.title,
    color: color.black,
  },
  subtitle: {
    marginTop: 10,
    fontSize: font.size.medium,
    color: color.black33,
  },
});
