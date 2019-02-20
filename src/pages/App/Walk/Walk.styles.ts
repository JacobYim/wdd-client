import { StyleSheet, Dimensions } from 'react-native';
import { color, font } from 'src/theme';

const { width } = Dimensions.get('window');
const walkButton = width * 0.293;
const peePooButton = 50;
const whiteBackRadius =
  (Math.pow(width / 2, 2) + Math.pow(walkButton / 2, 2)) / walkButton;
const bottomPadding = width * 0.128;

export const views = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  topWrapper: {
    flex: 0.54,
    alignItems: 'center',
    zIndex: 1,
  },
  bottomWrapper: {
    flex: 0.46,
    backgroundColor: color.whiteF5,
    alignItems: 'center',
    zIndex: 0,
  },
  topButtonWrapper: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomButtonWrapper: {
    width: '100%',
    paddingHorizontal: bottomPadding,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  whiteBackground: {
    position: 'absolute',
    top: walkButton / 2 - 2 * whiteBackRadius,
    left: width / 2 - whiteBackRadius,
    width: whiteBackRadius * 2,
    height: whiteBackRadius * 2,
    borderRadius: whiteBackRadius,
    backgroundColor: color.white,
  },
  statusButton: {
    width: walkButton,
    height: walkButton,
    borderRadius: walkButton / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  peePooButton: {
    width: peePooButton,
    height: peePooButton,
    marginTop: width * 0.088 - peePooButton / 2,
    borderRadius: peePooButton / 2,
    backgroundColor: color.blue,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: color.black,
    shadowOpacity: 0.16,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  gpsInfoWrapper: {
    width: '100%',
    marginTop: '4.5%',
    paddingHorizontal: '11.5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gpsSingleInfo: {
    width: width * 0.24,
    height: 80,
    borderRadius: 5,
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: color.black,
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 1,
  },
});

export const icons = StyleSheet.create({
  top: { width: 24, height: 24, resizeMode: 'contain' },
  topLeft: { alignSelf: 'flex-start' },
  topRight: { alignSelf: 'flex-end' },
  status: {
    width: '43%',
    height: '43%',
    resizeMode: 'contain',
  },
  peePoo: {
    width: '52%',
    height: '52%',
    resizeMode: 'contain',
  },
});

export const fonts = StyleSheet.create({
  walkTime: {
    marginTop: 'auto',
    marginBottom: 12,
    color: color.blue,
    fontSize: 68,
    fontFamily: font.family.NanumSquareRoundEB,
    letterSpacing: -4,
  },
  gpsInfoValue: {
    fontSize: 20,
    fontFamily: font.family.NanumSquareRoundB,
    letterSpacing: -0.8,
    color: color.black,
  },
  gpsInfoUnit: {
    marginTop: 6,
    fontSize: font.size.medium,
    fontFamily: font.family.NanumSquareRoundR,
    letterSpacing: -0.5,
    color: color.black,
  },
});
