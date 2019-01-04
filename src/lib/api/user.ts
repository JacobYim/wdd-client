import axios from 'axios';
import { UserInterface } from 'src/store/modules/user';

interface SignInInterface {
  email: string;
  password: string;
}

interface SignUpInterface extends SignInInterface {
  name: string;
  birth?: string;
  gender?: string;
}

export const loadUserAPI = async () => {
  // *** Set token on headers before call
  const response = await axios.get('/user');
  return response.data as UserInterface;
};

export const signInAPI = async (body: SignInInterface) => {
  const response = await axios.post('/signin', body);
  return response.data as UserInterface;
};

export const signUpAPI = async (body: SignUpInterface) => {
  const response = await axios.post('/signup', body);
  return response.data as UserInterface;
};
