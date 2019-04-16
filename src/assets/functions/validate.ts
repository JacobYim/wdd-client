import { Permission, PermissionsAndroid, Platform } from 'react-native';
/* tslint:disable */

export const validateEmail = (email: string) =>
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    String(email).toLowerCase()
  );

export const validatePassword = (password: string) => password.length > 7;

export const LOCATION_PERMISSIONS = [
  'ACCESS_FINE_LOCATION',
  'ACCESS_COARSE_LOCATION',
];
export const PICTURE_PERMISSIONS = [
  'CAMERA',
  'READ_EXTERNAL_STORAGE',
  'WRITE_EXTERNAL_STORAGE',
];

export const checkPermission = async (permissions: string[]) => {
  if (Platform.OS === 'ios') return true;
  if (Platform.Version < 23) return true;
  // Check Permissions
  const notGranted: Permission[] = [];
  for (let i = 0; i < permissions.length - 1; i += 1) {
    const PERMISSON = PermissionsAndroid.PERMISSIONS[permissions[i]];
    if (!(await PermissionsAndroid.check(PERMISSON))) {
      notGranted.push(PERMISSON);
    }
  }
  if (notGranted.length === 0) return true;
  // Get Permissions
  const responses = Object.values(
    await PermissionsAndroid.requestMultiple(notGranted)
  );
  for (let i = 0; i < responses.length - 1; i += 1) {
    if (responses[i] !== PermissionsAndroid.RESULTS.GRANTED) return false;
  }
  return true;
};
