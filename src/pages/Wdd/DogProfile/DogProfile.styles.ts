import { Dimensions, StyleSheet } from 'react-native';
import { color, font, shadow } from 'src/theme';

const { width, height } = Dimensions.get('window');

export const views = StyleSheet.create({
  modalBackground: {
    width,
    height,
    backgroundColor: color.black33Opacity,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: width * 0.7,
    backgroundColor: color.white,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderRadius: 8,
    alignItems: 'center',
    ...shadow.center,
  },
  closeWrapper: {
    alignSelf: 'flex-end',
    paddingTop: 10,
    marginRight: -20,
    paddingHorizontal: 10,
  },
  topRowWrapper: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  itemWrapper: {
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  vr: {
    borderLeftWidth: 1,
    borderColor: '#dadcdf7f',
  },
  infoWrapper: {
    marginTop: 10,
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: color.grayEF,
    borderRadius: 5,
  },
  bottomRowWrapper: {
    marginTop: 24,
    width: '100%',
    flexDirection: 'row',
  },
  bottomItem: {
    flex: 1,
    alignItems: 'center',
  },
  likeButton: {
    marginTop: 30,
    width: '100%',
    height: 46,
    backgroundColor: color.blue,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const texts = StyleSheet.create({
  name: {
    marginTop: 10,
    color: color.black,
    fontSize: 20,
    fontWeight: '600',
  },
  spec: {
    color: color.blackOpacity,
    fontSize: font.size.small,
  },
  info: {
    color: '#484848',
    fontSize: font.size.medium,
    textAlign: 'center',
  },
  bottomLabel: {
    color: color.black,
    fontSize: font.size.medium,
    fontWeight: '600',
  },
  bottomValue: {
    marginTop: 4,
    color: color.black,
    fontSize: 26,
    fontWeight: '600',
  },
  like: {
    fontSize: font.size.large,
    color: color.white,
  },
});

export const icons = StyleSheet.create({
  close: {
    width: 20,
    height: 20,
  },
});
