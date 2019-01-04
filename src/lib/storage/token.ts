import { AsyncStorage } from 'react-native';

interface TokenStroage {
  token: string;
}

// *** KEY
const TOKEN = 'wdd-client/storage/TOKEN';

// *** FUNCTIONS
export async function loadToken() {
  try {
    const data = (await AsyncStorage.getItem(TOKEN)) as string;
    if (data) {
      const { token } = JSON.parse(data) as TokenStroage;
      return token;
    }
    return null;
  } catch (e) {
    throw e;
  }
}

export async function storeToken(token: string) {
  try {
    await AsyncStorage.setItem(TOKEN, JSON.stringify({ token }));
  } catch (e) {
    throw e;
  }
}

export async function clearToken() {
  try {
    await AsyncStorage.removeItem(TOKEN);
  } catch (e) {
    throw e;
  }
}
