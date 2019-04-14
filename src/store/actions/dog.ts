import { NavigationScreenProp } from 'react-navigation';

export interface Like {
  dog: string;
  createdAt: Date;
}

export interface History {
  yearMonth: string;
  count: number;
  seconds: number;
  steps: number;
  distance: number;
}

// *** INTERFACES
export interface DogBase {
  name: string;
  thumbnail?: string;
  breed: string;
  gender: 'M' | 'F' | 'N' | '';
  birth?: string;
  weight?: number;
  info?: string;
}

export interface UpdateDog extends DogBase {
  _id: string;
}

export interface Dog extends DogBase {
  _id: string;
  user: string;
  feeds: string[];
  likes: Like[];
  histories: History[];
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
  payload: DogBase,
  navigation?: NavigationScreenProp<any>
) => ({
  payload,
  navigation,
  type: CREATE_DOG,
});
export const updateDog = (payload: UpdateDog) => ({
  payload,
  type: UPDATE_DOG,
});

export const setDogRequest = () => ({ type: SET_DOG_REQUEST });
export const setDogSuccess = (payload: Dog) => ({
  payload,
  type: SET_DOG_SUCCESS,
});
export const setDogFailure = (payload: Response) => ({
  payload,
  type: SET_DOG_FAILURE,
});
