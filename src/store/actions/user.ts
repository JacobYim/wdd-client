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
