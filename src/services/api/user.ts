import axios from 'axios';
import {
  UserInterface,
  SignInInterface,
  SignUpInterface,
} from 'src/store/actions/user';

export const loadUser = async () => {
  // *** Set token on headers before call
  const response = await axios.get('/user');
  return response.data as UserInterface;
};

export const signIn = async (body: SignInInterface) => {
  const response = await axios.post('/signin', body);
  return response.data as UserInterface;
};

export const signUp = async (body: SignUpInterface) => {
  const response = await axios.post('/signup', body);
  return response.data as UserInterface;
};
