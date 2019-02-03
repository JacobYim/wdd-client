import axios from 'axios';
import { BASE_URL } from './base-url.json';

export function setHeader(token: string) {
  axios.defaults.headers.common['authorization'] = token;
}

export function removeHeader() {
  delete axios.defaults.headers.common['authorization'];
}

export default function configAxios() {
  if (__DEV__) {
    axios.defaults.baseURL = `http://${BASE_URL}:8080`;
  } else {
    axios.defaults.baseURL = 'http://api.woodongdang.com';
  }
}
