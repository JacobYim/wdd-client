import axios from 'axios';

export function setHeader(token: string) {
  axios.defaults.headers.common['authorization'] = token;
}

export function removeHeader() {
  delete axios.defaults.headers.common['authorization'];
}

export default function configAxios() {
  if (__DEV__) {
    axios.defaults.baseURL = `http://localhost:8080`;
  } else {
    axios.defaults.baseURL = 'http://api.woodongdang.com';
  }
}
