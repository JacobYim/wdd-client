import { StyleSheet } from 'react-native';
import { color, font } from 'src/theme';

const circleSize = 60;

export const views = StyleSheet.create({
  container: {
    height: '8.1%',
    backgroundColor: color.white,
    flexDirection: 'row',
  },
  tabWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerTab: {
    position: 'absolute',
    zIndex: 99,
    top: -circleSize / 2,
    left: '50%',
    marginLeft: -circleSize / 2,
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notWalking: {
    backgroundColor: color.blue,
  },
  walking: {
    backgroundColor: color.red,
  },
  tabIcon: {
    width: 36,
    height: '46.2%',
    resizeMode: 'contain',
  },
  centerIcon: {
    width: '57%',
    height: '57%',
    resizeMode: 'contain',
  },
});

export const texts = StyleSheet.create({
  tabLabel: {
    marginTop: 2,
    color: color.grayB1,
    fontSize: font.size.small,
  },
});
