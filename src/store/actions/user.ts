import { ShortenDogInterface, DogInterface } from './dog';

// *** INTERFACES
export interface UserInterface {
  readonly email: string; // PK
  readonly lastLogin: string;
  name: string;
  birth: string;
  gender: 'M' | 'F' | '';
  status: 'ACTIVE' | 'PAUSED' | 'TERMINATED' | '';
  dogs: {
    [id: string]: ShortenDogInterface | DogInterface;
  };
  places: {
    [id: string]: ShortenDogInterface;
  };
}

export interface SignInInterface {
  email: string;
  password: string;
}

export interface SignUpInterface extends SignInInterface {
  name: string;
}

export interface CreateMetaInterface {
  birth: string;
  gender: string;
}

// *** CONSTS
export const AUTO_SIGNIN = 'user/AUTO_SIGNIN';
export const SIGNIN = 'user/SIGNIN';
export const SIGNUP = 'user/SIGNUP';
export const SIGNOUT = 'user/SIGNOUT';
export const UPDATE_META = 'user/UPDATE_META';

export const SET_USER_REQUEST = 'user/SET_USER_REQUEST';
export const SET_USER_SUCCESS = 'user/SET_USER_SUCCESS';
export const SET_USER_FAILURE = 'user/SET_USER_FAILURE';

export const REMOVE_USER = 'user/REMOVE_USER';

// *** FUNCTIONS
type Navigate = () => void;

export const autoSignIn = (navigate: {
  success: Navigate;
  failure: Navigate;
  pending: (nextStep: string) => void;
}) => ({
  type: AUTO_SIGNIN,
  navigate,
});
export const signIn = (payload: SignInInterface, navigate: Navigate) => ({
  type: SIGNIN,
  payload,
  navigate,
});
export const signUp = (payload: SignUpInterface, navigate: Navigate) => ({
  type: SIGNUP,
  payload,
  navigate,
});
export const signOut = (navigate: Navigate) => ({ type: SIGNOUT, navigate });
export const createMeta = (
  payload: CreateMetaInterface,
  navigate: Navigate
) => ({
  type: UPDATE_META,
  payload,
  navigate,
});

export const setUserRequest = () => ({ type: SET_USER_REQUEST });
export const setUserSuccess = (payload: UserInterface) => ({
  type: SET_USER_SUCCESS,
  payload,
});
export const setUserFailure = (payload: Response) => ({
  type: SET_USER_FAILURE,
  payload,
});

export const removeUser = () => ({ type: REMOVE_USER });
