import axios, { AxiosResponse } from 'axios';
import * as actions from 'src/store/actions/user';

export interface SearchParams {
  coordinates: number[];
}

export const getUser = async () => {
  // *** Set token on headers before call
  const response: AxiosResponse<actions.UserInterface> = await axios.get(
    '/user'
  );
  return response.data;
};

export const signIn = async (body: actions.SignInInterface) => {
  const response: AxiosResponse<actions.SignInInterface> = await axios.post(
    '/signin',
    body
  );
  return response.data;
};

export const signUp = async (body: actions.SignUpInterface) => {
  const response: AxiosResponse<actions.UserInterface> = await axios.post(
    '/signup',
    body
  );
  return response.data;
};

export const terminate = async () => {
  // *** Set token on headers before call
  const response: AxiosResponse<{ message: string }> = await axios.delete(
    '/user'
  );
  return response.data;
};

export const updateUser = async (body: actions.UpdateInterface) => {
  // *** Set token on headers before call
  const response: AxiosResponse<actions.UserInterface> = await axios.patch(
    '/user',
    body
  );
  return response.data;
};

export const forgotPassword = async (body: { email: string }) => {
  const response: AxiosResponse<{ message: string }> = await axios.post(
    '/forgot-password',
    body
  );
  return response.data;
};

export const searchUsers = async (params: SearchParams) => {
  const response: AxiosResponse<actions.UserInterface[]> = await axios.get(
    '/users',
    { params: { coordinates: JSON.stringify(params.coordinates) } }
  );
  return response.data;
};
