import { SignInInterface, SignUpInterface } from 'src/lib/api/user';
import { UserInterface } from 'src/store/reducers/user';

// *** CONSTS
export const LOAD_USER = 'user/LOAD_USER';
export const SIGNIN = 'user/SIGNIN';
export const SIGNUP = 'user/SIGNUP';
export const SIGNOUT = 'user/SIGNOUT';

export const USER_REQUEST = 'user/USER_REQUEST';
export const USER_SUCCESS = 'user/USER_SUCCESS';
export const USER_FAILURE = 'user/USER_FAILURE';

// *** FUNCTIONS
export const loadUser = () => ({ type: LOAD_USER });
export const signIn = (payload: SignInInterface) => ({ type: SIGNIN, payload });
export const signUp = (payload: SignUpInterface) => ({ type: SIGNUP, payload });
export const signOut = () => ({ type: SIGNOUT });

export const userRequest = () => ({ type: USER_REQUEST });
export const userSuccess = (payload: UserInterface) => ({
  type: USER_SUCCESS,
  payload,
});
export const userFailure = (error: Error) => ({ type: USER_FAILURE, error });
