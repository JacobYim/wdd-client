import axios from 'axios';

export function setToken(token: string) {
  axios.defaults.headers.common['authorization'] = token;
}

export function removeToken() {
  delete axios.defaults.headers.common['authorization'];
}

export default function configAxios() {
  axios.defaults.baseURL =
    process.env.NODE_ENV === 'production'
      ? 'https://api.dangdang.com'
      : 'http://localhost:8080';
}
