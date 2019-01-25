import axios from 'axios';
import { ShortenDogInterface, DogInterface } from 'src/store/actions/dog';

export const getDog = async (params: { id: string }) => {
  const response = await axios.get('/dog', { params });
  return response.data as DogInterface;
};

export const createDog = async (body: ShortenDogInterface) => {
  const response = await axios.post('/dog', body);
  return response.data as DogInterface;
};
