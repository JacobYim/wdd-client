import axios, { AxiosResponse } from 'axios';
import { CreateDogInterface, DogInterface } from 'src/store/actions/dog';

export const getDog = async (params: { _id: string }) => {
  const response: AxiosResponse<DogInterface> = await axios.get('/dogs', {
    params,
  });
  return response.data;
};

export const createDog = async (body: CreateDogInterface) => {
  const response: AxiosResponse<DogInterface> = await axios.post('/dogs', body);
  return response.data;
};
