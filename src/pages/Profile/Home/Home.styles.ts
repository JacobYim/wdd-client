import { Dimensions, StyleSheet } from 'react-native';
import { color, font, size } from 'src/theme';

const thumbnailSize = 75;

const { width, height } = Dimensions.get('window');

export const views = StyleSheet.create({
  header: {
    paddingBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.white,
    paddingHorizontal: size.horizontal,
    borderBottomWidth: 1,
    borderColor: color.grayEF,
  },
  thumbnail: {
    width: thumbnailSize,
    height: thumbnailSize,
    borderRadius: thumbnailSize / 2,
    resizeMode: 'cover',
  },
  infoWrapper: {
    marginLeft: 20,
  },
  selectDog: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateProfile: {
    width: 80,
    alignItems: 'center',
    marginTop: 6,
    borderWidth: 1,
    borderColor: color.grayDA,
    borderRadius: 2,
    paddingVertical: 6,
  },
  modalBackground: {
    width,
    height,
    backgroundColor: color.black33Opacity,
    justifyContent: 'flex-end',
  },
  modal: {
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
  topNavbar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: color.grayEF,
  },
  navItem: {
    flex: 1,
    paddingVertical: 16,
  },
  navBorder: {
    flex: 1,
    height: 20,
    borderLeftWidth: 1,
    borderColor: color.grayEF,
    justifyContent: 'center',
    alignItems: 'center',
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
    alignSelf: 'flex-end',
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
    color: color.black,
    fontSize: 16,
  },
  addDog: {
    marginLeft: 22,
    color: color.black,
    fontSize: font.size.medium,
  },
  navItem: {
    color: color.gray48,
    fontSize: 16,
  },
  navCurrent: {
    color: color.blue,
    fontWeight: '600',
  },
});
