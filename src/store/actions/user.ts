// *** INTERFACES
export interface UserInterface {
  readonly email: string;
  readonly name: string;
  dogs: {
    [id: string]: {
      name: string;
      thumbnail: string;
    };
  };
  // places: string[]
}

export interface SignInInterface {
  email: string;
  password: string;
}

export interface SignUpInterface extends SignInInterface {
  name: string;
  birth?: string;
  gender?: string;
}

// *** CONSTS
export const LOAD_USER = 'user/LOAD_USER';
export const SIGNIN = 'user/SIGNIN';
export const SIGNUP = 'user/SIGNUP';
export const SIGNOUT = 'user/SIGNOUT';

export const SET_USER_REQUEST = 'user/SET_USER_REQUEST';
export const SET_USER_SUCCESS = 'user/SET_USER_SUCCESS';
export const SET_USER_FAILURE = 'user/SET_USER_FAILURE';

export const REMOVE_USER_REQUEST = 'user/REMOVE_USER_REQUEST';
export const REMOVE_USER_SUCCESS = 'user/REMOVE_USER_SUCCESS';
export const REMOVE_USER_FAILURE = 'user/REMOVE_USER_FAILURE';

// *** FUNCTIONS
export const loadUser = () => ({ type: LOAD_USER });
export const signIn = (payload: SignInInterface) => ({ type: SIGNIN, payload });
export const signUp = (payload: SignUpInterface) => ({ type: SIGNUP, payload });
export const signOut = () => ({ type: SIGNOUT });

export const setUserRequest = () => ({ type: SET_USER_REQUEST });
export const setUserSuccess = (payload: UserInterface) => ({
  type: SET_USER_SUCCESS,
  payload,
});
export const setUserFailure = (payload: Response) => ({
  type: SET_USER_FAILURE,
  payload,
});

export const removeUserRequest = () => ({ type: REMOVE_USER_REQUEST });
export const removeUserSuccess = () => ({ type: REMOVE_USER_SUCCESS });
export const removeUserFailure = (payload: Error) => ({
  type: SET_USER_FAILURE,
  payload,
});
