import { Dimensions, StyleSheet } from 'react-native';
import { color, font, size } from 'src/theme';

const { height } = Dimensions.get('window');

export const views = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.white,
    paddingHorizontal: size.horizontal,
    borderBottomWidth: 1,
    borderColor: color.grayEF,
  },
  infoWrapper: {
    marginLeft: 20,
    flex: 1,
    justifyContent: 'center',
  },
  selectDog: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateProfile: {
    width: 80,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color.grayDA,
    borderRadius: 2,
    paddingVertical: 6,
  },
  modalBackground: {
    height,
    backgroundColor: color.black33Opacity,
  },
  modal: {
    marginTop: 'auto',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    paddingTop: 20,
    backgroundColor: color.white,
  },
  dogListWrapper: {
    paddingHorizontal: size.horizontal,
    marginBottom: 10,
  },
  dogSelectWrapper: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dogSelectButton: {
    justifyContent: 'center',
  },
  addDogButton: {
    borderTopWidth: 1,
    borderColor: color.grayEF,
    height: 64,
    paddingHorizontal: size.horizontal,
    alignItems: 'center',
    flexDirection: 'row',
  },
  listContainer: {
    paddingHorizontal: size.horizontal,
    paddingTop: 11.5,
  },
  listSpace: {
    paddingBottom: height * 0.1,
  },
  signInMessage: {
    marginTop: height * 0.22,
    alignItems: 'center',
  },
  topWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyListTop: {
    marginTop: height * 0.1,
  },
});

export const icons = StyleSheet.create({
  setting: {
    width: 20,
    height: 20,
  },
  dropDown: {
    marginLeft: 8,
    width: 8,
    height: 4,
  },
  check: {
    marginLeft: 'auto',
    width: 24,
    height: 24,
  },
  add: {
    width: 20,
    height: 20,
  },
});

export const texts = StyleSheet.create({
  name: {
    color: '#242424',
    fontSize: 24,
    fontWeight: '700',
  },
  updateProfile: {
    fontSize: font.size.small,
    color: '#606269',
  },
  selectDogName: {
    marginLeft: 12,
    color: color.black,
    fontSize: 16,
  },
  addDog: {
    marginLeft: 22,
    color: color.black,
    fontSize: font.size.medium,
  },
  likeInfo: {
    marginTop: 8,
    color: '#484848',
    fontSize: font.size.medium,
  },
  signIn: {
    fontSize: font.size.large,
    color: color.grayB1,
  },
  underline: {
    textDecorationColor: color.grayB1,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  center: {
    fontSize: font.size.large,
    color: color.black,
  },
});
