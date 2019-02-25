import { StyleSheet, Dimensions } from 'react-native';

import { color, font } from 'src/theme';

const { width } = Dimensions.get('window');

export const views = StyleSheet.create({
  container: { flex: 1 },
  contentWrapper: { flex: 1, marginHorizontal: width * 0.064 },
  bottomText: {
    marginBottom: 24,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  bottomBox: {
    width,
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
  titleWrapper: {
    marginVertical: 40,
  },
  titleNarrow: {
    marginVertical: 4,
  },
  backIcon: {
    width: 18,
    height: 16,
    resizeMode: 'contain',
  },
});

export const texts = StyleSheet.create({
  top: {
    color: color.blackOpacity,
    fontSize: 16,
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
