import axios from 'axios';

export default function initAxios() {
  axios.defaults.baseURL =
    process.env.NODE_ENV === 'production'
      ? 'https://api.dangdang.com'
      : 'http://localhost:8080';
}
