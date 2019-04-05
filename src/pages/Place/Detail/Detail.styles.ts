import { Dimensions, StyleSheet } from 'react-native';
import { horizontalSize } from 'src/components/container/PageContainer/PageContainer.styles';
import { cardHeight } from 'src/pages/Place/Map/Card';
import { color, shadow } from 'src/theme';

const { height } = Dimensions.get('window');
const paddingVertical = 20;

export const views = StyleSheet.create({
  navbarWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerWrapper: {
    height: height * 0.41,
  },
  headerFilter: {
    flex: 1,
    backgroundColor: `${color.black}78`,
  },
  infoHover: {
    marginTop: -(cardHeight / 2 + paddingVertical),
    marginBottom: 10,
    height: cardHeight,
    ...shadow.shallow,
  },
  infoWrapper: {
    paddingVertical,
    paddingHorizontal: horizontalSize,
    backgroundColor: color.white,
    borderTopWidth: 10,
    borderColor: color.grayEF,
  },
  rowWrapper: {
    marginVertical: 6,
    flexDirection: 'row',
  },
  imageWrapper: {
    marginTop: 4,
    paddingHorizontal: horizontalSize,
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
  blackOpacity: {
    flexBasis: 58,
    lineHeight: 24,
    color: color.blackOpacity,
    fontSize: 16,
  },
  black: {
    lineHeight: 24,
    color: color.black,
    fontSize: 16,
  },
});
