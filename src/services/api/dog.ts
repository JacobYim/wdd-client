import axios, { AxiosResponse } from 'axios';
import { Dog, DogBase, Like, UpdateDog } from 'src/store/actions/dog';

export type LinkedLike = Dog & { createdAt: Date };

export const selectDog = async (params: { _id: string }) => {
  const response: AxiosResponse<Dog> = await axios.put(`/dogs/${params._id}`);
  return response.data;
};

export const searchDogs = async (params: { likes: Like[] }) => {
  const dogs = params.likes.map(like => like.dog);
  const response: AxiosResponse<Dog[]> = await axios.get('/dogs', {
    params: { dogs: JSON.stringify(dogs) },
  });
  const data: LinkedLike[] = response.data.map((dog, index) => ({
    ...dog,
    createdAt: params.likes[index].createdAt,
  }));
  return data;
};

export const createDog = async (body: DogBase) => {
  const response: AxiosResponse<Dog> = await axios.post('/dogs', body);
  return response.data;
};

export const updateDog = async (body: UpdateDog) => {
  const { _id, ...data } = body;
  const response: AxiosResponse<Dog> = await axios.patch(`/dogs/${_id}`, data);
  return response.data;
};

export const pushLike = async (params: { _id: string }) => {
  const response: AxiosResponse<Dog> = await axios.patch(
    `/dogs/${params._id}/like`
  );
  return response.data;
};
