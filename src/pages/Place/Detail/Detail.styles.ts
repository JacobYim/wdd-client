import { Dimensions, StyleSheet } from 'react-native';
import { color, size } from 'src/theme';

const { height } = Dimensions.get('window');
const cardMarginTop = 56;
const paddingVertical = 20;

export const views = StyleSheet.create({
  navbarWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerWrapper: {
    height: height * 0.253,
  },
  headerFilter: {
    flex: 1,
    backgroundColor: `${color.black}78`,
  },
  headerCheat: {
    marginTop: 'auto',
    marginLeft: 'auto',
    width: size.horizontal + 60,
    height: cardMarginTop,
  },
  infoHover: {
    marginTop: -cardMarginTop,
    marginBottom: 10,
  },
  infoWrapper: {
    paddingVertical,
    paddingHorizontal: size.horizontal,
    backgroundColor: color.white,
  },
  hr: {
    height: 10,
    backgroundColor: color.grayEF,
  },
  rowWrapper: {
    marginVertical: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    marginTop: 10,
    paddingHorizontal: size.horizontal,
  },
  image: {
    width: 140,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 5,
    marginRight: 8,
  },
});

export const icons = StyleSheet.create({
  scrap: {
    width: 15,
    height: 18,
  },
  back: {
    width: 18,
    height: 16,
  },
});

export const texts = StyleSheet.create({
  label: {
    flexBasis: 62,
    color: color.blackOpacity,
    fontSize: 15,
    alignSelf: 'flex-start',
  },
  content: {
    flex: 1,
    color: color.gray48,
    fontSize: 15,
  },
  phone: {
    textDecorationStyle: 'solid',
    textDecorationColor: color.blue,
    textDecorationLine: 'underline',
    color: color.blue,
    fontSize: 15,
  },
  title: {
    fontSize: 16,
    color: color.black,
    paddingHorizontal: size.horizontal,
  },
});
