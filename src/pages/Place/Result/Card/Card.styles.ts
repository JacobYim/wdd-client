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
    marginTop: 4,
  },
  ratingWrapper: {
    marginTop: 'auto',
    flexDirection: 'row',
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
});

export const texts = StyleSheet.create({
  name: {
    fontSize: 16,
    color: color.black,
  },
  address: {
    fontSize: font.size.medium,
    marginTop: 2,
    color: color.blackOpacity,
  },
  rating: {
    fontSize: 16,
    fontFamily: font.family.NanumSquareRoundB,
    color: color.blackOpacity,
  },
});
