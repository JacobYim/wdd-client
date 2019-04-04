import { Dimensions, StyleSheet } from 'react-native';
import { color, font } from 'src/theme';

const circleSize = 60;

const { width, height } = Dimensions.get('window');

export const views = StyleSheet.create({
  container: {
    height: height * 0.087,
    backgroundColor: color.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabWrapper: {
    flexBasis: width * 0.387,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButton: {
    width: 80,
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
  inActive: {
    backgroundColor: color.blue,
  },
  active: {
    backgroundColor: color.red,
  },
  tabIcon: {
    width: '100%',
    height: '56%',
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
    fontSize: font.size.small,
  },
  tabLabelOn: {
    color: color.blue,
  },
  tabLabelOff: {
    color: color.grayB1,
  },
});
