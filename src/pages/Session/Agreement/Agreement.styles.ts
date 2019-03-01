import { StyleSheet } from 'react-native';
import { color } from 'src/theme';

export const views = StyleSheet.create({
  checkAll: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkAllOn: {
    backgroundColor: color.blue,
    borderColor: color.blue,
  },
  checkAllOff: {
    borderColor: color.grayDA,
  },
  termWrapper: {
    width: '100%',
    height: 20,
    marginVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  termInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  termMore: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export const icons = StyleSheet.create({
  agreeDog: {
    position: 'absolute',
    top: -50,
    right: '7.3%',
    width: 58,
    height: 54,
    resizeMode: 'contain',
  },
  agree: {
    width: 20,
    height: 20,
  },
  more: {
    width: 7,
    height: 12,
    resizeMode: 'stretch',
  },
});

export const texts = StyleSheet.create({
  checkAll: {
    fontSize: 16,
  },
  checkAllOn: {
    color: color.white,
  },
  checkAllOff: {
    color: color.gray66,
  },
  termTitle: {
    paddingLeft: 8,
  },
});
