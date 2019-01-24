import { AsyncStorage } from 'react-native';

interface UserStorage {
  token: string;
  saveExist: boolean;
}

// *** KEY
const USER = 'storage/USER';

// *** FUNCTIONS
export async function getUserStorage() {
  const data = await AsyncStorage.getItem(USER);
  if (!data) throw new Error('NO_USER_DATA_IN_STORAGE');
  return JSON.parse(data) as UserStorage;
}

export function setUserStorage(payload: UserStorage) {
  AsyncStorage.setItem(USER, JSON.stringify(payload));
}

export function removeUserStorage() {
  AsyncStorage.removeItem(USER);
}
