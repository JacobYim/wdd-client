import axios from 'axios';
import { DogInterface, ShortenDogInterface } from 'src/store/actions/dog';

export const getDog = async (params: { id: string }) => {
  const response = await axios.get('/dogs', { params });
  return response.data as DogInterface;
};

export const createDog = async (body: ShortenDogInterface) => {
  const response = await axios.post('/dogs', body);
  return response.data as DogInterface;
};
