import { StyleSheet } from 'react-native';
import { horizontalSize } from 'src/components/container/PageContainer/PageContainer.styles';
import { cardHeight } from 'src/pages/Place/Result/Card';
import { color, shadow } from 'src/theme';

const paddingVertical = 20;
export { horizontalSize };

export const views = StyleSheet.create({
  infoHover: {
    marginTop: -(cardHeight / 2 + paddingVertical),
    marginBottom: 10,
    height: cardHeight,
    borderRadius: 5,
    backgroundColor: color.white,
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
    overflow: 'scroll',
    flexDirection: 'row',
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
  edit: {
    width: 24,
    height: 24,
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
