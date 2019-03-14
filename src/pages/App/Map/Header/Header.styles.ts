import { Dimensions, StyleSheet } from 'react-native';
import { color, font, shadow } from 'src/theme';

const { width } = Dimensions.get('window');
const neighborHeight = 38;

export const views = StyleSheet.create({
  container: {
    width,
    paddingHorizontal: 15,
    paddingTop: 15,
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    backgroundColor: color.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    ...shadow.deep,
  },
  neighbor: {
    marginTop: 16,
    paddingHorizontal: 12,
    height: neighborHeight,
    borderRadius: neighborHeight / 2,
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadow.deep,
  },
});

export const icons = StyleSheet.create({
  search: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
});

export const texts = StyleSheet.create({
  search: {
    margin: 0,
    fontSize: 16,
    color: color.blackOpacity,
  },
  neighbor: {
    fontSize: font.size.medium,
    color: color.blue,
    fontWeight: '600',
  },
});
