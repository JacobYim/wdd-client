import { StyleSheet } from 'react-native';
import { color } from 'src/theme';

export const views = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingBottom: 12,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: color.grayEF,
  },
  ratingWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 10,
  },
});

export const texts = StyleSheet.create({
  rating: {
    fontSize: 46,
    color: color.blackOpacity,
    marginRight: 10,
  },
  input: {
    fontSize: 16,
    color: color.black,
  },
});
