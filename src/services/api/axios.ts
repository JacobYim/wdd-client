import axios from 'axios';
import { Platform } from 'react-native';

export function setHeader(token: string) {
  axios.defaults.headers.common['authorization'] = token;
}

export function removeHeader() {
  delete axios.defaults.headers.common['authorization'];
}

const BASE_URL = Platform.OS === 'ios' ? '127.0.0.1' : '10.0.2.2';
export default function configAxios() {
  axios.defaults.baseURL = __DEV__
    ? `http://${BASE_URL}:8080`
    : 'http://api.woodongdang.com';
}
