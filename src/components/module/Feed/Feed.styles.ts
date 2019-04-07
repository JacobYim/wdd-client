import { StyleSheet } from 'react-native';
import { size } from 'src/theme';

export const views = StyleSheet.create({
  container: {},
  header: {
    paddingHorizontal: size.horizontal,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
