import { NavigationScreenProp } from 'react-navigation';

// *** INTERFACES
export interface DogSummeryInterface {
  name: string;
  thumbnail?: string;
  default: boolean;
}

export interface DogInterface extends DogSummeryInterface {
  _id: string; // PK
  user: string; // FK
  feeds: string[];
  getLikes: string[];
  birth?: string; // YYYY.MM.DD
  weight?: number;
  info?: string;
  breed: string;
  gender: 'M' | 'F' | 'N' | '';
}

export interface CreateDogInterface {
  name: string;
  thumbnail?: string;
  breed: string;
  gender: 'M' | 'F' | 'N' | '';
}

// *** CONSTS
export const GET_DOG = 'dog/GET_DOG';
export const CREATE_DOG = 'dog/CREATE_DOG';

export const SET_DOG_REQUEST = 'dog/SET_DOG_REQUEST';
export const SET_DOG_SUCCESS = 'dog/SET_DOG_SUCCESS';
export const SET_DOG_FAILURE = 'dog/SET_DOG_FAILURE';

// *** FUNCTIONS
type Navigation = NavigationScreenProp<any>;

export const getDog = (payload: { _id: string }) => ({
  payload,
  type: GET_DOG,
});
export const createDog = (
  payload: CreateDogInterface,
  navigation?: Navigation
) => ({
  payload,
  navigation,
  type: CREATE_DOG,
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
