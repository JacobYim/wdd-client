import axios, { AxiosResponse } from 'axios';
import {
  CreateDogInterface,
  UpdateDogInterface,
  DogInterface,
} from 'src/store/actions/dog';

export const selectDog = async (params: { _id: string }) => {
  const response: AxiosResponse<DogInterface> = await axios.put(
    `/dogs/${params._id}`
  );
  return response.data;
};

export const createDog = async (body: CreateDogInterface) => {
  const response: AxiosResponse<DogInterface> = await axios.post('/dogs', body);
  return response.data;
};

export const updateDog = async (body: UpdateDogInterface) => {
  const { _id, ...data } = body;
  const response: AxiosResponse<UpdateDogInterface> = await axios.patch(
    `/dogs/${_id}`,
    data
  );
  return response.data;
};
