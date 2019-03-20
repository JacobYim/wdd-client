import { StyleSheet } from 'react-native';
import { color, font, shadow } from 'src/theme';
import { cardWidth } from '../Result.styles';

const thumbnailSize = 50;

export const views = StyleSheet.create({
  wrapper: {
    width: cardWidth,
    paddingVertical: 16,
    paddingLeft: 16,
    height: 104,
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: color.white,
    ...shadow.deep,
  },
  infoWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  ratingWrapper: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  show: {
    height: '100%',
    paddingRight: 20,
  },
});

export const icons = StyleSheet.create({
  thumbnail: {
    width: thumbnailSize,
    height: thumbnailSize,
    borderRadius: thumbnailSize / 2,
    borderWidth: 1,
    borderColor: `${color.black}14`,
  },
  rating: {
    marginLeft: 4,
    width: 13,
    height: 13,
  },
  show: {
    width: 40,
    height: 40,
  },
});

export const texts = StyleSheet.create({
  name: {
    fontSize: 16,
    color: color.black,
    fontWeight: '500',
  },
  address: {
    fontSize: font.size.medium,
    marginTop: 2,
    color: color.blackOpacity,
    lineHeight: 16,
  },
  rating: {
    fontSize: 16,
    fontFamily: font.family.NanumSquareRoundB,
    color: color.blackOpacity,
    marginRight: 4,
  },
});
