import { Dimensions, StyleSheet } from 'react-native';
import { color, font, shadow } from 'src/theme';

const { width, height } = Dimensions.get('window');
export const statusBtn = width * 0.293;

const bottomPadding = width * 0.128;
const whiteBackRadius =
  (Math.pow(width / 2, 2) + Math.pow(statusBtn / 2, 2)) / statusBtn;

// helper
const scaleWidth = width / 375;
const scaleHeight = height / 667;
const scale = Math.min(scaleWidth, scaleHeight);

const scaledSize = (size: number) => Math.ceil(size * scale);

export const views = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    overflow: 'hidden',
  },
  topWrapper: {
    flex: 0.54,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 12,
    zIndex: 1,
  },
  bottomWrapper: {
    flex: 0.46,
    backgroundColor: color.whiteF5,
    alignItems: 'center',
    zIndex: 0,
  },
  bottomButtonWrapper: {
    width: '100%',
    paddingHorizontal: bottomPadding,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  whiteBackground: {
    position: 'absolute',
    top: statusBtn / 2 - 2 * whiteBackRadius,
    left: width / 2 - whiteBackRadius,
    width: whiteBackRadius * 2,
    height: whiteBackRadius * 2,
    borderRadius: whiteBackRadius,
    backgroundColor: color.white,
  },
  gpsInfoWrapper: {
    width: '100%',
    marginTop: 50,
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
    ...shadow.shallow,
  },
  gifWrapper: {
    marginTop: 11,
    width: width * 0.7,
    height: height * 0.3,
  },
  gifAbsolute: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
  },
});

export const icons = StyleSheet.create({
  top: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  gif: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  absolute: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
});

export const fonts = StyleSheet.create({
  walkTime: {
    marginTop: 'auto',
    marginBottom: 12,
    color: color.blue,
    fontSize: scaledSize(68),
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
