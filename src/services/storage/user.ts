import { AsyncStorage } from 'react-native';

interface SoftStorageInterface {
  token?: string;
  nextStep?: string;
}

interface UserStorage {
  token: string;
  nextStep?: string;
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

export async function updateUserStorage(payload: SoftStorageInterface) {
  const data = await getUserStorage();
  const updateData = { ...data, ...payload };
  setUserStorage(updateData);
}

export function removeUserStorage() {
  AsyncStorage.removeItem(USER);
}
