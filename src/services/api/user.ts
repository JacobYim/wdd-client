import axios, { AxiosResponse } from 'axios';
import { LatLng } from 'react-native-maps';
import * as actions from 'src/store/actions/user';

export interface SearchParams {
  location?: LatLng;
}

const clientToAPI = ({ location, ...params }: SearchParams) => {
  const payload: any = { ...params };
  if (location !== undefined) {
    payload.coordinates = JSON.stringify([
      location.longitude,
      location.latitude,
    ]);
  }
  return payload;
};

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

export const serachUsers = async (params: SearchParams) => {
  const response: AxiosResponse<actions.UserInterface[]> = await axios.get(
    '/users',
    { params: clientToAPI(params) }
  );
  return response.data;
};
