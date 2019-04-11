import axios, { AxiosResponse } from 'axios';
import { Alert } from 'react-native';
import { UserInterface } from 'src/store/actions/user';

interface Body {
  place: string;
  rating: number;
  description?: string;
}

interface Params {
  user?: string;
  place?: string;
}

export interface Review extends Body {
  user: UserInterface;
  createdAt: Date;
  updatedAt: Date;
}

export const createReview = async (body: Body) => {
  const response: AxiosResponse<Review> = await axios.post('/reviews', body);
  if (response.status === 409) {
    Alert.alert('이미 리뷰를 작성하셨습니다.');
    return null;
  }
  return response.data;
};

export const getReviews = async (params?: Params) => {
  const response: AxiosResponse<Review[]> = await axios.get('/reviews', {
    params,
  });
  return response.data;
};
