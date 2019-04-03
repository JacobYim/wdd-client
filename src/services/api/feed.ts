import axios, { AxiosResponse } from 'axios';

interface Feed {
  _id: string;
  user: string;
  dog: string;
  pins: string; // JSON.stringify(pins)
  seconds: number;
  distance: number; // km
  steps: number;
  pees: number;
  poos: number;
  images: string[];
  memo?: string;
  createdAt: Date;
}

export type Body = Pick<
  Feed,
  Exclude<keyof Feed, '_id' | 'user' | 'dog' | 'createdAt'>
>;

export interface Params {
  user?: string;
}

export const createFeed = async (params: Body) => {
  const response: AxiosResponse<Feed> = await axios.post('/feeds', params);
  return response.data;
};

export const getFeeds = async (params?: Params) => {
  const response: AxiosResponse<Feed[]> = await axios.get('/feeds', { params });
  return response.data;
};
