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
    : 'http://ec2-13-209-98-100.ap-northeast-2.compute.amazonaws.com';
}
