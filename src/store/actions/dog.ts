import { NavigationScreenProp } from 'react-navigation';

interface Like {
  dog: string;
  createdAt: Date;
}

// *** INTERFACES
export interface CreateDogInterface {
  name: string;
  thumbnail?: string;
  breed: string;
  gender: 'M' | 'F' | 'N' | '';
  birth?: string; // YYYY.MM.DD
  weight?: number;
  info?: string;
}

export interface UpdateDogInterface {
  _id: string;
  name?: string;
  thumbnail?: string;
  breed?: string;
  gender?: 'M' | 'F' | 'N';
  birth?: string; // YYYY.MM.DD
  weight?: number;
  info?: string;
}

export interface DogInterface extends CreateDogInterface {
  _id: string;
  user: string;
  feeds: string[];
  likes: Like[];
}

// *** CONSTS
export const SELECT_DOG = 'dog/SELECT_DOG';
export const CREATE_DOG = 'dog/CREATE_DOG';
export const UPDATE_DOG = 'dog/UPDATE_DOG';

export const SET_DOG_REQUEST = 'dog/SET_DOG_REQUEST';
export const SET_DOG_SUCCESS = 'dog/SET_DOG_SUCCESS';
export const SET_DOG_FAILURE = 'dog/SET_DOG_FAILURE';

// *** FUNCTIONS

export const selectDog = (payload: { _id: string }) => ({
  payload,
  type: SELECT_DOG,
});
export const createDog = (
  payload: CreateDogInterface,
  navigation?: NavigationScreenProp<any>
) => ({
  payload,
  navigation,
  type: CREATE_DOG,
});
export const updateDog = (payload: UpdateDogInterface) => ({
  payload,
  type: UPDATE_DOG,
});

export const setDogRequest = () => ({ type: SET_DOG_REQUEST });
export const setDogSuccess = (payload: DogInterface) => ({
  payload,
  type: SET_DOG_SUCCESS,
});
export const setDogFailure = (payload: Response) => ({
  payload,
  type: SET_DOG_FAILURE,
});
