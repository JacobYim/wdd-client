import axios, { AxiosResponse } from 'axios';
import { Alert } from 'react-native';
import { Dog } from 'src/store/actions/dog';

export interface Feed {
  _id: string;
  user: string;
  dog: Dog;
  pins: string;
  seconds: number;
  distance: number; // km
  steps: number;
  pees: number;
  poos: number;
  images: string[];
  memo?: string;
  likes: { user: string; createdAt: Date }[];
  createdAt: Date;
}

export interface Body
  extends Pick<
    Feed,
    Exclude<keyof Feed, '_id' | 'user' | 'dog' | 'createdAt' | 'likes'>
  > {
  steps: number;
}

export interface Params {
  dogs?: string[];
  feeds?: string[];
  length?: number;
}

const instance = axios.create();
instance.defaults.headers.common = {};

export const createFeed = async (params: Body) => {
  const response: AxiosResponse<Feed> = await axios.post('/feeds', params);
  return response.data;
};

export const getFeeds = async (p: Params) => {
  const params: { dogs?: string; feeds?: string; length?: string } = {};
  if (p.dogs !== undefined) params.dogs = JSON.stringify(p.dogs);
  if (p.feeds !== undefined) params.feeds = JSON.stringify(p.feeds);
  if (p.length !== undefined) params.length = p.length.toString();
  const response: AxiosResponse<Feed[]> = await instance.get('/feeds', {
    params,
  });
  return response.data;
};

export const deleteFeed = async (body: { _id: string }) => {
  const response: AxiosResponse<{ message: string }> = await axios.delete(
    `/feeds/${body._id}`
  );
  Alert.alert('피드가 삭제되었습니다.');
  return response.data;
};

export const pushLike = async (params: { _id: string }) => {
  const response: AxiosResponse<Feed> = await axios.patch(
    `/feeds/${params._id}/like`
  );
  return response.data;
};

export const undoLike = async (params: { _id: string }) => {
  const response: AxiosResponse<Feed> = await axios.delete(
    `/feeds/${params._id}/like`
  );
  return response.data;
};
