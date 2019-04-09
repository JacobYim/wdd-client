import axios, { AxiosResponse } from 'axios';
import { Dog } from 'src/store/actions/dog';

export interface Feed {
  _id: string;
  user: string;
  dog: Dog;
  pins: string; // JSON.stringify(pins)
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

export type Body = Pick<
  Feed,
  Exclude<keyof Feed, '_id' | 'user' | 'dog' | 'createdAt' | 'likes'>
>;

export interface Params {
  dogs?: string[];
  feeds?: string[];
}

export const createFeed = async (params: Body) => {
  const response: AxiosResponse<Feed> = await axios.post('/feeds', params);
  return response.data;
};

export const getFeeds = async (p: Params) => {
  const params: { dogs?: string; feeds?: string } = {};
  if (p.dogs) params.dogs = JSON.stringify(p.dogs);
  if (p.feeds) params.feeds = JSON.stringify(p.feeds);
  const response: AxiosResponse<Feed[]> = await axios.get('/feeds', { params });
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
