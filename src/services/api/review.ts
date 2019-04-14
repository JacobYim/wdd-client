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
  _id: string;
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

export const updateReview = async (body: Body & { _id: string }) => {
  const { _id, ...data } = body;
  const response: AxiosResponse<Review> = await axios.patch(
    `/reviews/${_id}`,
    data
  );
  return response.data;
};

export const deleteReview = async (id: string) => {
  const response: AxiosResponse<{ message: string }> = await axios.delete(
    `/reviews/${id}`
  );
  Alert.alert('리뷰가 삭제되었습니다.');
  return response.data;
};

export const reportReview = async (id: string) => {
  const response: AxiosResponse<{ message: string }> = await axios.post(
    `/reviews/${id}/report`
  );
  Alert.alert('신고가 접수되었습니다.');
  return response.data;
};
