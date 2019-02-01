import axios from 'axios';
import * as actions from 'src/store/actions/user';

export const getUser = async () => {
  // *** Set token on headers before call
  const response = await axios.get('/user');
  return response.data as actions.UserInterface;
};

export const signIn = async (body: actions.SignInInterface) => {
  const response = await axios.post('/signin', body);
  return response.data as actions.SignInInterface;
};

export const signUp = async (body: actions.SignUpInterface) => {
  const response = await axios.post('/signup', body);
  return response.data as actions.UserInterface;
};

export const updateUser = async (body: actions.UpdateInterface) => {
  // *** Set token on headers before call
  const response = await axios.patch('/user', body);
  return response.data as actions.UserInterface;
};

export const forgotPassword = async (body: { email: string }) => {
  const response = await axios.post('/forgot-password', body);
  return response.data as { message: string };
};
