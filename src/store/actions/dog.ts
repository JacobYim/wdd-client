// *** INTERFACES
export interface DogInterface extends ShortenDogInterface {
  readonly id: string; // PK
  readonly user: string; // FK
  feeds: string[];
  getLikes: string[];
  gender: 'M' | 'F' | 'N';
  birth?: string; // YYYY.MM.DD
  weight?: number;
  info?: string;
}

export interface ShortenDogInterface {
  name: string;
  thumbnail: string;
  race: string;
}

// *** CONSTS
export const GET_DOG = 'dog/GET_DOG';
export const CREATE_DOG = 'dog/CREATE_DOG';
// export const UPDATE_DOG = 'dog/UPDATE_DOG';

export const SET_DOG_REQUEST = 'dog/SET_DOG_REQUEST';
export const SET_DOG_SUCCESS = 'dog/SET_DOG_SUCCESS';
export const SET_DOG_FAILURE = 'dog/SET_DOG_FAILURE';

// *** FUNCTIONS
export const getDog = (payload: { id: string }) => ({ type: GET_DOG, payload });
export const createDog = (payload: ShortenDogInterface) => ({
  type: CREATE_DOG,
  payload,
});

export const setDogRequest = () => ({ type: SET_DOG_REQUEST });
export const setDogSuccess = (payload: DogInterface) => ({
  type: SET_DOG_SUCCESS,
  payload,
});
export const setDogFailure = (payload: Response) => ({
  type: SET_DOG_FAILURE,
  payload,
});
