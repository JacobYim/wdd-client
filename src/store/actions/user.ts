import { LatLng } from 'react-native-maps';
import { NavigationScreenProp } from 'react-navigation';
import { Dog } from './dog';

// *** INTERFACES
export interface UserInterface {
  readonly _id: string;
  readonly email: string; // PK
  readonly lastLogin: Date;
  name: string;
  birth: string;
  gender: string; // 'M' | 'F'
  status: 'ACTIVE' | 'PAUSED' | 'TERMINATED';
  dogs: { [_id: string]: string };
  location: { type: string; coordinates: number[] };
  places: string[];
  repDog?: Dog;
}

export interface UpdateInterface {
  password?: string;
  name?: string;
  birth?: string;
  gender?: string; // 'M' | 'F'
  status?: 'ACTIVE' | 'PAUSED' | 'TERMINATED';
  location?: { type: string; coordinates: number[] };
  repDog?: Dog;
}

export interface SignInInterface {
  email: string;
  password: string;
}

export interface SignUpInterface extends SignInInterface {
  name: string;
}

// *** CONSTS
export const GET_USER = 'user/GET_USER';
export const AUTO_SIGNIN = 'user/AUTO_SIGNIN';
export const SIGNIN = 'user/SIGNIN';
export const SIGNUP = 'user/SIGNUP';
export const SIGNOUT = 'user/SIGNOUT';
export const TERMINATE = 'user/TERMINATE';
export const CREATE_META = 'user/CREATE_META';
export const FORGOT_PASSWORD = 'user/FORGOT_PASSWORD';
export const CHANGE_PASSWORD = 'user/CHANGE_PASSWORD';
export const UPDATE_LOCATION = 'user/UPDATE_LOCATION';

export const SET_USER_REQUEST = 'user/SET_USER_REQUEST';
export const SET_USER_SUCCESS = 'user/SET_USER_SUCCESS';
export const SET_USER_FAILURE = 'user/SET_USER_FAILURE';

export const UPDATE_LOCAL = 'user/UPDATE_LOCAL';
export const REMOVE_USER = 'user/REMOVE_USER';

// *** FUNCTIONS
type Navigation = NavigationScreenProp<any>;

export const getUser = () => ({ type: GET_USER });
export const autoSignIn = (navigation: Navigation) => ({
  navigation,
  type: AUTO_SIGNIN,
});
export const signIn = (payload: SignInInterface, navigation: Navigation) => ({
  payload,
  navigation,
  type: SIGNIN,
});
export const signUp = (payload: SignUpInterface, navigation: Navigation) => ({
  payload,
  navigation,
  type: SIGNUP,
});
export const signOut = (navigation: Navigation) => ({
  navigation,
  type: SIGNOUT,
});
export const terminate = (navigation: Navigation) => ({
  navigation,
  type: TERMINATE,
});
export const createMeta = (
  payload: { birth: string; gender: string },
  navigation: Navigation
) => ({ payload, navigation, type: CREATE_META });
export const forgotPassword = (
  payload: { email: string },
  navigation: Navigation
) => ({
  payload,
  navigation,
  type: FORGOT_PASSWORD,
});
export const changePassword = (
  payload: { password: string; token: string },
  navigation: Navigation
) => ({ payload, navigation, type: CHANGE_PASSWORD });
export const updateLocation = (payload: LatLng) => ({
  payload,
  type: UPDATE_LOCATION,
});

export const setUserRequest = () => ({ type: SET_USER_REQUEST });
export const setUserSuccess = (payload: UserInterface) => ({
  payload,
  type: SET_USER_SUCCESS,
});
export const setUserFailure = (payload: Response) => ({
  payload,
  type: SET_USER_FAILURE,
});

export const updateLocal = (payload: UpdateInterface) => ({
  payload,
  type: UPDATE_LOCAL,
});
export const removeUser = () => ({ type: REMOVE_USER });
