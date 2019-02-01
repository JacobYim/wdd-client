import axios from 'axios';

export function setHeader(token: string) {
  axios.defaults.headers.common['authorization'] = token;
}

export function removeHeader() {
  delete axios.defaults.headers.common['authorization'];
}

export default function configAxios() {
  axios.defaults.baseURL = __DEV__
    ? 'http://localhost:8080'
    : 'http://api.woodongdang.com';
}
