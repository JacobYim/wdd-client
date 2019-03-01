import { Dimensions, StyleSheet } from 'react-native';
import { color, font } from 'src/theme';

const { width, height } = Dimensions.get('window');
const horizontalSize = width * 0.064;

export const views = StyleSheet.create({
  container: { flex: 1 },
  contentWrapper: { flex: 1, marginHorizontal: horizontalSize },
  bottom: {
    width,
    paddingHorizontal: horizontalSize,
    marginBottom: height * 0.045,
  },
  bottomBox: {
    width,
    height: 51,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxEnable: {
    backgroundColor: color.blue,
  },
  boxDisable: {
    backgroundColor: `${color.blue}4C`,
  },
  titleWrapper: {
    marginVertical: 40,
  },
  titleNarrow: {
    marginVertical: 4,
  },
  backIcon: {
    width: 18,
    height: 16,
    resizeMode: 'contain',
  },
});

export const texts = StyleSheet.create({
  top: {
    color: color.blackOpacity,
    fontSize: 16,
  },
  bottomBox: {
    fontSize: font.size.large,
    color: color.white,
  },
  title: {
    fontSize: font.size.title,
    fontWeight: '500',
    color: color.black,
  },
  subtitle: {
    marginTop: 10,
    fontSize: font.size.medium,
    color: color.black33Opacity,
  },
});
