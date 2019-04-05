import { StyleSheet } from 'react-native';
import { horizontalSize } from 'src/components/container/PageContainer/PageContainer.styles';
import { color, font } from 'src/theme';

const thumbnailSize = 75;

export const views = StyleSheet.create({
  header: {
    paddingBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.white,
    paddingHorizontal: horizontalSize,
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
    width: 80,
  },
  updateProfile: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: color.grayDA,
    borderRadius: 2,
    paddingHorizontal: 12,
    paddingVertical: 6,
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
});

export const texts = StyleSheet.create({
  name: {
    color: '#242424',
    fontSize: 24,
    fontWeight: '600',
  },
  updateProfile: {
    fontSize: font.size.small,
    color: '#606269',
  },
});
