import { AsyncStorage } from 'react-native';

interface TokenStroage {
  token: string;
}

// *** KEY
const TOKEN = 'storage/TOKEN';

// *** FUNCTIONS
export async function loadToken() {
  const data = await AsyncStorage.getItem(TOKEN);
  if (!data) throw new Error('NO_TOKEN_IN_STORAGE');
  const { token } = JSON.parse(data) as TokenStroage;
  return token;
}

export function storeToken(token: string) {
  AsyncStorage.setItem(TOKEN, JSON.stringify({ token }));
}

export function removeToken() {
  AsyncStorage.removeItem(TOKEN);
}
