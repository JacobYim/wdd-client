import { StyleSheet } from 'react-native';
import { horizontalSize } from 'src/components/container/PageContainer/PageContainer.styles';
import { color, font } from 'src/theme';

export const views = StyleSheet.create({
  dashboard: {
    height: 56,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: color.grayF9,
    borderWidth: 1,
    borderColor: '#00000014',
  },
  info: {
    paddingHorizontal: horizontalSize,
    paddingTop: 20,
    paddingBottom: 44,
    backgroundColor: color.white,
  },
  upload: {
    backgroundColor: color.blue,
    height: 51,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const icons = StyleSheet.create({
  close: { width: 16, height: 16 },
});

export const texts = StyleSheet.create({
  title: {
    color: color.black,
    fontSize: font.size.title,
    fontWeight: '500',
  },
  timestamp: {
    marginTop: 6,
    color: color.grayB1,
    fontSize: font.size.medium,
  },
  upload: {
    fontSize: font.size.large,
    color: color.white,
  },
});
