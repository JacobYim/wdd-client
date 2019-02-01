import { StyleSheet } from 'react-native';

import { color, font } from 'src/theme';

export const views = StyleSheet.create({
  container: { flex: 1 },
  contentWrapper: { flex: 1, marginHorizontal: '5.3%' },
  topWrapper: {
    marginTop: 15,
    marginHorizontal: '4%',
    height: 21,
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
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxEnable: {
    backgroundColor: color.blue,
  },
  boxDisable: {
    backgroundColor: color.grayEF,
  },
  center: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 16,
  },
  center: {
    color: color.black,
    fontSize: font.size.large,
  },
  bottomText: {
    color: `${color.gary55}CC`,
    fontSize: font.size.small,
    textDecorationLine: 'underline',
  },
  bottomDiff: {
    color: `${color.black33}7F`,
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
    color: color.black33Opacity,
  },
});
