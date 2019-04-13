import { Dimensions, StyleSheet } from 'react-native';
import { color, font, size } from 'src/theme';

export const { width } = Dimensions.get('window');
const paginateHeight = 25;

export const views = StyleSheet.create({
  header: {
    paddingHorizontal: size.horizontal,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    flex: 1,
    marginLeft: 4,
  },
  headerButton: {
    paddingLeft: 16,
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  smallDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: color.black,
    marginLeft: 2,
  },
  image: {
    width,
    height: width,
    resizeMode: 'contain',
    backgroundColor: color.grayF9,
  },
  infoWrapper: {
    height: 43,
    paddingHorizontal: size.horizontal,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: color.grayEF,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoIcon: {
    height: 18,
    resizeMode: 'contain',
  },
  paginateStatus: {
    position: 'absolute',
    bottom: 10,
    right: 9,
    height: paginateHeight,
    paddingHorizontal: 8,
    borderRadius: paginateHeight / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.blackOpacity,
  },
  textWrapper: {
    paddingHorizontal: size.horizontal,
    paddingTop: 16,
    paddingBottom: 20,
  },
  likeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeAnimation: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const texts = StyleSheet.create({
  name: {
    marginLeft: 8,
    color: color.black,
    fontSize: 16,
    fontWeight: '600',
  },
  message: {
    marginLeft: 4,
    color: color.black33Opacity,
    fontSize: 11,
  },
  info: {
    marginLeft: 4,
    color: '#848484',
    fontSize: font.size.medium,
  },
  paginate: {
    color: color.white,
    fontSize: font.size.small,
  },
  likes: {
    marginLeft: 8,
    color: color.black33,
    fontSize: font.size.medium,
    fontWeight: '700',
  },
  memo: {
    marginTop: 12,
    color: '#484848',
    fontSize: 15,
  },
});

export const icons = StyleSheet.create({
  heart: {
    width: 18,
    height: 16,
  },
});
