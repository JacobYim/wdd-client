import { StyleSheet } from 'react-native';
import { color, font, size } from 'src/theme';

const thumbnailSize = 56;
export const views = StyleSheet.create({
  container: {
    paddingHorizontal: size.horizontal,
    paddingTop: 11.5,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: thumbnailSize,
    height: thumbnailSize,
    borderRadius: thumbnailSize / 2,
  },
  textWrapper: {
    paddingVertical: 8,
    marginLeft: 12,
    borderTopWidth: 1,
    borderColor: color.grayEF,
    justifyContent: 'center',
  },
});

export const texts = StyleSheet.create({
  name: {
    color: color.black,
    fontSize: font.size.medium,
  },
  description: {
    marginTop: 3,
    color: '#999999',
    fontSize: 13,
  },
});
